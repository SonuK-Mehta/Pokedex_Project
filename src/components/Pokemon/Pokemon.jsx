function Pokemon({ name, image }) {
  return (
    <div>
      <p>{name}</p>
      <img src={image} alt={name} />
    </div>
  );
}

export default Pokemon;
