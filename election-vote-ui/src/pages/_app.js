import Navbar from '@/components/Navbar'
import { ReactNotifications } from 'react-notifications-component'
import '@/styles/globals.css'
import 'react-notifications-component/dist/theme.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <ReactNotifications/>
      <Navbar/>
      <Component {...pageProps} />
    </>
  )
}
