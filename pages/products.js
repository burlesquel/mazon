
import { useState } from "react"
import Loading from "../components/Loading"
import Product from "../components/Product"
import styles from "../styles/Products.module.css"

const serverURL = "https://mazon-server.herokuapp.com"

export async function getServerSideProps() {

  const products = await fetch(`${serverURL}/products`).then(r => r.json())

  return {
    props: {
      products
    }
  }
}

export default function Products({ products }) {
  
  return (
    <>
    {products ?       <div className={styles.productsContainer}>
        {products.map(product=><Product key={product.id} product={product} />)}
        
      </div>: <Loading/>}

    </>
  )
}
