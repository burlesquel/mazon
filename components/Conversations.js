import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';
import styles from "../styles/Chat.module.css"
var key = 500
const serverURL = "https://mazon-server.herokuapp.com"


export default function Conversations() {

    console.log("Conversation.js rendered");

    const [conversationsList, setConversationsList] = useState([])

    const context = useContext(AuthContext)

    useEffect(() => { // GETS CONVERSATIONS FROM SERVER VIA FETCH AND UPDATES CONVERSATIONS STATE
        fetch(`${serverURL}/conversations?between=${context.user.id}`).then(r => {
            r.json().then(data => {
                if (data === []) {
                    setConversationsList(false)
                }
                else {
                    setConversationsList(data)
                }
            })
        })
    }, [])
    // conversation.people.starter.id === context.user.id ? conversation.people.receiver.name : conversation.people.starter.name
    return (
        <div>
            {conversationsList.length === 0 ? <div> convo not found </div> : <div> {conversationsList.map(conversation => {
                key++
                return (
                    <div onClick={()=>{context.setCurrentConversation(conversation);}} className={styles.eachConvo} key={key}>
                        With {conversation.people.starter.id === context.user.id ? conversation.people.receiver.name : conversation.people.starter.name}
                    </div>
                )
            })}</div>}


        </div>
    )

}