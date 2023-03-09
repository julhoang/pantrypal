import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { callAPI } from './api/apiCall'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <button onClick={callAPI}>Make API call</button>
  </>
}
