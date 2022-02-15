const axios = require('axios')


class User {
    constructor(id, email, name, role, confirmation_done_at) {
        this.id = id
        this.email = email
        this.name = name
        this.role = role
        this.confirmation_done_at = confirmation_done_at
        this.stores = []

    }
}


const addUser = async (user) => {
    const newUser = new User(user.id, user.email, user.user_metadata.full_name, user.role, user.confirmation_sent_at)
    const res = await axios({ // ADD NEW USER TO DATABASE WITH SENDING POST REQUEST TO MAIN SERVER
        method: 'post',
        url: 'https://mazon-server.herokuapp.com/adduser',
        data: newUser
    })
    console.log(newUser);
}



exports.handler = async function (event) {

        const { user } = JSON.parse(event.body)
        console.log(user);
        await addUser(user)
        return {
            statusCode: 200,
        };

}