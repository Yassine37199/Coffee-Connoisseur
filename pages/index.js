import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../Components/banner'
import HeroImage from '../public/hero-image-3.png'
import Card from '../Components/card'
import {CoffeeImg} from '../public/coffee-exmple.jpg'
import data from '../public/data/coffee-store.data'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(context) {
  return {
    props : {
      data,
    }
  }
}

export default function Home(props ) {

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
          { props.data.length > 0 ?
            <h2 className={styles.heading2}>Toronto Stores</h2>
            : null
          }
        <div className={styles.cardLayout}>
          {
            data.map(store => (
              <Card
                key={store.id}
                name={store.name}
                imgUrl = {store.imgUrl}
                href = {`/coffee-store/${store.id}`}
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
