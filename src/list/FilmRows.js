import FilmRow from "./FilmRow";
const FilmRows = (props) => {
  let list = props.isAllListactive
    ? props.fullList.filter(
        // if "ALL" is active, filter the fullList by year then send to "map"
        (film) => film.release_date.slice(0, 4) == props.year
      )
    : props.favList; // if "ALL" is not active send the favList to "map"
  return list.map((film, index) => (
    <FilmRow
      film={film}
      key={index}
      setSelectedFilmId={props.setSelectedFilmId} // will send up the clicked film to display on <FilmDetail>
      addRemoveFavs={props.addRemoveFavs}
      favList={props.favList}
    />
  ));
};
export default FilmRows;
