import Product from "../../components/Product"
import styles from "../../styles/Products.module.css"

export default function Category({ products }) {

  console.log(products);

  return (
    <div>
      <div className={styles.productsContainer}>
      {products.map((product) => <Product key={product.id} product={product} />)}
    </div>
    </div>

  )
}

export async function getServerSideProps({ params }) {
  const category = params.category // IT IS A LIST
  if(category.length === 1){
    const products = await fetch(`https://mazon-server.herokuapp.com/products/?category=${category}`).then(r => r.json())
    return {
      props: {
        products
      }
    }
  }
  else if(category.length === 2){
    const mainCategory = category[0]
    const subCategory = category[1]
    const products = await fetch(`https://mazon-server.herokuapp.com/products/?category=${mainCategory}&subcategory=${subCategory}`).then(r => r.json())
    return {
      props: {
        products
      }
    }
  }
  else{
    // DO NOTHING
  }

}