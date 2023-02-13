import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../Components/banner'
import HeroImage from '../public/hero-image-3.png'
import Card from '../Components/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import { useContext, useEffect, useState } from 'react'
import useTrackLocation from '../hooks/geo-location'
import { ACTION_TYPES, StoreContext } from './_app'


const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props : {
      data : coffeeStores,
    }
  }
}

export default function Home(props) {

  const {handleTrackLocation ,locationError, isFindingLocation} = useTrackLocation();
  // const [coffeeStoresByLocation, setCoffeeStoresByLocation] = useState([])
  const {state , dispatch} = useContext(StoreContext);

  const {latlong , coffeeStores} = state;

  useEffect( () => {
    async function getCoffeeStoresByLocation() {
      if(latlong != '') {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latlong, 20)
          dispatch({
            type : ACTION_TYPES.SET_COFFEE_STORES,
            payload : fetchedCoffeeStores
          })
          return () => {}
        }
        catch(e) {
          console.log(e)
        }
    }
    }

    getCoffeeStoresByLocation()
  }, [state.latlong])


  const handleClick = () => {
    handleTrackLocation();
  }
  return (
    <>
        <Head>
          <title>Coffee Connoisseur</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.banner}>
              <Banner buttonText={isFindingLocation ? "Loading..." : "View Stores Nearby"} handleClick={() => handleClick()}/>
            <div className={styles.heroImage}>
              <Image src={HeroImage} width={420} height={400} alt="drinking coffee image"/>
            </div>
          </div>


          { coffeeStores.length > 0 ?
            <h2 className={styles.heading2}>Nearby Stores</h2>
            : null
          }
        <div className={styles.cardLayout}>
          {
            coffeeStores.map(store => (
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


          
          
          { props.data.length > 0 ?
            <h2 className={styles.heading2}>New York Stores</h2>
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
