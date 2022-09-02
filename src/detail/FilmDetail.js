// the large component on the right to show the details
import "./FilmDetail.css";
import { useParams } from "react-router-dom";
function FilmDetail(props) {
  const params = useParams();
  if (params.filmId) {
    // filmId is coming from params
    // and going to be set to selectedFilmId state
    props.setSelectedFilmId(params.filmId);
  }
  if (!props.selectedFilmJson) {
    return null;
  }
  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={`https://image.tmdb.org/t/p/w1280${props.selectedFilmJson.backdrop_path}`}
          alt={`${props.selectedFilmJson.title} backdrop`}
        />
        <h1 className="film-title">{`${props.selectedFilmJson.title}`}</h1>
      </figure>

      <div className="film-meta">
        <div className="film-detail-overview">
          <img
            src={`https://image.tmdb.org/t/p/w780${props.selectedFilmJson.poster_path}`}
            className="film-detail-poster"
            alt={`${props.selectedFilmJson.title} poster`}
          />
          <h3> {props.selectedFilmJson.tagline}</h3>
          {props.selectedFilmJson.overview}
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;
