const { categoryStructure, addProduct, TechnicalDetailsForm } = require("../data-management/addProductFunctions")

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';
import styles from "../styles/New_product.module.css"
var key = 0
var key2 = 1




export default function Home() {

    const router = useRouter()
    const context = useContext(AuthContext)

    const [selectedSubCategory, setSelectedSubCategory] = useState("")
    const [selectedCategory, setSelectedCategory] = useState()


    if (context.user) {
        return (
            <div className={styles.mainContainer}>

                <form className={styles.formContainer} method="post" onSubmit={() => { addProduct(event, router, context) }}>


                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="name">Name</label>
                        <input className="form-control" id="name" name="name" type="text" autoComplete="name" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="description">Description</label>
                        <input className="form-control" id="description" name="description" type="text" autoComplete="description" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="age">Age</label>
                        <input className="form-control" id="age" name="age" type="number" autoComplete="age" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="price">Price</label>
                        <input className="form-control" id="price" name="price" type="number" autoComplete="price" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="category">Category</label>
                        <select className='form-select' id="category" name="category" defaultValue={''} value={selectedCategory} onChange={(value) => { setSelectedCategory(value.target.value); setSelectedSubCategory("") }}>
                            <option value="" disabled hidden>Choose here</option>
                            {Object.keys(categoryStructure).map((category) => {
                                return (
                                    <option key={parseInt(Math.random() * 100000)} value={category}>{category.replace("-", " ").toUpperCase()}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="subcategory">Subcategory</label>
                        <select className='form-select' id="subcategory" name="subcategory" value={selectedSubCategory} defaultValue={''} onChange={(value) => { setSelectedSubCategory(value.target.value) }}>
                            <option value="" disabled hidden>Choose here</option>
                            {

                                // <option key={key} value={sc}>{sc}</option> // WITH MAP
                                selectedCategory && categoryStructure[selectedCategory].map((subcategory) => {
                                    console.log("sub category rendered");
                                    return (
                                        <option key={parseInt(Math.random() * 100000)} value={subcategory}>{subcategory.replace("-", " ").toUpperCase()}</option>
                                    )
                                })

                            }
                        </select>
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="stock">Stock</label>
                        <input className="form-control" id="stock" name="stock" type="number" autoComplete="stock" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="brand">Brand</label>
                        <input className="form-control" id="brand" name="brand" type="text" autoComplete="brand" required />
                    </div>

                    <div className={styles.eachInputAndLabel}>
                        <label htmlFor="image">Image</label>
                        <input className="form-control-file" id="image" name="image" type="file" accept="image/png, image/gif, image/jpeg" autoComplete="image" required />
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
