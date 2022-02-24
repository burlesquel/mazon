import CategoriesNavbar from "../components/CategoriesNavbar/CategoriesNavbar"
import Link from "next/link"
import Image from "next/image"
import styles from "../styles/Layout.module.css"
import AuthContext from "../authentication/authContext"
import { useContext, useEffect, useState } from "react"
import Loading from "./Loading"
import { IoPersonCircleSharp } from "react-icons/io5";

const ProfileDropdown = ({ context }) => {
    const socket = context.user.socket

    useEffect(()=>{
        socket.on("message feedback to user",(message)=>{
            console.log("NEW MESSAGE (from Layout.js): ", message);
        })
    },[])



    const [open, setOpen] = useState(false)

    return (

        <div className={styles.PDDMainContainer}>

            <div onClick={() => { setOpen(!open) }} className={styles.PDDButton}>
                <h3>
                    <IoPersonCircleSharp />
                </h3>
            </div>

            {open &&
                <div className={styles.PDDropdown}>
                    <div> <Link href={"/profile"}>Profile</Link></div>
                    <div onClick={() => { console.log("PRESSED LOGOUT"); context.logout() }}> Logout</div>

                </div>
            }

        </div>

    )
}

export default function Layout({ children }) {


    const context = useContext(AuthContext) // determined value in authcontext provider as props

    return (
        <section>

            <div className={styles.mainNavContainer}>
                <div className={styles.navbar}>
                    <div className={styles.logodiv}>
                        <Link href={"/"}><Image alt="image" className={styles.logo} src={"https://i.ibb.co/6btqxHd/Mazon-logos-white.png"} objectFit="contain" layout="fill" /></Link>
                    </div>

                    {context.authReady ? (  // IF THE PAGE IS LOADING AND DONT KNOW IF THE USER LOGGED IN OR NOT, DO NOT RENDER THE NAVBAR
                        <div className={styles.linksdiv}>
                            <Link href={"/"}><h5>Main Page</h5></Link>
                            <Link href={"/products"}><h5>Products</h5></Link>
                            {context.user ? <Link href={"/chat"} ><h5>Messages</h5></Link> : null}
                            {context.user ? null : <a onClick={context.login}>LOGIN/SIGN IN</a>}
                            {context.user ? <ProfileDropdown context={context} /> : null}
                        </div>
                    )
                        :
                        <div className={styles.linksdiv}>
                            <Loading />
                            <Loading />
                            <Loading />
                            <Loading />
                            <Loading />
                        </div>
                    }
                </div>
                <CategoriesNavbar />
            </div>





            {children}

            <div className={styles.footer}>
                <div className={styles.footerLogoContainer}><Image alt="image" className={styles.logo} src={"https://i.ibb.co/6btqxHd/Mazon-logos-white.png"} objectFit="contain" layout="fill" /></div>
                <div>
                    <h5>ABOUT US</h5>
                    <ul>
                        <li>Careers</li>
                        <li>Blog</li>
                        <li>About Mazon</li>
                        <li>Investor Relations</li>
                    </ul>
                </div>
                <div>
                    <h5>OUR POLICY</h5>
                    <ul>
                        <li>User Agreements</li>
                        <li>Store Agremeents</li>
                        <li>Become an Affiliate</li>
                        <li>Business Card</li>
                        <li>Advertise Your Product</li>
                    </ul>
                </div>
                <div>
                    <h5>LET US HELP YOU</h5>
                    <ul>
                        <li>Contact</li>
                        <li>Mazon Assistant</li>
                        <li>Your Account</li>
                        <li>Covid19</li>
                        <li>Returns and Replacements</li>
                        <li>Help</li>
                    </ul>
                </div>
            </div>

        </section>
    )
}
