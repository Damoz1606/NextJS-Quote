import React, { ReactNode } from 'react'
import styles from '@/styles/Card.module.css';

type CardProps = {
    children: ReactNode
}

type CardHeaderProps = {
    children: ReactNode
}

type CardBodyProps = {
    children: ReactNode
}

type CardFooterProps = {
    children: ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className={`${styles.card}`}>{children}</div>
    )
}

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
    return (
        <div className={`${styles.card_header}`}>{children}</div>
    )
}

const CardBody: React.FC<CardBodyProps> = ({ children }) => {
    return (
        <div className={`${styles.card_body}`}>{children}</div>
    )
}

const CardFooter: React.FC<CardFooterProps> = ({ children }) => {
    return (
        <div className={`${styles.card_footer}`}>{children}</div>
    )
}

export { Card, CardHeader, CardBody, CardFooter }