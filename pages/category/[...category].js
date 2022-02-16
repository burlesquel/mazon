import Product from "../../components/Product"
import styles from "../../styles/[category].module.css"
import CategoriesNavbar from "../../components/CategoriesNavbar/CategoriesNavbar";

export default function Category({ products }) {

  console.log(products);

  return (
    <div>
      <CategoriesNavbar/>
      <div className={styles.productsContainer}>
      {products.map((product) => <Product key={product.id} product={product} />)}
    </div>
    </div>

  )
}

export async function getServerSideProps({ params }) {
  const category = params.category // IT IS A LIST
  if(category.length === 1){
    const products = await fetch(`https://mazon-server.herokuapp.com/category/?category=${category}`).then(r => r.json())
    return {
      props: {
        products
      }
    }
  }
  else if(category.length === 2){
    const mainCategory = category[0]
    const subCategory = category[1]
    const products = await fetch(`https://mazon-server.herokuapp.com/category/?category=${mainCategory}&subcategory=${subCategory}`).then(r => r.json())
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