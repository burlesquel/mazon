import '../styles/globals.css'
import Layout from '../components/Layout'
import { AuthContextProvider } from "../authentication/authContext"
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';





function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   require("bootstrap/dist/js/bootstrap");
  // }, []);
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp
