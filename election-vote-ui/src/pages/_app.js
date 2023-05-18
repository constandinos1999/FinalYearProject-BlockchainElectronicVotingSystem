import Navbar from '@/components/Navbar'
import { ReactNotifications } from 'react-notifications-component'
import AppWrapper from '@/context'
import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-notifications-component/dist/theme.css'

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <ReactNotifications/>
      <Navbar/>
      <Component {...pageProps} />
    </AppWrapper>
    
  )
}
