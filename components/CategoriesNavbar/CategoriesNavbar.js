import DropDown from "./DropdownMenu"

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
  


export default CategoriesNavbar = () => {
    return (
        <section className={styles.upperNavSection}>
            <DropDown title={"External Utilities"} links={EULinks} />
            <DropDown title={"Motherboard"} links={MBLinks} />
            <DropDown title={"Laptop Parts"} />
            <DropDown title={"Monitors"} />
        </section>
    )
}

