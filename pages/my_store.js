import Link from "next/link"
const axios = require("axios")
import { useRouter } from 'next/router';
import { useContext } from "react"
import AuthContext from '../authentication/authContext';


export default function Home() {

    const router = useRouter()
    const context = useContext(AuthContext)

    if (context.user) {
        return (
            <div>
                MY STORE
                <Link href={"/new_product"}><h3>Create New Product</h3></Link>
            </div>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }


}
