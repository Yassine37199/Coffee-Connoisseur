import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import CoffeeStores from '../../public/data/coffee-store.data';


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

const CoffeeShop = ({coffeeStore}) => {

  const {name, adress, neighbourhood, imgUrl} = coffeeStore

  const router = useRouter();
  if(router.isFallback){
    return <div>Loading...</div>
  }
  return (
    <>
    <Head>
      <title>{name}</title>
    </Head>
    <Link href='/' prefetch>Back to home</Link>
    </>
  )
}

export default CoffeeShop
