import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../Components/Banner/banner'
import HeroImage from '../Assets/hero-image-3.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
          <Banner buttonText={buttonText} handleClick={handleClick}/>
          <div className={styles.heroImage}>
            <Image src={HeroImage} width={420} height={400}/>
          </div>
        
        </main>

        <footer className={styles.footer}></footer>

    </>
  )
}
