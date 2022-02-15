import { addUser } from "../../data-management/addUser";

export async function handler(event, context) {
    try {
        const { user } = JSON.parse(event.body)
        console.log(user);
        await addUser(user)
        return {
            statusCode: 200,
        };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
}