
import { useState } from "react"
import Product from "../components/Product"
import styles from "../styles/Products.module.css"


// export const getStaticProps = async () => {

//   const res = await fetch("https://mazon-server.herokuapp.com/data")
//   const data = await res.json()

//   return {
//     props: {
//       products: data
//     }
//   }
// }

export async function getServerSideProps() {
  const id = params.id
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
      <div>

        <h1>Category PAGE</h1>
        <h2>Find product</h2>
        <input onChange={(val) => { setSearchValue(val.target.value) }} type={"search"} placeholder="Product id" />
        <button onClick={() => { router.push(`/product/${searchValue}`) }}>Search</button>

      </div>

      <div className={styles.productsContainer}>
        {products.map(product=><Product key={product.id} product={product} />)}
        
      </div>
    </>
  )
}
