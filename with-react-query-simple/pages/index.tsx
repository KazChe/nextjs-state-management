import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export async function getServerSideProps() {
  const resp = await fetch(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Home({ pokemon }: { pokemon: Pokemon[] }) {
  const [filter, setFilter] = useState("");

  const filteredPokemon = useMemo(
    () =>
      pokemon.filter((p) =>
        p.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, pokemon]
  );

  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.search}
        />
      </div>
      <div className={styles.container}>
      {filteredPokemon.map((pokemon) => (
          <div className={styles.image} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
        {/* {filteredPokemon.slice(0, 801).map((p) => (
          <div key={p.id} className={styles.image}>
            <img
              alt={p.name}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
            />
            <h2>{p.name}</h2>
          </div>
        ))} */}
      </div>
    </div>
  );
}