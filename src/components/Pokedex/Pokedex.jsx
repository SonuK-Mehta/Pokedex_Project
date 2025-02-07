import styles from "./Pokedex.module.css";
import Search from "../Search/Search";
import PokemonList from "../PokemonList/PokemonList";

function Pokedex() {
  return (
    <div className={styles.pokedexWrapper}>
      <h1>Pokedex</h1>
      <Search />
      <PokemonList />
    </div>
  );
}

export default Pokedex;
