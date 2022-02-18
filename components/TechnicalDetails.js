
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/TechnicalDetails.module.css"



export default function TechnicalDetails({ product }) {
    return (
        
        <section className={styles.mainContainer}>
            <h1>Technical Details</h1>
            <h2>{product.name}</h2>
        </section>  
        
    )
}
