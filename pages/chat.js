import { useRouter } from 'next/router';
import { useContext } from "react"
import AuthContext from '../authentication/authContext';


export default function Home() {

    const router = useRouter()
    const context = useContext(AuthContext)

    if (context.user) {
        console.log(context.user.socket.id);
        console.log(context.user.socket);

        return (
            <div>
                <h3>CHAT</h3>
                <button onClick={()=>{
                    context.user.socket.emit("chat screen")
                }}> SELAMKE</button>
            </div>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }


}
