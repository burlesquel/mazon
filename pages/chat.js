import { useRouter } from 'next/router';
import { useContext } from "react"
import AuthContext from '../authentication/authContext';
import Chat from '../components/Chat';

export default function Home() {
    const context = useContext(AuthContext)

    if (context.user) {
        
        return (
            <Chat/>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }


}
