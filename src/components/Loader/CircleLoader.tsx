import React from 'react'
import styles from '@/styles/Loader.module.css';

const CircleLoader: React.FC = () => {
    return (
        <div className={styles.circle}><span></span></div>
    )
}

export { CircleLoader }