import DropDown from "./DropdownMenu"
import styles from "../../styles/DropdownMenu.module.css"

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
    {
      name:"Monitors",
      href:"/category/external-utilities/monitors"
    }
  ]
  
  const MBLinks = [
    {
      name:"Processor",
      href:"/category/desktop/processor"
    },
    {
      name:"RAM",
      href:"/category/desktop/ram"
    },
    {
      name:"Graphic Cards",
      href:"/category/desktop/graphic-cards"
    },
    {
      name:"Motherboards",
      href:"/category/desktop/motherboards"
    },
    {
      name:"Power Supply",
      href:"/category/desktop/power"
    },
    {
      name:"BIOS Chips",
      href:"/category/desktop/bios-chips"
    },
  ]
  
  const LP = [
    {
      name:"Processor",
      href:"/category/laptop/processor"
    },
    {
      name:"RAM",
      href:"/category/laptop/ram"
    },
    {
      name:"Graphic Cards",
      href:"/category/laptop/graphic-cards"
    },
    {
      name:"Motherboards",
      href:"/category/laptop/motherboards"
    },
  ]


export default function CategoriesNavbar(){
    return (
        <section className={styles.upperNavSection}>
            <DropDown title={"External Utilities"} mainCategoryHref="/category/external-utilities" links={EULinks} />
            <DropDown title={"Desktop Parts"} mainCategoryHref="/category/desktop" links={MBLinks} />
            <DropDown title={"Laptop Parts"} mainCategoryHref="/category/laptop" links={LP} />
            {/* <DropDown title={"Monitors"} mainCategoryHref="/category/monitors" links={[]} /> */}
        </section>
    )
}

