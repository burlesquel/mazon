import { createContext, useState, useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget"
import { io } from "socket.io-client";

const serverURL = "https://mazon-server.herokuapp.com"

const axios = require("axios")

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authReady, setAuthReady] = useState(false)
    const [userAvatar, setUserAvatar] = useState("https://i.ibb.co/Jjv4qr2/Blank-Man-Profile-Head-Icon-Placeholder.jpg")

    const [currentConversation, setCurrentConversation] = useState(null)

    useEffect(() => {
        var socket = io(serverURL,{transports: ['websocket'], upgrade: false})

        netlifyIdentity.on("login", (user) => {
        
            user.socket = socket
            user.io = io
            user.avatar = userAvatar
            user.setAvatar = setUserAvatar
            

            setUser(user)
            netlifyIdentity.close()
            console.log("Logged in.", user);
            console.log("Current conversation: ", currentConversation);

            socket.on("connect", () => {
                socket.emit("set socket id", user.id) //
            });

        })

        netlifyIdentity.on("logout", () => {
            console.log("Logged out", user);
            try{
                user.socket.emit("logout")
            }
            catch(err){
                console.log(err);
            }
            setUser(null)
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
        authReady: authReady,
        currentConversation : currentConversation,
        setCurrentConversation: setCurrentConversation
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext