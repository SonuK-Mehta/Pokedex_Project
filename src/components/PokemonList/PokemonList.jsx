import { useEffect, useState } from "react";
import styles from "./PokemonList.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiUrl, setApiUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemons(apiUrl) {
    setError(""); // Reset error before fetching data
    try {
      const response = await axios.get(apiUrl);
      setNextUrl(response.data.next); // Next page URL
      setPrevUrl(response.data.previous); // Previous page URL

      // Fetch each Pokémon's details (for images)
      const detailedPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            id: res.data.id,
            name: res.data.name.toUpperCase(),
            image: res.data.sprites.other.dream_world.front_default,
            types: res.data.types,
          };
        })
      );

      // console.log(detailedPokemons);
      setPokemonList(detailedPokemons);
    } catch (err) {
      setError("⚠️ Failed to fetch Pokémon. Please try again!");
    } finally {
      setLoading(false); // Stop the loader after request
    }
  }

  useEffect(() => {
    downloadPokemons(apiUrl);
  }, [apiUrl]);

  if (loading) {
    return (
      <div className={styles.centerWrapper}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centerWrapper}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.PokemonListWrapper}>
      {pokemonList && (
        <>
          <div className={styles.pokemonCardWrapper}>
            {pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} />
            ))}
          </div>
          <div className={styles.controls}>
            <button
              className={styles.auroraButton}
              onClick={() => {
                setLoading(true); // 🛠️ Start loader before making the API call
                setApiUrl(prevUrl);
              }}
              disabled={!prevUrl}
            >
              &larr; Prev
            </button>

            <button
              className={styles.auroraButton}
              onClick={() => {
                setLoading(true);
                setApiUrl(nextUrl);
              }}
              disabled={!nextUrl}
            >
              Next &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonList;
