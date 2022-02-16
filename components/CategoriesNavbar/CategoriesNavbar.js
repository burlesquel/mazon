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
  ]
  
  const MBLinks = [
    {
      name:"Processor",
      href:"/category/motherboard/processors"
    },
    {
      name:"RAM",
      href:"/category/motherboard/ram"
    },
    {
      name:"Graphic Cards",
      href:"/category/motherboard/graphic-cards"
    },
    {
      name:"Motherboards",
      href:"/category/motherboard/motherboards"
    },
    {
      name:"Power",
      href:"/category/motherboard/power"
    },
    {
      name:"BIOS Chips",
      href:"/category/motherboard/bios-chips"
    },
  ]
  


export default function CategoriesNavbar(){
    return (
        <section className={styles.upperNavSection}>
            <DropDown title={"External Utilities"} links={EULinks} />
            <DropDown title={"Motherboard"} links={MBLinks} />
            <DropDown title={"Laptop Parts"} />
            <DropDown title={"Monitors"} />
        </section>
    )
}

