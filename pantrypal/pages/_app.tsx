import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { getRecipe } from './api/getRecipe';
import { queryString } from './api/queryString';

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
