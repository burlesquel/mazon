import axios from "axios"
import { User } from "../data-management/user"

const addUser = async (user) => {
    const newUser = new User(user.id, user.email, user.user_metadata.full_name, user.role, user.confirmation_sent_at)
    // const res = await axios({ // ADD NEW USER TO DATABASE WITH SENDING POST REQUEST TO MAIN SERVER
    //     method: 'post',
    //     url: 'https://mazon-server.herokuapp.com/adduser',
    //     data: newUser
    // })
    console.log(newUser);
}


export default {
    addUser
} 