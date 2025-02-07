import "animate.css";
import styles from "./Spinner.module.css";

const PokemonLoader = () => {
  return (
    <div className={styles.pokemonLoaderContainer}>
      <section>
        <article>
          <div
            className={`${styles.oPokeball} animate__animated animate__bounce animate__infinite`}
          ></div>
        </article>
      </section>
    </div>
  );
};

export default PokemonLoader;
