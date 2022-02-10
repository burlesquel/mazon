
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Layout.module.css"

export default function Layout({ children }) {
    return (
        <section>
            <navbar className={styles.navbar}>
                <div className={styles.logodiv}>
                    <Image className={styles.logo} src={"/../public/logos/Logo-withoutbg-blackwithtext.png"} layout="responsive" width={250} height={50}/>
                </div>
                <div className={styles.linksdiv}>
                <Link href={"./about"}><h3>About</h3></Link>
                <Link href={"./"}><h3>Index</h3></Link>
                <Link href={"./products"}><h3>Products</h3></Link>
                </div>
                
            </navbar>
            {children}
            <footer className={styles.footer}>
                FOOTER
            </footer>
        </section>
    )
}
