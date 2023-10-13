import Header from '@/components/header/header'

import '../node_modules/bootstrap/dist/css/bootstrap.css'


export default function App({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}
