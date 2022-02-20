import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';

export default function Home() {
    const context = useContext(AuthContext)
    return (
        <div>
            {context.user ?
                <div>
                    <div> Name: {context.user.user_metadata.full_name} </div>
                    <div> ID: {context.user.id} </div>
                </div>
                :
                <div> YOU ARE NOT AUTHORIZED TO SEE THIS PAGE </div>}
        </div>
    )
}
