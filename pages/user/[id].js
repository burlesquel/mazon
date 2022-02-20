// import Image from "next/image"
// import Link from "next/link"
// import styles from "../../styles/[id].module.css"
// import CategoriesNavbar from "../../components/CategoriesNavbar/CategoriesNavbar"
// import TechnicalDetails from "../../components/TechnicalDetails"


export default function Product({ user }) {

  return (
    <div>
        {user.name}
    </div>

  )
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const user = await fetch(`https://mazon-server.herokuapp.com/user?id=${id}`).then(r => r.json())
  return {
    props: {
      user,
      id
    }
  }
}
