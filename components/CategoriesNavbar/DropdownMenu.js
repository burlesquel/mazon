import styles from "../styles/DropdownMenu.module.css"
import { useState } from 'react'
import Link from "next/link"
var key = 0
export default function DropDown({ title, links }) {  // links = [{name:"name", href:"href"}]
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.main} onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}>

      <div className={styles.title} >
        <a>{title}</a>
      </div>


      {open ? <div className={styles.dropdown}>

          {links.map((item)=>{
            key = key+1
            return(
              <Link key={key} href={item.href}>{item.name}</Link>
            )
          })}
        
      </div> : null}

    </div>


  )
}