// This component is shown when error occures in fetching the details
const FilmDetailError = (props) => {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span style={{ color: "red" }}>{props.selectedFilmError}</span>
      </p>
    </div>
  );
};
export default FilmDetailError;
