const axios = require("axios")

import fs from "fs"

const readRegisterStatus = () => { // IF REGISTERED?
    var file = JSON.parse(fs.readFileSync("isRegistered.json"));
    return file
}

const addUser = async (user) => {
    if (readRegisterStatus().userIsRegistered) {
        //DO NOTHING
    }
    else {
        const res = await axios({ // ADD NEW USER TO DATABASE WITH SENDING POST REQUEST TO MAIN SERVER
            method: 'post',
            url: 'https://mazon-server.herokuapp.com/adduser',
            data: user
        })
        fs.writeFileSync("isRegistered.json", JSON.stringify({ userIsRegistered: true })) // SET USERISREGISTERED TO TRUE SO DONT HAVE TO REGISTER AGAIN
    }

}


module.exports = {
    addUser
} 