import PropTypes from "prop-types";
import styles from "./Pokemon.module.css"; // Import CSS module

function Pokemon({ name, image }) {
  return (
    <div className={styles.pokemonCard}>
      <p className={styles.pokemonName}>{name}</p>
      <img className={styles.pokemonImage} src={image} alt={name} />
    </div>
  );
}

Pokemon.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Pokemon;
