import { createContext, useState, useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget"
import { addUser } from "../data-management/addUser"

const axios = require("axios")

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)

    useEffect(() => {
        netlifyIdentity.on("login", (user) => {
            setUser(user)
            netlifyIdentity.close()
            console.log("Logged in.", user);
        })

        netlifyIdentity.on("logout", () => {
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