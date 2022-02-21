import { createContext, useState, useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget"
import { io } from "socket.io-client";


const axios = require("axios")

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        netlifyIdentity.on("login", (user) => {
            var socket = io("http://localhost:8000",{transports: ['websocket'], upgrade: false})
            
            socket.on("connect", () => {
                socket.emit("set socket id", user.id) //
            });
            
            user.socket = socket
            user.io = io

            setUser(user)
            netlifyIdentity.close()
            console.log("Logged in.", user);
        })

        netlifyIdentity.on("logout", () => {
            user.socket.emit("logout")
            setUser(null)
            console.log("Logged out", user);
        })

        netlifyIdentity.on("init", () => {
            setAuthReady(true)
        })

        netlifyIdentity.on()


        // init netlify identity connection
        netlifyIdentity.init()

        return () => {
            netlifyIdentity.off("login")
            netlifyIdentity.off("logout")
        }
    }, [])

    const login = () => {
        netlifyIdentity.open()
    }

    const logout = () => {
        netlifyIdentity.logout()

    }

    const context = {
        user: user,
        login: login,
        logout: logout,
        authReady: authReady
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext