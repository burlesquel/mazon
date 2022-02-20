const axios = require("axios")

class Comment_{
    constructor(userID, date, comment, productid){
        this.userID = userID
        this.date = date
        this.like = 0
        this.comment = comment
        this.product_id = productid
    }
}

const addComment = async(event, context, router, productid) =>{
    await event.preventDefault(); // event.target.xxx.value 
    console.log("ADD COMMENTTTTTTTTTTTTTTTT");
    console.log(context);
    const {comment} = event.target

    const com = new Comment_(context.user.id, new Date().toLocaleString(), comment.value, productid)

    console.log(com);
  
    await axios.post('https://mazon-server.herokuapp.com/addcomment', com).then(res => {
        console.log(res);
    })
}

module.exports = {
    Comment_, addComment
}