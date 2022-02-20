import { useRouter } from 'next/router';
import { useContext } from "react"
import AuthContext from '../authentication/authContext';


export default function Home() {

    const router = useRouter()
    const context = useContext(AuthContext)

    if (context.user) {


        return (
            <div>
                <h3>CHAT</h3>
            </div>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }


}
