exports.handler = async (event) => {
    const { user } = JSON.parse(event.body)
    console.log(user);
    return {
        statusCode: 200,
        body: JSON.stringify({
            app_metadata: {
                roles: ["free"]
            }
        })
    }
}