import { useState, useMemo } from "react";
import Head from "next/head";
import { useQuery } from "react-query";

import styles from "../styles/Home.module.css";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const getPokemon = (): Promise<Pokemon[]> =>
  fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json").then(
    (resp) => resp.json()
  );

export async function getServerSideProps() {
  return {
    props: {
      initialPokemon: await getPokemon(),
    },
  };
}

export default function Home({
  initialPokemon,
}: {
  initialPokemon: Pokemon[];
}) {
  const { data: pokemon } = useQuery("pokemon", getPokemon, {
    initialData: initialPokemon,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
        {filteredPokemon.slice(0, 20).map((p) => (
          <div key={p.id} className={styles.image}>
            <img
              alt={p.name}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
            />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}