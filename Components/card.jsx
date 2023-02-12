import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import cls from 'classnames'
import useAxios from 'axios-hooks'
import { Pulsar } from '@uiball/loaders'

import styles from "../styles/card.module.css"


const Card = (props) => {

  
  const [{ data, loading, error }] = useAxios(
      { url: `https://api.foursquare.com/v3/places/${props.id}/photos`,
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3C4Wxnx9Fitn7IzjRxCX1hmUBdKeGeynTdMttTrz/Gnc='
        

      }
    }
  )

  if (loading) return <Pulsar size={40} speed={1.75} color="black" />
  if (error) return <p>Error!</p>


  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={cls(styles.container , 'glass')}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              alt={props.name}
              className={styles.cardImage}
              src={data.length > 0 ? `${data[0].prefix}original${data[0].suffix}` : '/../public/coffee-place-placeholder.jpg'}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card;
