import { Menu } from '@headlessui/react'
import DropDown from "../components/DropdownMenu"
import { useState } from "react"
import Product from "../components/Product"
import styles from "../styles/Products.module.css"


export async function getServerSideProps() {

  const products = await fetch(`https://mazon-server.herokuapp.com/data`).then(r => r.json())
  return {
    props: {
      products
    }
  }
}

// links = [{name:"name", href:"href"}]

const EULinks = [
  {
    name:"Keyboards",
    href:"/category/external-utilities/keyboards"
  },
  {
    name:"Printers",
    href:"/category/external-utilities/printers"
  },
  {
    name:"Mouse",
    href:"/category/external-utilities/mouse"
  },
  {
    name:"Speakers",
    href:"/category/external-utilities/speakers"
  },
]

const MBLinks = [
  {
    name:"Processor",
    href:"/category/external-utilities/processors"
  },
  {
    name:"RAM",
    href:"/category/external-utilities/ram"
  },
  {
    name:"Graphic Cards",
    href:"/category/external-utilities/graphic-cards"
  },
  {
    name:"Motherboards",
    href:"/category/external-utilities/motherboards"
  },
  {
    name:"Power",
    href:"/category/external-utilities/power"
  },
  {
    name:"BIOS Chips",
    href:"/category/external-utilities/bios-chips"
  },
]


export default function Products({ products }) {
  
  const [searchValue, setSearchValue] = useState(null)
  return (
    <>
    <section className={styles.upperNavSection}> 
      <DropDown title={"External Utilities"} links={EULinks}/>
      <DropDown title={"Motherboard"} links={MBLinks}/>
      <DropDown title={"Laptop Parts"}/>
      <DropDown title={"Monitors"}/>
     </section>
      <div>

        <h2>Search product</h2>
        <input onChange={(val) => { setSearchValue(val.target.value) }} type={"search"} placeholder="Product id" />
        <button onClick={() => { router.push(`/product/${searchValue}`) }}>Search</button>

      </div>

      <div className={styles.productsContainer}>
        {products.map(product=><Product key={product.id} product={product} />)}
        
      </div>
    </>
  )
}
