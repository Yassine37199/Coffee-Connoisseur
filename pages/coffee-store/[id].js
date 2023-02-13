import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import NearMeIcon from "../../public/icons/nearMe.svg"
import StarIcon from "../../public/icons/star.svg"
import PlacesIcon from "../../public/icons/places.svg"

import cls from "classnames"

import styles from '../../styles/coffee-store.module.css'
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import useAxios from 'axios-hooks';
import { Pulsar } from '@uiball/loaders';

export async function getStaticProps({params}) {
  // Fetching Coffee Store Data
  const coffeeStores = await fetchCoffeeStores()
  const getCoffeeStoreById = coffeeStores.find(store => store.fsq_id.toString() === params.id)
  return {
    props : {
      coffeeStore : getCoffeeStoreById ? getCoffeeStoreById : {name : "" , Location : {}}
    }
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores()
  const paths = []
  coffeeStores.map(store => paths.push({params : {id : store.fsq_id.toString()}}))
  return {
    paths : paths, 
    fallback : false
  }
}

const CoffeeShop = ({coffeeStore}) => {
  
  const {name, location} = coffeeStore
  // Fetching Coffee Store Image 
  const [{data , loading}] = useAxios(
    { url: `https://api.foursquare.com/v3/places/${coffeeStore.fsq_id}/photos`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3C4Wxnx9Fitn7IzjRxCX1hmUBdKeGeynTdMttTrz/Gnc='
    }
  }
)
  console.log(data)

  const router = useRouter();
  if(router.isFallback){
    return <div>Loading...</div>
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'  prefetch>← Back to home</Link>
          </div>
          <h1 className={styles.name}>{name}</h1>
          { loading ? <Pulsar size={40} speed={1.75} color="black" />
            :
            <Image 
              src={`${data[0].prefix}original${data[0].suffix}` || '/../public/coffee-place-placeholder.jpg'}
              width={600} 
              height={460} 
              className={styles.storeImg} 
              alt={name} />
          }
        </div>
        <div className={cls(styles.col2, "glass" )}>
          <div className={styles.iconWrapper}>
            <Image src={PlacesIcon} width={24} height={24} />
            <p className={styles.text}>{location.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={NearMeIcon} width={24} height={24} />
            <p className={styles.text}>{location.region}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={StarIcon} width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton}>
            Upvote !
          </button>
        </div>
      </div>
    </div>
  )
}

// fsq3C4Wxnx9Fitn7IzjRxCX1hmUBdKeGeynTdMttTrz/Gnc=

export default CoffeeShop
