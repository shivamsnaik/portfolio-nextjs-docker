import '../styles/globals.css'
import Head from 'next/head'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shivam Naik's Portfolio</title>
        <link href="https://fonts.googleapis.com/css?family=Playfair+Display&amp;display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;400&amp;display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  
  );
}

export default MyApp
