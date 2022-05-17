import { MovieDTO } from 'types/movieDTO';
import './styles.css';

type Props = {
  movieDTO?: MovieDTO;
  showSynopsis: boolean;
};

const Movie = ({ movieDTO, showSynopsis }: Props) => {
  return (
    <div className="movie-details">
      <img src={movieDTO?.imgUrl} alt={movieDTO?.title} />
      <h1>{movieDTO?.title}</h1>
      <h2>{movieDTO?.year}</h2>
      <h3>{movieDTO?.subTitle}</h3>
      {showSynopsis ? <p>{movieDTO?.synopsis}</p> : ''}
      <span movie-details-span></span>
    </div>
  );
};

export default Movie;
