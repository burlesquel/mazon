import { useContext, useEffect } from "react"
import AuthContext from '../authentication/authContext';
import styles from "../styles/Chat.module.css"

var key = 800

export default function Messages() {
  console.log("Messages.js rendered");

  const context = useContext(AuthContext)
  const socket = context.user.socket
  // const my_id = context.user.id
  // var targetUser = null
  // var me = null

  // {context.currentConversation.messages.map((message)=>{
  //   key++
  //   return(<div key={key}>
  //     <span><strong>{message.sender.name}: </strong></span>
  //     <span>{message.content}</span>
  //      </div>)}

  useEffect(()=>{
    context.user.socket.on("message feedback to user",(message)=>{
      console.log("message feedback received from socket");
      context.setCurrentConversation(previous =>{
        if(previous === null){
          console.log("ERROR CURRENT CONVO IS NULL SOMETHING WENT WRONG");
        }else{
          const newList = {...previous}
          newList.messages.push(message)
          return newList
        }
      })
    })
    

},[])

  return (
    <div className={styles.mainChatContainer}>
      {context.currentConversation === null ? <div> SELECT A CONVERSATION </div> :
        <div>
           {context.currentConversation.messages.map(message => {
            key++
            return (<div key={key}>
              <span><strong>{message.sender.name}: </strong></span>
              <span>{message.content}</span>
            </div>)
          })}
        </div>
      }
    </div>
  )
}
