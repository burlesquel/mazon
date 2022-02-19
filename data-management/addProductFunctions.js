const axios = require("axios")

// const imgbbPostLink = "https://api.imgbb.com/1/upload&key=c0da0fd8e2f81e366f0e06c96e60c889"

class Product {
  constructor(id, name, description,age, isItDiscounted, discountAmount, priceWithoutDiscount, isInStock, quantity, brand, category, subcategory, ownerName, ownerId, imgUrl) {
    this.id = id
    this.name = name
    this.description = description
    this.age = age
    this.price = {
      "discounted": isItDiscounted,
      "discount": discountAmount,
      "price_without_discount": priceWithoutDiscount,
      "total_price": priceWithoutDiscount - discountAmount,
    }
    this.stock = {
      "in_stock": isInStock,
      "quantity": quantity
    }
    this.brand = brand
    this.category = category
    this.subcategory = subcategory
    this.owner = {
      "name": ownerName,
      "id": ownerId
    }
    this.image_url = imgUrl
    
  }
  
}


const generateId = (_length) => {
  return Math.random().toString(36).substr(2, _length);
};

function uploadImage(img) {
  let body = new FormData()
  body.set('key', "c0da0fd8e2f81e366f0e06c96e60c889")
  body.append('image', img)

  return axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body
  })
}

module.exports = {
  generateId, uploadImage, Product
} 