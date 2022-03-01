import { useContext, useEffect, useState } from "react"
import AuthContext from '../authentication/authContext';
import Image from "next/image"
import styles from "../styles/Profilepage.module.css"
const axios = require("axios")

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

export default function Home() {
    const context = useContext(AuthContext)
    return (
        <div className={styles.main}>
            {context.user ?
                <div className={styles.content}>
                    <div> Name: {context.user.user_metadata.full_name} </div>
                    <div> ID: {context.user.id} </div>
                    <div>   <Image src={context.avatar} objectFit="contain" height={200} width={200} alt="avatar" />  </div>
                    <form onSubmit={async(event) => {
                        event.preventDefault()
                        var { image } = event.target
                        const imageFile = await image.files[0]
                        const res = await uploadImage(imageFile)
                        const avatar = res.data.data.thumb.url
                        context.setUserAvatar(avatar)
                        context.user.socket.emit("new avatar", {avatar: avatar, id: context.user.id})
                    }}>
                        <input className="form-control-file" name="image" type={"file"} accept="image/*" />
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </form>
                </div>
                :
                <div> YOU ARE NOT AUTHORIZED TO SEE THIS PAGE </div>}
        </div>
    )
}
