
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Product.module.css"



export default function Product({ product }) {
    return (
        <Link href={`/product/${product.id}`}>
        
        <section className={styles.productContainer}>

            <div className={styles.productNameContainer}>
                <h2>{product.name}</h2>
            </div>

            <div className={styles.imageContainer}>
                <Image className={styles.image} src={product.image_url} width="200" height="200" fill="responsive"/>
            </div>

            <div className={styles.descriptionContainer}>
                <p>{product.description}</p>
            </div>

        </section>
        
        </Link>
        
    )
}
