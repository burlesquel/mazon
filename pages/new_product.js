
const { generateId, uploadImage, Product } = require("../data-management/addProductFunctions")
const axios = require("axios")
import { useRouter } from 'next/router';
import { useContext, useState } from "react"
import AuthContext from '../authentication/authContext';
var key = 0


const addProduct = async (event, router) => {
    await event.preventDefault(); // event.target.xxx.value 
    const { name, description, price, category, subcategory, stock, brand, storeName, image } = await event.target
    console.log(name, description, price, category, subcategory, stock, brand, storeName, image);
    const id = generateId(8)
    const imageFile = await image.files[0]
    const res = await uploadImage(imageFile)
    const imgUrl = await res.data.data.display_url
    const product_ = new Product(id, name.value, description.value, false, 0, Number(price.value), true, Number(stock.value), brand.value, category.value, subcategory.value, storeName.value, "anan.am.com", imgUrl)

    console.log(product_);

     await axios.post('https://mazon-server.herokuapp.com/addproduct', product_).then(res => {
         console.log(res);
         router.push(`/product/${id}`)
     })

};

const categoryStructure = {
    "external-utilities":["keyboards","printers","mouse","speakers"],
    "motherboard":["processor","ram","graphic-cards","motherboards","power", "bios-chips"],
    "laptop-parts":["processor","ram","graphic-cards","motherboards","power", "bios-chips"],
    "monitors":[]
}

export default function Home() {

    const router = useRouter()
    const context = useContext(AuthContext)

    const [subCategories, setSubCategories] = useState([])

    if (context.user) {
        return (
            <div>

                <h1>ADD PRODUCT</h1>

                <form method="post" onSubmit={() => { addProduct(event, router) }}>

                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" autoComplete="name" required />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <input id="description" name="description" type="text" autoComplete="description" required />
                    </div>

                    <div>
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" type="number" autoComplete="price" required />
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" onChange={(value)=>{setSubCategories(categoryStructure[value.target.value])}}>
                            <option value="external-utilities">External Utilities</option>
                            <option value="motherboard">Motherboard</option>
                            <option value="laptop-parts">Laptop Parts</option>
                            <option value="monitors">Monitors</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select id="subcategory" name="subcategory">
                            {
                                subCategories.map((sc)=>{
                                    key = key +1
                                    return(<option key={key} value={sc}>{sc}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input id="stock" name="stock" type="number" autoComplete="stock" required />
                    </div>

                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input id="brand" name="brand" type="text" autoComplete="brand" required />
                    </div>

                    <div>
                        <label htmlFor="storeName">Store Name</label>
                        <input id="storeName" name="storeName" type="text" autoComplete="storeName" required />
                    </div>

                    <div>
                        <label htmlFor="image">image</label>
                        <input id="image" name="image" type="file" accept="image/png, image/gif, image/jpeg" autoComplete="image" required />
                    </div>

                    <button type="submit">Save</button>
                </form>

            </div>
        )
    }
    else {
        return (
            <h1>You are not authorized to see this page.</h1>
        )
    }


}
