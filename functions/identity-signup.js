const {addUser} = require("../data-management/addProduct")

exports.handler = async (event, context, callback) => {

    console.log(chalk.red("hook triggered"))

    addUser()

    try {

        return {
            statusCode: 200,
            body: JSON.stringify({status_: "success"}),
        }
    }

    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                data: err
            }),
        }
    }
}