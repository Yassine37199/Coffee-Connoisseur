import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../Components/banner'
import HeroImage from '../public/hero-image-3.png'
import Card from '../Components/card'
import { headers } from '../next.config'
// import data from '../public/data/coffee-store.data'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(context) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
      'Access-Control-Allow-Origin' : '*'
    }
  };
  const response = await fetch('https://api.foursquare.com/v3/places/nearby?ll=36.7978152,10.1832781&query=coffee stores&limit=6', options);
  const data = await response.json();
  return {
    props : {
      data : data.results,
    }
  }
}

export default function Home(props) {

  let buttonText = "View Stores Nearby";
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
          {
            console.log(props)
          }
          { props.data.length > 0 ?
            <h2 className={styles.heading2}>Nearby Stores</h2>
            : null
          }
        <div className={styles.cardLayout}>
          {
            props.data.map(store => (
              <Card
                key={store.fsq_id}
                id={store.fsq_id}
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
