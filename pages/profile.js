import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';
import Image from "next/image"
import styles from "../styles/Profilepage.module.css"

export default function Home() {
    const context = useContext(AuthContext)
    return (
        <div className={styles.main}>
            {context.user ?
                <div className={styles.content}>
                    <div> Name: {context.user.user_metadata.full_name} </div>
                    <div> ID: {context.user.id} </div>
                    <div>   <Image src={context.user.avatar} objectFit="contain" height={200} width={200} alt="avatar"/>  </div>
                </div>
                :
                <div> YOU ARE NOT AUTHORIZED TO SEE THIS PAGE </div>}
        </div>
    )
}
