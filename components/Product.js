
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Product.module.css"



export default function Product({ product }) {
    return (
        <Link href={`/product/${product.id}`}>
        
        <section className={styles.productContainer}>

            <div className={styles.productNameContainer}>
                <h4>{
                    product.name.length > 35 ? product.name.substring(0,35) + "..." : product.name
                    }</h4>
            </div>

            <div className={styles.imageContainer}>
             <Image className={styles.image} src={product.image_url} objectFit="contain" layout="fill"/>
            </div>

            <div className={styles.descriptionContainer}>
                <p>{
                product.description.length > 100 ? product.description.substring(0,100) + "..." : product.description
                }</p>
            </div>

            <div className={styles.priceContainer}>
                <p>${product.price.total_price}</p>
            </div>

        </section>
        
        </Link>
        
    )
}
