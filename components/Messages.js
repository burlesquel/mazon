import { useContext, useEffect, useRef } from "react"
import AuthContext from '../authentication/authContext';
import styles from "../styles/Chat.module.css"
import Image from 'next/image'

var key = 800

const EachMessage = ({ message, context }) => {
  console.log("Each message rendered: ", message);
  if (message.sender.id === context.user.id) {
    return (
      <div className={styles.eachMessageSelf} key={key}> 
        <div className={styles.avatarDiv}><Image className={styles.avatarImg} src={message.avatar} width={30} height={30}  /></div>
        <div><span className={styles.messageSpan}>{message.content}</span></div>
        
      </div>
    )
  }
  else {
    return (
      <div className={styles.eachMessageOpposite} key={key}>
        <div className={styles.avatarDiv}><Image className={styles.avatarImg} src={message.avatar} width={30} height={30} /></div>
        <div className={styles.messageTextDiv}><span className={styles.messageSpan}>{message.content}</span></div>
      </div>
    )
  }

}

export default function Messages() {
  const scrollRef = useRef(null)
  console.log("Messages.js rendered");

  const context = useContext(AuthContext)
  const socket = context.user.socket
  // const my_id = context.user.id
  // var targetUser = null
  // var me = null

  useEffect(() => {
    context.user.socket.on("message feedback to user", (message) => {
      console.log("message feedback received from socket");
      context.setCurrentConversation(previous => {
        if (previous === null) {
          console.log("ERROR CURRENT CONVO IS NULL SOMETHING WENT WRONG");
        } else {
          const newList = { ...previous }
          newList.messages.push(message)
          return newList
        }
      })
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    })
  }, [])

  return (
    <div className={styles.mainChatContainer}>
      {context.currentConversation === null ? <div> SELECT A CONVERSATION </div> :
        <div ref={scrollRef}>
          {context.currentConversation.messages.map(message => {
            key++
            return (<EachMessage key={key} message={message} context={context} />)
          })}
        </div>
      }
    </div>
  )
}
