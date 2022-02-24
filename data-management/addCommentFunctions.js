const axios = require("axios")

const serverURL = "https://mazon-server.herokuapp.com"

class Comment_{
    constructor(userID, date, comment, productid, userName){
        this.userID = userID
        this.date = date
        this.like = 0
        this.comment = comment
        this.product_id = productid
        this.userName = userName
    }
}

const addComment = async(event, context, router, productid) =>{
    await event.preventDefault(); // event.target.xxx.value 
    console.log("ADD COMMENTTTTTTTTTTTTTTTT");
    console.log(context);
    const {comment} = event.target

    const com = new Comment_(context.user.id, new Date().toLocaleString(), comment.value, productid, context.user.user_metadata.full_name)

    console.log(com);
  
    await axios.post(`${serverURL}/addcomment`, com).then(res => {
        console.log(res);
        router.push(`/product/${productid}`)
    })
}

module.exports = {
    Comment_, addComment
}