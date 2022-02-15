const axios = require("axios")

const addUser = async (user) => {
        const res = await axios({ // ADD NEW USER TO DATABASE WITH SENDING POST REQUEST TO MAIN SERVER
            method: 'post',
            url: 'https://mazon-server.herokuapp.com/adduser',
            data: user
        })
}


module.exports = {
    addUser
} 