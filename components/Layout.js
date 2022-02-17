
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Layout.module.css"
import AuthContext from "../authentication/authContext"
import { useContext } from "react"


export default function Layout({ children }) {
    const context = useContext(AuthContext) // determined value in authcontext provider as props
    console.log(context.user);

    return (
        <section>

            <navbar className={styles.navbar}>
                <div className={styles.logodiv}>
                    <Link href={"/"}><Image alt="image" className={styles.logo} src={"https://i.ibb.co/6btqxHd/Mazon-logos-white.png"} objectFit="contain" layout="fill" /></Link>
                </div>

                {context.authReady ? (  // IF THE PAGE IS LOADING AND DONT KNOW IF THE USER LOGGED IN OR NOT, DO NOT RENDER THE NAVBAR
                    <div className={styles.linksdiv}>
                        <Link href={"/"}><h3>Main Page</h3></Link>
                        <Link href={"/products"}><h3>Products</h3></Link>
                        {context.user ? <Link href={"/my_store"}><h3>My Store</h3></Link> : null}
                        {context.user ? null : <a onClick={context.login}>LOGIN/SIGN IN</a>}
                        {context.user ? <a onClick={context.logout}>LOG OUT</a> : null}
                    </div>
                )
                    :
                    (null)}
            </navbar>

            {children}

            <footer className={styles.footer}>
                <div className={styles.footerLogoContainer}><Image alt="image" className={styles.logo} src={"https://i.ibb.co/6btqxHd/Mazon-logos-white.png"} objectFit="contain" layout="fill" /></div>
                <div>
                    <h3>ABOUT US</h3>
                    <ul>
                        <li>Careers</li>
                        <li>Blog</li>
                        <li>About Mazon</li>
                        <li>Investor Relations</li>
                    </ul>
                </div>
                <div>
                    <h3>OUR POLICY</h3>
                    <ul>
                        <li>User Agreements</li>
                        <li>Store Agremeents</li>
                        <li>Become an Affiliate</li>
                        <li>Returns & Replacements</li>
                        <li>Business Card</li>
                        <li>Advertise Your Product</li>
                    </ul>
                </div>
                <div>
                    <h3>LET US HELP YOU</h3>
                    <ul>
                        <li>Contact</li>
                        <li>Mazon Assistant</li>
                        <li>Your Account</li>
                        <li>Covid19</li>
                        <li>Returns & Replacements</li>
                        <li>Help</li>
                    </ul>
                </div>
            </footer>

        </section>
    )
}
