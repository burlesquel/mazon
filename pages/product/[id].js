import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/[id].module.css"
import CategoriesNavbar from "../../components/CategoriesNavbar/CategoriesNavbar"

export default function Product({ product }) {


  return (
    <div>
      <CategoriesNavbar />
      <div className={styles.categoryNavigation}>
        <Link href={`/category/${product.category}`}>{product.category}</Link> &gt; <Link href={`/category/${product.category}/${product.subcategory}`}>{product.subcategory}</Link>
      </div>

      <div className={styles.productContainer}>

        <div className={styles.imageContainer}>
          <Image alt="image" className={styles.image} src={product.image_url} objectFit="contain" layout="fill" />
        </div>

        <div className={styles.textContent}>

          <h1>{product.name}</h1>
          <h3>Store: {product.store.name}</h3>
          <p>{product.description}</p>
          <h2>Price: ${product.price.total_price}</h2>
          <p>Brand:{product.brand}</p>
          <p>Stock:{product.stock.quantity}</p>

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
