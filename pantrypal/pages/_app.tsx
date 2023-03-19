import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { getRecipe, queryString } from './api/getRecipe';

let recipes = [];

function queryAPI (){
    const query = queryString(['apple'], [], []);
    const response = getRecipe(query);
    // recipes = response.hits[0];
}

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <button onClick={()=> queryAPI()}>Make API call</button>
  </>
}
