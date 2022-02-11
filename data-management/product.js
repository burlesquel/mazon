class Product{
    constructor(id, name, description, isItDiscounted, discountAmount, priceWithoutDiscount, isInStock, quantity, brand, category, storeName, storeUrl, imgUrl ){
        this.id = id
        this.name = name
        this.description = description
        this.price = {
            "discounted":isItDiscounted,
            "discount":discountAmount,
            "price_without_discount":priceWithoutDiscount,
            "total_price": priceWithoutDiscount - discountAmount,
          }
          this.stock = {
            "in_stock":isInStock,
            "quantity":quantity
          }
          this.brand = brand
          this.category = category
          this.store = {
            "name":storeName,
            "url":storeUrl
          }
          this.image_url = imgUrl
    }
}

module.exports = {
    Product
} 