const {addUser} = require("../../data-management/addUser")

exports.handler = async (event) => {

    const { user } = JSON.parse(event.body)
    console.log(user);
    addUser(user)
    return {
        statusCode: 200,
        body: JSON.stringify({
            app_metadata: {
                roles: ["basic user"]
            }
        })
    }

}