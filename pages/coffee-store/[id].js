import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import CoffeeStores from '../../public/data/coffee-store.data';

import NearMeIcon from "../../public/icons/nearMe.svg"
import StarIcon from "../../public/icons/star.svg"
import PlacesIcon from "../../public/icons/places.svg"

import cls from "classnames"

import styles from '../../styles/coffee-store.module.css'

export function getStaticProps({params}) {
  return {
    props : {
      coffeeStore : CoffeeStores.find(store => store.id.toString() === params.id)
    }
  }
}

export function getStaticPaths() {
  const paths = []
  CoffeeStores.map(store => paths.push({params : {id : store.id.toString()}}))
  return {
    paths : paths, 
    fallback : true
  }
}


const handleUpvote = () => {
  console.log('upvoted')
}

const CoffeeShop = ({coffeeStore}) => {

  const {name, address, neighbourhood, imgUrl} = coffeeStore

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
          <Image 
            src={imgUrl} 
            width={600} 
            height={460} 
            className={styles.storeImg} 
            alt={name} />
        </div>
        <div className={cls(styles.col2, "glass" )}>
          <div className={styles.iconWrapper}>
            <Image src={PlacesIcon} width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={NearMeIcon} width={24} height={24} />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={StarIcon} width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvote}>
            Upvote !
          </button>
        </div>
      </div>
    </div>
  )
}

// fsq3C4Wxnx9Fitn7IzjRxCX1hmUBdKeGeynTdMttTrz/Gnc=

export default CoffeeShop
