const axios = require("axios")

const addUser = async (user) => {
        const res = await axios({ // ADD NEW USER TO DATABASE WITH SENDING POST REQUEST TO MAIN SERVER
            method: 'post',
            url: 'http://localhost:8000/adduser',
            data: user
        })
        fs.writeFileSync("isRegistered.json", JSON.stringify({ userIsRegistered: true })) // SET USERISREGISTERED TO TRUE SO DONT HAVE TO REGISTER AGAIN
}


module.exports = {
    addUser
} 