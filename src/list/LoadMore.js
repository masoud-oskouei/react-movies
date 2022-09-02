// LoadMore is the button appears below the last <FilmRow>
// it prompts the user to load list for the first time
// or to load more movies depending on the state of the application

const LoadMore = (props) => {
  let thereIsAFilmInThatYearInTheList = false;
  props.fullList.forEach((film) => {
    // find out if there is at least one film in the selected year
    if (film.release_date.slice(0, 4) == props.year) {
      thereIsAFilmInThatYearInTheList = true;
    }
  });

  return (
    <button
      style={{
        width: "100%",
        fontSize: "1.3em",
        height: "2em",
        fontWeight: "bold",
      }}
      onClick={() => {
        props.setPage(props.page + 1); // eventually page will be a param for fetching the film list data from the server
      }}
    >
      {`${
        thereIsAFilmInThatYearInTheList // change the text on the button
          ? "Click to load more"
          : `No films in ${props.year}. Click to Load`
      }`}
    </button>
  );
};
export default LoadMore;
