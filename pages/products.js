
import { useState } from "react"
import Loading from "../components/Loading"
import Product from "../components/Product"
import styles from "../styles/Products.module.css"


export async function getServerSideProps() {

  const products = await fetch(`https://mazon-server.herokuapp.com/products`).then(r => r.json())

  return {
    props: {
      products
    }
  }
}

// links = [{name:"name", href:"href"}]



export default function Products({ products }) {
  
  return (
    <>
    {products ?       <div className={styles.productsContainer}>
        {products.map(product=><Product key={product.id} product={product} />)}
        
      </div>: <Loading/>}

    </>
  )
}
