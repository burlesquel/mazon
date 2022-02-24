const axios = require("axios")
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router';
import styles from "../../styles/[id].module.css"
import TechnicalDetails from "../../components/TechnicalDetails"
import { IoCheckmarkDoneSharp, IoPersonCircleSharp, IoStarSharp, IoMail, IoCloseCircleSharp } from "react-icons/io5";
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../authentication/authContext";
import { addComment } from "../../data-management/addCommentFunctions";
import { Conversation, Message } from "../../data-management/messageFunctions";

const serverURL = "https://mazon-server.herokuapp.com"



export default function Product({ product }) {

  const [messagePopup, setMessagePopup] = useState(false)

  const router = useRouter()
  const context = useContext(AuthContext)

  const newConversation = (message) => {
    const starterID = context.user.id
    const starterName = context.user.user_metadata.full_name
    const targetUserID = product.owner.id
    const targetUserName = product.owner.name
    const firstMessage = new Message(starterID, starterName, targetUserID, targetUserName, Date.now(), message) // THE ONE WHO CREATES THE CONVO IS ALSO THE FIRST SENDER OF THE FIRST MESSAGE
    // context.user.socket.emit("message",message)
    console.log("Starter: ", starterID, ",", "Target User: ", targetUserID);
    const conversation = new Conversation(starterID, starterName, targetUserID, targetUserName)
    conversation.messages.push(firstMessage)
    context.user.socket.emit("new conversation to server", conversation)

  }

  const messageSubmitHandler = (event) =>{
    event.preventDefault()


      const {messageBox} = event.target
      const message = messageBox.value
      event.target.messageBox.value = ""
      newConversation(message)

    
  }

  useEffect(() => {
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") { setMessagePopup(false) } }, false)
  }, [])

  return (
    <div className={styles.main}>

      {messagePopup &&
        <div className={styles.popupMainContainer}>
          <div className={styles.popupContainer}>

            <h4 onClick={() => { setMessagePopup(false) }} className={styles.crossButton}><IoCloseCircleSharp /></h4>

            <h4>New message to: <strong>{product.owner.name}</strong> </h4>

            <form method="post" onSubmit={messageSubmitHandler}>

              <textarea name="messageBox" placeholder="Your message.." className="form-control"></textarea>
              <button className="btn btn-primary"> Send </button>

            </form>



          </div>
        </div>}

      <div className={styles.categoryNavigation}>
        <Link href={`/category/${product.category}`}>{product.category}</Link> &gt; <Link href={`/category/${product.category}/${product.subcategory}`}>{product.subcategory}</Link>
      </div>

      <div className={styles.productContainer}>

        <div className={styles.imageAndContent}>

          <div className={styles.imageContainer}>
            <Image alt="image" className={styles.image} src={product.image_url} objectFit="contain" layout="fill" />
          </div>

          <div className={styles.content}>

            <div className={styles.briefProductInfo}>

              <h1>{product.name}</h1>
              <p>Brand:{product.brand}</p>
              <p>Stock:{product.stock.quantity}</p>
              <h2>Price: ${product.price.total_price}</h2>

            </div>

            <div className={styles.userInfoContainer}>

              <h4>About Seller</h4>
              <div className={styles.userInfo}>

                <h5>{product.owner.name}</h5>
                <h8><IoPersonCircleSharp /><strong> x </strong> years user</h8>
                <h8> <IoCheckmarkDoneSharp /> Email confirmed</h8>
                <h8> <IoCheckmarkDoneSharp /> Phone confirmed</h8>
                <h8> <IoStarSharp /> Ratings <em>3.7</em>/4</h8>

              </div>

              <div onClick={() => { 
                    if(product.owner.id === context.user.id){
                      alert("You cannot send message to yourself")
                    }
                    else{
                      setMessagePopup(true) 
                    }
                
                }} className={styles.sendMessageContainer}>
                <IoMail /> Send message
              </div>


            </div>

          </div>

        </div>

        <div className={styles.descriptionContainer}>
          <h2>Description</h2>
          <p>{product.description}</p>
          <p>Age of the Product: {product.age} years</p>
        </div>

        <TechnicalDetails product={product} />

        <div className={styles.commentsMainContainer}>
          <h2>Comments</h2>

          <div className={styles.textBoxContainer}>
            {context.user && <form className={styles.form} onSubmit={() => { addComment(event, context, router, product.id) }}>
              <textarea className={`${styles.textArea} form-control`} id="comment" name="comment" autoComplete="comment" required></textarea>
              <button className="btn btn-primary" type="submit">Send</button>
            </form>}

          </div>

          <div className={styles.commentsContainer}>
            {product.ratings.comments.length > 0 && product.ratings.comments.map((comment) => {
              return (
                // KEY AYARLA
                <div key={parseInt(Math.random() * 100000)}>
                  <h7>{comment.userName}</h7>
                  <p>{comment.comment}</p>
                  <span> <em>{comment.date}</em> </span>
                </div>

              )
            })}
          </div>

        </div>

      </div>

    </div>

  )
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const products = await fetch(`${serverURL}/products?id=${id}`).then(r => r.json())
  const product = products[0]
  return {
    props: {
      product,
      id
    }
  }
}
