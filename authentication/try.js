const fs = require('fs');
const axios = require("axios")

const readRegisterStatus = () => { // IF REGISTERED?
    var file = JSON.parse(fs.readFileSync("isRegistered.json"));
    return file
}

const addUser = async (user) => {
    const res = await axios({
        method: 'post',
        url: 'http://localhost:8000/adduser',
        data: user
    })
}

if (readRegisterStatus().userIsRegistered) {
    //DO NOTHING
}
else {
    addUser("selamke")
    fs.writeFileSync("isRegistered.json", JSON.stringify({ userIsRegistered: true }))
    console.log("sent to server ins");
}