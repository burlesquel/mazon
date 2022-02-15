
import { useState } from "react"
import Product from "../components/Product"
import styles from "../styles/Products.module.css"


export async function getServerSideProps() {

  const products = await fetch(`https://mazon-server.herokuapp.com/data`).then(r => r.json())
  return {
    props: {
      products
    }
  }
}


export default function Products({ products }) {

  const [searchValue, setSearchValue] = useState(null)
  return (
    <>
    <section className={styles.upperNavSection}> Upper navbar </section>
      <div>

        <h2>Search product</h2>
        <input onChange={(val) => { setSearchValue(val.target.value) }} type={"search"} placeholder="Product id" />
        <button onClick={() => { router.push(`/product/${searchValue}`) }}>Search</button>

      </div>

      <div className={styles.productsContainer}>
        {products.map(product=><Product key={product.id} product={product} />)}
        
      </div>
    </>
  )
}
