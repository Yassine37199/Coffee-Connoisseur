import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const CoffeeShop = () => {

  const router = useRouter();
  const id = router.query.id;
  console.log(id)
  return (
    <>
    <Head>
      <title>{id}</title>
    </Head>
    <div>{id}</div>
    <Link href='/' prefetch>Back to home</Link>
    <Link href='/coffee-store/12365478'>Go to Dynamic</Link>
    </>
  )
}

export default CoffeeShop
