import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/[id].module.css"
import CategoriesNavbar from "../../components/CategoriesNavbar/CategoriesNavbar"
import TechnicalDetails from "../../components/TechnicalDetails"
import { IoCheckmarkDoneSharp, IoPersonCircleSharp, IoStarSharp, IoMail } from "react-icons/io5";


export default function Product({ product }) {

  return (
    <div>

      <CategoriesNavbar />

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
                <h8><IoPersonCircleSharp/><strong> x </strong> years user</h8>
                <h8> <IoCheckmarkDoneSharp/> Email confirmed</h8>
                <h8> <IoCheckmarkDoneSharp/> Phone confirmed</h8>
                <h8> <IoStarSharp/> Ratings <em>3.7</em>/4</h8>

              </div>

              <div className={styles.sendMessageContainer}>
               <IoMail/> Send message 
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
