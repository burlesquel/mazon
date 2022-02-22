import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';
import styles from "../styles/Chat.module.css"

const Conversations = ({ userid }) => {
    const [conversations, setConversations] = useState([]) // TO RENDER NEW CONVERSATIONS DYNAMICALLY
    useEffect(() => {
        fetch(`http://localhost:8000/conversations?people=${userid}`).then(r => {
            r.json().then(data => {
                console.log("DATA: ", data);
                if (data === []) {
                    setConversations("EMPTY ARRAY")
                }
                else {
                    console.log("DATA:",data);
                    setConversations(data)
                }

            })
        })
    }, [])

    return (
        <div>
            {conversations.map((conversation)=>{
                return(
                    <div>
                        <p>between {conversation.people[0]} and {conversation.people[1]}</p>
                    </div>
                )
            })}
        </div>
    )

}

export default function Chat() {

    const router = useRouter()
    const context = useContext(AuthContext)

    if (context.user) {
        console.log(context.user.id);
        console.log(context.user.socket.id);
        console.log(context.user.socket);


        return (
            <div className={styles.main}>

                <div className={styles.conversationsMainContainer}>
                    
                    <div>
                        <Conversations userid={context.user.id} />
                    </div>

                </div>
                <div className={styles.mainChatContainer}>
                    <h3>CHAT</h3>
                    <button onClick={() => {
                        context.user.socket.emit("chat screen")
                    }}> SELAMKE</button>
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

// export async function getServerSideProps({id}) {

//     const conversations = await fetch(`https://mazon-server.herokuapp.com/conversations?people=${user}`).then(r => r.json())
//     return {
//         props: {
//             products
//         }
//     }

// }


