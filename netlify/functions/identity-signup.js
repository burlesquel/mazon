const axios = require('axios')

const fetchURL = "https://mazon-server.herokuapp.com"


class User {
    constructor(id, email, name, role, confirmation_done_at, avatar = "https://i.ibb.co/PM7QGLv/Blank-Man-Profile-Head-Icon-Placeholder.jpg") {
        this.id = id
        this.email = email
        this.name = name
        this.role = role
        this.confirmation_done_at = confirmation_done_at
        this.products = []
        this.comments = []
        this.avatar = avatar
    }
}


const addUser = async (user) => {
    const newUser = new User(user.id, user.email, user.user_metadata.full_name, user.role, user.confirmation_sent_at)
    const res = await axios({ // ADD NEW USER TO DATABASE WITH SENDING POST REQUEST TO MAIN SERVER
        method: 'post',
        url: `${fetchURL}/adduser`,
        data: newUser
    })
    console.log(newUser);
}



exports.handler = async function (event) {
        console.log(event);
        const { user } = JSON.parse(event.body)
        console.log(user);
        await addUser(user)
        return {
            statusCode: 200,
        };

}