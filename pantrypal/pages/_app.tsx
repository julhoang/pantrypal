import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import React from 'react';
import { getRecipe, queryString } from './api/getRecipe';
import { ChakraProvider } from '@chakra-ui/react';
let recipes = [];
import 'styles/scss/global.scss' // added

function queryAPI (){
    const query = queryString(['apple'], [], []);
    const response = getRecipe(query);
    // recipes = response.hits[0];
}

export default function App({ Component, pageProps }: AppProps){
  return (
    <ChakraProvider>
    <Component {...pageProps} />
    {/* <button onClick={()=> queryAPI()}>Make API call</button> */}
  </ChakraProvider>
  );
}
