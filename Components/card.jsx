import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import styles from "../styles/card.module.css"

const Card = ({name, imgUrl, href}) => {
  return (
    <Link href={href}>
      <a className={styles.cardLink}>
        <div className={styles.container}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              alt={name}
              className={styles.cardImage}
              src={imgUrl}
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
