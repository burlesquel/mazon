exports.handler = async (event, context, callback) => {

    console.log(chalk.red("hook triggered"))

    try {

        return {
            statusCode: 200,
            body: JSON.stringify(responseBody),
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