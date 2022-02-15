import Product from "../../components/Product"
import styles from "../../styles/[category].module.css"

export default function Category({ products }) {

  console.log(products);

  return (
    <div className={styles.productsContainer}>
      {products.map((product) => <Product key={product.id} product={product} />)}
    </div>

  )
}

export async function getServerSideProps({ params }) {
  const category = params.category
  const products = await fetch(`https://mazon-server.herokuapp.com/category/?category=${category}`).then(r => r.json())
  return {
    props: {
      products
    }
  }
}