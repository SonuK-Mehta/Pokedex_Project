import "animate.css";
import "./PokemonLoader.scss";

const animations = [
  "bounce",
  "flash",
  "rubber-band",
  "flip",
  "tada",
  "pulse",
  "swing",
];

const PokemonLoader = () => {
  return (
    <div className="pokemon-loader-container">
      <header className="u-text-center">
        <h1>Pokemon Loaders</h1>
        <p>
          Thanks
          <a
            href="https://daneden.github.io/animate.css/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Animate.css
          </a>
          for animations providing
        </p>
      </header>
      <section>
        {animations.map((animation) => (
          <article key={animation}>
            <h2 className="u-text-center">{animation.replace("-", " ")}</h2>
            <div className={`o-pokeball c-loader u-${animation}`}></div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default PokemonLoader;
