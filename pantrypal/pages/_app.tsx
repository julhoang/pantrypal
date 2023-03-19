import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { callAPI } from './api/apiCall'

const query = {
  mainQuery: "Celery",
  numIngr: 5
}

let recipes = [];

function queryAPI (){
    const response = callAPI(query);
    // recipes = response.hits[0];
}

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <button onClick={()=> callAPI(query)}>Make API call</button>
  </>
}
