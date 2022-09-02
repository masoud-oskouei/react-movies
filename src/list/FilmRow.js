// filmRow components show the brief data about film in rows on the left
import "./FilmRow.css";
import * as React from "react";
import { Link } from "react-router-dom";
function FilmRowComponent(props) {
  return (
    <Link to={`/films/${props.film.id}`}>
      <div style={{ cursor: "pointer" }} className="FilmRow">
        <img
          src={`https://image.tmdb.org/t/p/w780${props.film.poster_path}`}
          alt={`${props.film.title} film poster`}
        />
        <div className="film-summary">
          <h3>{props.film.title}</h3>
          <p>{props.film.release_date.slice(0, 4)}</p>
        </div>
        <button className="fave">
          <span
            className="material-icons"
            onClick={() => {
              props.addRemoveFavs(props.film); // send up the film for adding to or removing from the favList
            }}
          >
            {/* if the film is in the favList we write "remove_from_queue" in the html and css converts it to a "-" icon*/}
            {/* other wise it shows "+" icon*/}
            {props.favList.find((film) => film.id == props.film.id)
              ? "remove_from_queue"
              : "add_to_queue"}
          </span>
        </button>
      </div>
    </Link>
  );
}
export default FilmRowComponent;
