import Image from 'next/image';
import styles from '../styles/banner.module.css'


const Banner = ({buttonText , handleClick}) => (
    <div className={styles.container}>
       
        <div className={styles.titleContainer}>
            <h1 className={styles.title}>
                <span className={styles.titleMain}>Coffee</span>
                <span className={styles.titleSub}>Connoisseur</span>
            </h1>
            <p className={styles.subtitle}>Discover your local coffee shops !</p>
            <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={() => handleClick()}>{buttonText}</button>
            </div>
        </div>
       
    </div>
)
 
export default Banner;