import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.searchInput}
        type="search"
        placeholder="Pokemon name"
      />
    </div>
  );
}

export default Search;
