import { useEffect, useState } from "react";
import styles from "./PokemonList.module.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function downloadPokemons() {
    setError(""); // Reset error before fetching data
    try {
      // const response = await axios.get(
      //   "https://pokeapi.co/api/v2/pokemon?limit=10"
      // ); // Fetch 10 Pokémon

      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

      // Fetch each Pokémon's details (for images)
      const detailedPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            id: res.data.id,
            name: res.data.name,
            image: res.data.sprites.front_default,
            types: res.data.types,
          };
        })
      );

      console.log(detailedPokemons);
      setPokemonList(detailedPokemons);
    } catch (err) {
      setError(`⚠️ Failed to fetch Pokémon. Please try again!`);
    } finally {
      setLoading(false); // Stop the loader after request
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

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
      <h2>List of Pokémon</h2>
      {pokemonList &&
        pokemonList.map((p) => (
          <Pokemon name={p.name} image={p.image} key={p.id} />
        ))}
    </div>
  );
}

export default PokemonList;
