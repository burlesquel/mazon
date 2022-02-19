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
                <h3><Link href={"/new_product"}>Create New Product</Link></h3>
            </div>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }


}
