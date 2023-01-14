import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../Components/banner'
import HeroImage from '../public/hero-image-3.png'
import Card from '../Components/card'
// import data from '../public/data/coffee-store.data'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(context) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3C4Wxnx9Fitn7IzjRxCX1hmUBdKeGeynTdMttTrz/Gnc='
    }
  };
  const response = await fetch('https://api.foursquare.com/v3/places/nearby?ll=36.7978152,10.1832781&query=coffee stores', options);
  const data = await response.json();
  console.log(data)
  return {
    props : {
      data : data.results,
    }
  }
}

export default function Home(props) {

  let buttonText = "View Stores Nearby";
  console.log(props.data)
  const handleClick = () => {
    buttonText = "Loading..."
    console.log("clicked")
  }
  return (
    <>
        <Head>
          <title>Coffee Connoisseur</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.banner}>
              <Banner buttonText={buttonText} handleClick={handleClick}/>
            <div className={styles.heroImage}>
              <Image src={HeroImage} width={420} height={400} alt="drinking coffee image"/>
            </div>
          </div>
          { props.data.length > 0 ?
            <h2 className={styles.heading2}>Toronto Stores</h2>
            : null
          }
        <div className={styles.cardLayout}>
          {
            props.data.map(store => (
              <Card
                key={store.fsq_id}
                name={store.name}
                imgUrl = {store.imgUrl || ""}
                href = {`/coffee-store/${store.fsq_id}`}
                websiteUrl = {store.websiteUrl}
                address = {store.address}
                />
            ))
          }
        </div>
        </main>

        <footer className={styles.footer}></footer>

    </>
  )
}
