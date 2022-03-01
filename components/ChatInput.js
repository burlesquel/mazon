import React, { useEffect } from 'react'
import styles from "../styles/Chat.module.css"
import AuthContext from '../authentication/authContext';
import { useContext } from 'react';
import { Message } from '../data-management/messageFunctions';



export default function ChatInput() {
    const context = useContext(AuthContext)

    console.log("ChatInput.js rendered");

    const newMessageHandler = (event) => {
        const currentConvo = context.currentConversation
        event.preventDefault()
        if (currentConvo === null) {
            // DO NOTHING
            console.log("Conversation is not selected yet");
        }
        else {
            const content = event.target.message.value

            if (currentConvo.people.starter.id === context.user.id) { // SELECT THE OPPOSITE OF MY CURRENT ID
                const message = new Message(currentConvo.people.starter.id, currentConvo.people.starter.name, currentConvo.people.receiver.id, currentConvo.people.receiver.name, Date.now(), content, null, context.avatar)
                console.log(message);
                context.user.socket.emit("message", message)
            }
            else {
                const message = new Message(currentConvo.people.receiver.id, currentConvo.people.receiver.name, currentConvo.people.starter.id, currentConvo.people.starter.name, Date.now(), content, null, context.avatar)
                console.log(message);
                context.user.socket.emit("message", message)
            }
        }
        event.target.message.value = ""


        // context.user.socket.emit("message", )

    }




    return (
        <form onSubmit={() => { newMessageHandler(event) }} className={styles.inputBox}>
            <input name="message" type="text" className="form-control" />
            <button type="submit" className='btn btn-primary'>SEND</button>
        </form>
    )
}
