
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Layout.module.css"

import AuthContext from "../authentication/authContext"
import { useContext, useEffect, useState } from "react"


export default function Layout({ children }) {

    const context = useContext(AuthContext) // determined value in authcontext provider as props
    console.log(context);

    return (
        <section>

            <navbar className={styles.navbar}>
                <div className={styles.logodiv}>
                    <Image alt="image" className={styles.logo} src={"https://i.ibb.co/nDmVdY3/Logo-withoutbg-blackwithtext.png"} layout="responsive" width={250} height={50} />
                </div>
                <div className={styles.linksdiv}>
                    <Link href={"/"}><h3>Index</h3></Link>
                    <Link href={"/products"}><h3>Products</h3></Link>
                    <Link href={"/new_product"}><h3>Create New Product</h3></Link>
                    <a onClick={()=>{context.login()}}>LOGIN</a>
                    <a onClick={()=>{context.logout()}}>LOG OUT</a>
                </div>
            </navbar>

            {children}

            <footer className={styles.footer}>
                FOOTER
            </footer>

        </section>
    )
}
