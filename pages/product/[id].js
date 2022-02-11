import Image from "next/image"
import styles from "../../styles/[id].module.css"

export default function Product({ product }) {


  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <Image alt="image" className={styles.image} src={product.image_url} width={1000} height={1000} fill="responsive" />
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
