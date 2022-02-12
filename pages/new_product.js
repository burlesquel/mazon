const { Product } = require("../data-management/product")
const { generateId, uploadImage } = require("../data-management/addProduct")
const axios = require("axios")
import { useRouter } from 'next/router';


const addProduct = async (event) => {
    await event.preventDefault(); // event.target.xxx.value 
    const { name, description, price, category, stock, brand, storeName, image } = await event.target
    const id = generateId(8)

    const imageFile = await image.files[0]

    const res = await uploadImage(imageFile)

    const imgUrl = await res.data.data.display_url

    const product_ = new Product(id, name.value, description.value, false, 0, Number(price.value), true, Number(stock.value) , brand.value, category.value, storeName.value, "anan.am.com", imgUrl)

    console.log(product_);

    axios.post('https://mazon-server.herokuapp.com/addproduct', product_).then(res=>{
        const router = useRouter()    
        router.push(`/product/${id}`)
    })

};

export default function Home() {

    return (
        <div>

            <h1>ADD PRODUCT</h1>

            <form method="post" onSubmit={addProduct}>
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
                    <input id="category" name="category" type="text" autoComplete="category" required />
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
