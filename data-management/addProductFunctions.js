const axios = require("axios")

const serverURL = "http://localhost:8000"

import styles from "../styles/New_product.module.css"

// const imgbbPostLink = "https://api.imgbb.com/1/upload&key=c0da0fd8e2f81e366f0e06c96e60c889"

class Product {
  constructor(id, name, description,age, isItDiscounted, discountAmount, priceWithoutDiscount, isInStock, quantity, brand, category, subcategory, ownerName, ownerId, imgUrl) {
    this.id = id
    this.name = name
    this.description = description
    this.age = age
    this.price = {
      "discounted": isItDiscounted,
      "discount": discountAmount,
      "price_without_discount": priceWithoutDiscount,
      "total_price": priceWithoutDiscount - discountAmount,
    }
    this.stock = {
      "in_stock": isInStock,
      "quantity": quantity
    }
    this.brand = brand
    this.category = category
    this.subcategory = subcategory
    this.owner = {
      "name": ownerName,
      "id": ownerId
    }
    this.image_url = imgUrl
    this.ratings = {
      "comments":[],
      "rating":0
    }
    
  }
  
}


const generateId = (_length) => {
  return Math.random().toString(36).substr(2, _length);
};

function uploadImage(img) {
  let body = new FormData()
  body.set('key', "c0da0fd8e2f81e366f0e06c96e60c889")
  body.append('image', img)

  return axios({
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: body
  })
}

const categoryStructure = {
  "external-utilities": ["keyboards", "printers", "mouse", "speakers", "monitors"],
  "desktop": ["processor", "ram", "graphic-cards", "motherboards", "power-supply", "bios-chips"],
  "laptop": ["processor", "ram", "graphic-cards", "motherboards"],
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
  "keyboards": [new Details("Manufacturer", "selection", ["A4 Tech", "Apple", "Asus", "Everest", "Frisby", "HP", "INCA", "Logitech", "Microsoft", "Other"]), new Details("Connection", "selection", ["USB", "Bluetooth"]), new Details("Keyboard Order", "selection", ["English Q", "Turkish F", "Turkish Q", "Arabic", "Russian", "Chinese"]),new Details("RGB Light", "selection", ["Yes","No"]), new Details("Gaming Keyboard", "selection", ["Yes", "No"])],
  "printers": [new Details("Manufacturer", "selection", ["Brother","Canon","Dell","Dymo","Epson","Fujitsu","HP","IBM","Kodak","Konica Minolta","Kyocera","Lexmark","Okidata","Panasonic","Pantum","Pitney Bowes","Pyramid","Ricoh","Samsung","Sharp","Tektronics","Toshiba","Xerox", "Other"]),new Details("Type", "selection", ["Laser","Inkjet"]),new Details("Dots per inch (DPI)", "integer",[]),new Details("Pages Per Minute", "integer", []),new Details("Two-sided Printing (Duplexing)", "selection", ["Yes","No"]),new Details("Wireless Support", "selection", ["Yes","No"])],
  "mouse": [new Details("Manufacturer", "selection", ["Logitech","Razer","Steelseries","Roccat","HyperX","Asus","Vaxee","Corsair","Glorious","BenQ","HP","Everest","Microsoft", "Other"]),new Details("Connection", "selection", ["Wired","Wireless"]),new Details("Sensor Type", "selection", ["Optical","Laser"]),new Details("Dots Per Inch", "integer", ["max:20000", "min:50"]),new Details("Poll Rate (Hz)", "selection", [125,250,500,1000]),new Details("Max Tracking Speed (IPS)", "selection", [150,250,450,650]),new Details("Button Amount", "integer", ["2-12"])],
  "speakers": [new Details("Manufacturer", "selection", ["JBL","Bose","Sony","Yamaha","Pioneer","Sennheiser","Klipsch","Polk Audio","Sonos","Bowers&Wilkins","Harman Kardon","Focal","Dynaudio","KEF","Bang&Olufsen","Apple"]),new Details("Power (Watt)", "integer", ["50-1000"]),new Details("Sensitivity (DB)", "integer", []),new Details("Impedance (OHM)", "selection", [4,6,8]),new Details("Min. Frequency", "integer", []),new Details("Max. Frequency", "integer", [])],
  "monitors": [new Details("Manufacturer", "selection", ["Samsung","LG","Asus","Acer","Aoc","Gigabyte","ViewSonic","BenQ","Dell","MSI", "Other"]), new Details("Resolution", "selection", ["1024×576", "1152×648", "1280×720 (HD)", "1366×768", "1440x900", "1600×900", "1920×1080 (FHD)", "2560x1080", "2560×1440 (QHD)", "3440x1440", "3840×2160 (4K)", "7680x4320 (8K)"]), new Details("Screen Size (inch)", "integer", []), new Details("Aspect Ratio", "selection", ["4:3", "16:9", "16:10", "21:9", "32:9"])],
  "processor": [new Details("Manufacturer", "selection", ["Intel", "AMD", "Other"]), new Details("Full Name", "string", []), { name: "Socket Type", type: "selection", options: ["Slot 1", "Slot A", "370", "423", "462", "478", "754", "775", "939"] }, { name: "Clock Speed (in GHz)", type: "integer", options: [] }, { name: "Bus Speed (in MHz)", type: "integer", options: [] }, { name: "Cores", type: "selection", options: [1, 2, 4, 6, 8] }, { name: "CPU(s)", type: "integer", options: [] }],
  "ram": [new Details("Manufacturer", "selection", ["G-Skill", "Crucial", "Mushkin", "Samsung", "OWC", "Corsair", "Kingston", "Patriot", "T-Force", "Hynix", "Other"]), new Details("Memory Size", "selection", [1, 2, 4, 8, 16, 32]), new Details("Double Rate Data", "selection", ["DDR2", "DDR3", "DDR4"]), new Details("Clock Speed (MHz)", "integer", []), new Details("ECC Support", "selection", ["yes", "no"])],
  "graphic-cards": [new Details("Manufacturer", "selection", ["AMD", "Nvidia"]), new Details("Full Name", "string", []), new Details("Clock Speed", "integer", []), new Details("Memory Type", "selection", ["GDDR5", "GDDR5x", "GDDR6 VRAM"]), new Details("Memory Size", "selection", ["256mb", "512mb", 1, 2, 4, 6, 8]), new Details("Memory Bandwith (bit)", "selection", [32, 64, 128, 256, 384]), new Details("Thermal Design Power (W)", "integer", [],)],
  "motherboards": [new Details("Manufacturer", "selection", ["ASRock", "Asus", "Biostar", "EVGA Corporation", "Gigabyte Technology", "MSI", "Intel", "Acer", "Lite-On", "Other"]), new Details("Size", "selection", ["ATX", "Micro-ATX", "Mini-ITX"]), new Details("CPU Socket Type", "selection", ["LGA", "PGA", "ZIF", "BGA"]), new Details("Chipset", "selection", ["A320", "A520", "B350", "B450", "B550", "X370", "X470", "X570", "H310", "B360", "B365", "H370", "Q370", "Z370", "Z390", "H410", "B460", "H470", "Z490"]), new Details("RAM Slots", "selection", ["DDR2", "DDR3", "DDR4"]), new Details("Video Connector Ports", "selection", ["VGA", "DVI", "HDMI", "DisplayPort"])],
  "power-supply": [new Details("Manufacturer", "selection", []),new Details("Power Output (W)", "selection", [300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600]),new Details("Efficiency Rate", "selection", ["White","Bronze","Silver","Gold","Platinum","Titanium"]),new Details("Rail (V)", "selection", ["+3.3","+5","+12"]),new Details("Modularity", "selection", ["Non-Moduler","Semi-Modular","Full-Modular"])],
  "bios-chips": [new Details("Manufacturer", "selection", ["American Megatrends","AMI","Insyde","Intel","Phoenix", "Other"]),new Details("Full Name", "string", [])],
}

const addProduct = async (event, router, context) => {

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
  var { name, description, age, price, category, subcategory, stock, brand, image, ...rest } = preProduct
  var { image } = event.target
  const ownerName = context.user.user_metadata.full_name
  const ownerId = context.user.id
  const id = generateId(8)
  const imageFile = await image.files[0]
  const res = await uploadImage(imageFile)
  const imgUrl = await res.data.data.display_url
  const product_ = new Product(id, name, description, age, false, 0, Number(price), true, Number(stock), brand, category, subcategory, ownerName, ownerId, imgUrl)
  product_.details = rest
  console.log(product_);

  await axios.post(serverURL, product_).then(res => {
      console.log(res);
      router.push(`/product/${id}`)
  })

};

const EachDetail = ({ detail }) => {
  if (detail.type === "string") {
      console.log("string");
      return (

          <div className={styles.eachInputAndLabel} key={parseInt(Math.random() * 100000)}>
              <label htmlFor={detail.name.toLowerCase()}>{detail.name}</label>
              <input className="form-control" id={detail.name.toLowerCase()} name={detail.name.toLowerCase()} type="text" autoComplete={detail.name.toLowerCase()} required />
          </div>

      )
  }
  else if (detail.type === "integer") {
      console.log("integer");
      return (

          <div className={styles.eachInputAndLabel} key={parseInt(Math.random() * 100000)}>
              <label htmlFor={detail.name.toLowerCase()}>{detail.name}</label>
              <input className="form-control" id={detail.name.toLowerCase()} name={detail.name.toLowerCase()} type="number" autoComplete={detail.name.toLowerCase()} required />
          </div>

      )
  }
  else if (detail.type === "selection") {
      console.log("selection");
      return (

          <div className={styles.eachInputAndLabel} key={parseInt(Math.random() * 100000)}>
              <label htmlFor={detail.name.toLowerCase()}>{detail.name}</label>
              <select className='form-select' id={detail.name.toLowerCase()} name={detail.name.toLowerCase()} >
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

module.exports = {
  generateId, uploadImage, Product, categoryStructure, Details, TechnicalDetailsStructure, addProduct, EachDetail, TechnicalDetailsForm
} 