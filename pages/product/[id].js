import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router';
import styles from "../../styles/[id].module.css"
import TechnicalDetails from "../../components/TechnicalDetails"
import { IoCheckmarkDoneSharp, IoPersonCircleSharp, IoStarSharp, IoMail } from "react-icons/io5";
import { useState, useContext } from "react"
import AuthContext from "../../authentication/authContext";
import { addComment } from "../../data-management/addCommentFunctions";



export default function Product({ product }) {

  const [commentSent, setCommentSent] = useState(false)

  const router = useRouter()
  const context = useContext(AuthContext)

  return (
    <div>

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

              <div className={styles.sendMessageContainer}>
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
  const product = await fetch(`https://mazon-server.herokuapp.com/data?productid=${id}`).then(r => r.json())
  return {
    props: {
      product,
      id
    }
  }
}
