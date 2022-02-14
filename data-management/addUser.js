const axios = require("axios")

const addUser = async () =>{
    const res = await axios({
        method: 'post',
        url: 'https://mazon-server.herokuapp.com/adduser',
        data: "STILL DONT HAVE USER PARAM"
      })
}



  module.exports = {
    addUser
} 