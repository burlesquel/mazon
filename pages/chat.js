import Conversations from "../components/Conversations"
import Messages from "../components/Messages"
import ChatInput from "../components/ChatInput"
import { useContext, useState, useEffect } from "react"
import AuthContext from "../authentication/authContext"
import styles from "../styles/Chat.module.css"

export default function Chat() {
    const context = useContext(AuthContext)
    if (context.user) {

        return (
            <div className={styles.main}>

                <div className={styles.convosAndChat}>

                    <div className={styles.conversationsMainContainer}>
                        <Conversations />
                    </div>

                    <div className={styles.mainChatContainer}>
                        <Messages />
                    </div>

                </div>

                <div className={styles.inputBox}>
                    <ChatInput />
                </div>




            </div>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }

}
