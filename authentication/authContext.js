import { createContext, useState, useEffect } from "react"
import netlifyIdentity from "netlify-identity-widget"

const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
    authReady: false
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        netlifyIdentity.on("login",(user)=>{
            setUser(user)
            netlifyIdentity.close()
            console.log("Logged in.", user);
        })

        netlifyIdentity.on("logout",()=>{
            console.log("Logged out", user);
        })

        // init netlify identity connection
        netlifyIdentity.init()
    },[])

    const login = ()=>{
        netlifyIdentity.open()
    }

    const logout = ()=>{
        netlifyIdentity.logout()
    }

    const context = {
        user:user,
        login: login,
        logout: logout,
        authReady:false

    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext