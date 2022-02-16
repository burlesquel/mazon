import styles from "../styles/DropdownMenu.module.css"
import { useState } from 'react'
import Link from "next/link"

export default function DropDown({ title, links }) {  // links = [{name:"name", href:"href"}]
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.main} onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}>

      <div className={styles.title} >
        <a>{title}</a>
      </div>


      {open ? <div className={styles.dropdown}>

          {links.map((item)=>{
            return(
              <Link href={item.href}>{item.name}</Link>
            )
          })}
        
      </div> : null}

    </div>


  )
}