import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useMemo } from 'react'
import { usePokemon } from '../src/store'

export { getServerSideProps } from '../src/store'



export default function Home() {
  const { pokemon, setFilter, filter } = usePokemon();
  
  return (
    <div className={styles.main}>
      <Head>
        <title>use state</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div className={styles.container}>
        {pokemon.slice(0, 20).map((p) => (
          <div key={p.id} className={styles.image}>
            <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}  />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>      
    </div>
  )
}
