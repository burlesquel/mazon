const { generateId, uploadImage, Product } = require("../data-management/addProductFunctions")
const axios = require("axios")
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';
import styles from "../styles/New_product.module.css"
var key = 0
var key2 = 1


const addProduct = async (event) => {

    Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));

    await event.preventDefault(); // event.target.xxx.value 

    const values = Object.values(event.target)
    const keyValuePairs = []

    values.forEach((v) => {
        if (v.name === "" || v.name === undefined) {

        }
        else {
            console.log(v.name);
            console.log(v.value);
            keyValuePairs.push([v.name.replace(" ", "_"), v.value])
        }

    })

    var preProduct = Object.fromEntries(keyValuePairs)

    var { name, description, price, category, subcategory, stock, brand, storeName, image, ...rest } = preProduct
    var { image } = event.target


    const id = generateId(8)
    const imageFile = await image.files[0]
    const res = await uploadImage(imageFile)
    const imgUrl = await res.data.data.display_url
    const product_ = new Product(id, name, description, false, 0, Number(price), true, Number(stock), brand, category, subcategory, storeName, "anan.am.com", imgUrl)
    product_.details = rest
    console.log(product_);

    // await axios.post('https://mazon-server.herokuapp.com/addproduct', product_).then(res => {
    //     console.log(res);
    //     router.push(`/product/${id}`)
    // })

};

const categoryStructure = {
    "external-utilities": ["keyboards", "printers", "mouse", "speakers", "monitors"],
    "desktop": ["processor", "ram", "graphic-cards", "motherboards", "power", "bios-chips"],
    "laptop": ["processor", "ram", "graphic-cards", "motherboards", "power", "bios-chips"],
}

class Details {
    constructor(name, type, options) {
        this.name = name
        this.type = type
        this.options = options
    }
}

const TechnicalDetailsStructure = {
    "": [],
    "keyboards": [new Details("Model", "selection", ["A4 Tech", "Apple", "Asus", "Everest", "Frisby", "HP", "INCA", "Logitech", "Microsoft"]), new Details("Connection", "selection", ["USB", "Bluetooth"]), new Details("Keyboard Order", "selection", ["English Q", "Turkish F", "Turkish Q", "Arabic", "Russian", "Chinese"]), new Details("Gaming Keyboard", "selection", ["Yes", "No"])],
    "printers": [],
    "mouse": [],
    "speakers": [],
    "monitors": [new Details("Model", "string", []), new Details("Resolution", "selection", ["1024×576", "1152×648", "1280×720 (HD)", "1366×768", "1440x900", "1600×900", "1920×1080 (FHD)", "2560x1080", "2560×1440 (QHD)", "3440x1440", "3840×2160 (4K)", "7680x4320 (8K)"]), new Details("Screen Size (inch)", "integer", []), new Details("Aspect Ratio", "selection", ["4:3", "16:9", "16:10", "21:9", "32:9"])],
    "processor": [new Details("Model", "selection", ["Intel", "AMD"]), new Details("Full Name", "string", []), { name: "Socket Type", type: "selection", options: ["Slot 1", "Slot A", "370", "423", "462", "478", "754", "775", "939"] }, { name: "Clock Speed (in GHz)", type: "integer", options: [] }, { name: "Bus Speed (in MHz)", type: "integer", options: [] }, { name: "Cores", type: "selection", options: [1, 2, 4, 6, 8] }, { name: "CPU(s)", type: "integer", options: [] }],
    "ram": [new Details("Model", "selection", ["G-Skill", "Crucial", "Mushkin", "Samsung", "OWC", "Corsair", "Kingston", "Patriot", "T-Force", "Hynix"]), new Details("Memory Size", "selection", [1, 2, 4, 8, 16, 32]), new Details("Double Rate Data", "selection", ["DDR2", "DDR3", "DDR4"]), new Details("Clock Speed (MHz)", "integer", []), new Details("ECC Support", "selection", ["yes", "no"])],
    "graphic-cards": [new Details("Model", "selection", ["AMD", "Intel"]), new Details("Full Name", "string", []), new Details("Clock Speed", "integer", []), new Details("Memory Type", "selection", ["GDDR5", "GDDR5x", "GDDR6 VRAM"]), new Details("Memory Size", "selection", ["256mb", "512mb", 1, 2, 4, 6, 8]), new Details("Memory Bandwith (bit)", "selection", [32, 64, 128, 256, 384]), new Details("Thermal Design Power (W)", "integer", [],)],
    "motherboards": [new Details("Model", "selection", ["ASRock", "Asus", "Biostar", "EVGA Corporation", "Gigabyte Technology", "MSI", "Intel", "Acer", "Lite-On"]), new Details("Size", "selection", ["ATX", "Micro-ATX", "Mini-ITX"]), new Details("CPU Socket Type", "selection", ["LGA", "PGA", "ZIF", "BGA"]), new Details("Chipset", "selection", ["A320", "A520", "B350", "B450", "B550", "X370", "X470", "X570", "H310", "B360", "B365", "H370", "Q370", "Z370", "Z390", "H410", "B460", "H470", "Z490"]), new Details("RAM Slots", "selection", ["DDR2", "DDR3", "DDR4"]), new Details("Video Connector Ports", "selection", ["VGA", "DVI", "HDMI", "DisplayPort"])],
    "power": [],
    "bios-chips": [],
}

const EachDetail = ({ detail }) => {
    if (detail.type === "string") {
        console.log("string");
        return (

            <div className={styles.eachInputAndLabel} key={parseInt(Math.random() * 100000)}>
                <label htmlFor={detail.name.toLowerCase()}>{detail.name}</label>
                <input id={detail.name.toLowerCase()} name={detail.name.toLowerCase()} type="text" autoComplete={detail.name.toLowerCase()} required />
            </div>

        )
    }
    else if (detail.type === "integer") {
        console.log("integer");
        return (

            <div className={styles.eachInputAndLabel} key={parseInt(Math.random() * 100000)}>
                <label htmlFor={detail.name.toLowerCase()}>{detail.name}</label>
                <input id={detail.name.toLowerCase()} name={detail.name.toLowerCase()} type="number" autoComplete={detail.name.toLowerCase()} required />
            </div>

        )
    }
    else if (detail.type === "selection") {
        console.log("selection");
        return (

            <div className={styles.eachInputAndLabel} key={parseInt(Math.random() * 100000)}>
                <label htmlFor={detail.name.toLowerCase()}>{detail.name}</label>
                <select id={detail.name.toLowerCase()} name={detail.name.toLowerCase()} >
                    <option value="" selected disabled hidden>Choose here</option>
                    {detail.options.map((o) => {
                        console.log(o);
                        return (
                            <option key={parseInt(Math.random() * 100000)} value={String(o)}>{String(o)}</option>
                        )
                    })}
                </select>
            </div>

        )
    }
    else {
        console.log("AN ERROR OCURRED");
        return <div key={parseInt(Math.random() * 100000)}>SMT HAPPENED</div>
    }
}

const TechnicalDetailsForm = ({ category, subCategory }) => {

    return (
        <div className={styles.preTechnicalDetailsContainer}>
            {/* 
            div.technicalDetailsContainer
              div
                div
                  label
                  input / select
            */}
            {
                subCategory &&
                <div className={styles.technicalDetailsContainer}>
                    {TechnicalDetailsStructure[subCategory].map(detail => {
                        return <EachDetail key={parseInt(Math.random() * 100000)} detail={detail} />
                    })}
                </div>
            }

        </div>

    )

}

export default function Home() {

    const router = useRouter()
    const context = useContext(AuthContext)

    const [selectedSubCategory, setSelectedSubCategory] = useState("")
    const [selectedCategory, setSelectedCategory] = useState()


    if (context.user) {
        return (
            <div className={styles.mainContainer}>

                <form className={styles.formContainer} method="post" onSubmit={() => { addProduct(event, router) }}>


                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" autoComplete="name" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="description">Description</label>
                        <input id="description" name="description" type="text" autoComplete="description" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="price">Price</label>
                        <input id="price" name="price" type="number" autoComplete="price" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" defaultValue={''} value={selectedCategory} onChange={(value) => { setSelectedCategory(value.target.value); setSelectedSubCategory("") }}>
                            <option value="" disabled hidden>Choose here</option>
                            {Object.keys(categoryStructure).map((category) => {
                                return (
                                    <option value={category}>{category.replace("-", " ").toUpperCase()}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select id="subcategory" name="subcategory" value={selectedSubCategory} defaultValue={''} onChange={(value) => { setSelectedSubCategory(value.target.value) }}>
                            <option value="" disabled hidden>Choose here</option>
                            {

                                // <option key={key} value={sc}>{sc}</option> // WITH MAP
                                selectedCategory && categoryStructure[selectedCategory].map((subcategory) => {
                                    key = key + 1
                                    console.log("sub category rendered");
                                    return (
                                        <option key={key} value={subcategory}>{subcategory.replace("-", " ").toUpperCase()}</option>
                                    )
                                })

                            }
                        </select>
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="stock">Stock</label>
                        <input id="stock" name="stock" type="number" autoComplete="stock" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="brand">Brand</label>
                        <input id="brand" name="brand" type="text" autoComplete="brand" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="storeName">Store Name</label>
                        <input id="storeName" name="storeName" type="text" autoComplete="storeName" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="image">image</label>
                        <input id="image" name="image" type="file" accept="image/png, image/gif, image/jpeg" autoComplete="image" required />
                    </div>

                    <h1>TECHNICAL DETAILS</h1>

                    <TechnicalDetailsForm subCategory={selectedSubCategory} category={selectedCategory} />

                    <button className="btn btn-primary" type="submit">Save</button>

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
