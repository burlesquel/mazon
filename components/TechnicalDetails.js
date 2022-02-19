
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/TechnicalDetails.module.css"



export default function TechnicalDetails({ product }) {
    const keys = Object.keys(product.details)
    const values = Object.values(product.details)
    var valIndex = -1
    return (

        <section className={styles.mainContainer}>
            <h3>Technical Details</h3>

            {
                keys.map((key) => {
                    valIndex = valIndex + 1
                    return (

                        <div key={parseInt(Math.random() * 100000)} className={styles.eachDetail}>
                            <span>
                                {key.replace("_", " ").toUpperCase()}
                            </span> 
                            <span>
                                <strong>{values[valIndex]}</strong> 
                            </span>
                        </div>

                    )

                })
            }



        </section>

    )
}
