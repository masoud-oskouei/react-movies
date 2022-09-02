// This is the page that shows film list and details
import { useState, useEffect } from "react";
import "./FilmLibrary.css";

import FilmRows from "../list/FilmRows";
import LoadMore from "../list/LoadMore";
import FilmListFilters from "../list/FilmListFilters";
import Year from "../list/Year";
import FilmDetail from "../detail/FilmDetail";
import FilmDetailError from "../detail/FilmDetailError";
import FilmDetailEmpty from "../detail/FilmDetailEmpty";
import { TMDB_API_KEY } from "./TMDB";
import { fetchData } from "./fetchData";
import { Routes, Route, useNavigate } from "react-router-dom";
function FilmLibrary() {
  const [page, setPage] = useState(1);
  const [fullList, setFullList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [listError, setListError] = useState(null);
  const [listIsLoading, setlListisLoading] = useState(false);
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);
  const [selectedFilmId, setSelectedFilmId] = useState(-1);
  const [selectedFilmJson, setSelectedFilmJson] = useState(null);
  const [selectedFilmError, setSelectedFilmError] = useState(null);
  const [isAllListactive, setIsallListActive] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    //fetch the list of movies
    setlListisLoading(true);
    fetchData(
      //use an imported func
      "https://api.themoviedb.org/3/discover/movie?", //endPoint
      {
        //params
        api_key: TMDB_API_KEY,
        primary_release_year: year,
        page: page,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
      }
      // ["results"] //list of layers in response-object dug to get to wanted data
    )
      .then((output) => {
        setFullList([...fullList, ...output.results]);
        setListError(null);
      })
      .catch((error) => {
        setListError(error);
      })
      .finally(() => {
        setlListisLoading(false);
      });
  }, [page]); //page is an state that the LoaodMore sets it.

  useEffect(() => {
    // fetch details for the selected film
    if (selectedFilmId === -1) {
      // if no film selected
      setSelectedFilmJson(null); // details section on the screen will be empty
      return; //terminate this func
    }
    fetchData(
      // an imported func
      `https://api.themoviedb.org/3/movie/${selectedFilmId}?`,
      {
        api_key: TMDB_API_KEY,
      }
    )
      .then((output) => {
        setSelectedFilmJson(output);
        setSelectedFilmError(null);
      })
      .catch((error) => {
        setSelectedFilmError(error);
        navigateTo("error", { replace: true });
      });
  }, [selectedFilmId]); // selectedFilmId is an state that is set when a row is clicked

  // addRemoveFavs takes a film id and an action then updates that movie in the fullList
  function addRemoveFavs(film) {
    // enter a film into favList or remove it from there
    if (favList.find((item) => item.id === film.id)) {
      // if the film is in favList
      setFavList([
        ...favList.slice(0, favList.indexOf(film)),
        ...favList.slice(favList.indexOf(film) + 1),
      ]);
    } else {
      setFavList([...favList, film]);
    }
  }
  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <FilmListFilters // the listFilters appears on top
          fullList={fullList}
          favList={favList}
          setIsallListActive={setIsallListActive}
          isAllListactive={isAllListactive}
          year={year}
        />
        {isAllListactive && ( // if "ALL" is active, the year input appears
          <Year
            thisYear={thisYear}
            setYear={setYear}
            setFullList={setFullList}
          />
        )}
        <FilmRows // will be a list of <FilmRow> components
          fullList={fullList}
          favList={favList}
          isAllListactive={isAllListactive}
          addRemoveFavs={addRemoveFavs}
          year={year}
        />

        {/*Error description if fetching list is unsuccessful */}
        {listError && <p style={{ color: "red" }}>{listError}</p>}

        {/* Loading announcement when the list is being loaded*/}
        {listIsLoading && <b style={{ fontSize: "2em" }}>"Loading . . . "</b>}

        {/* if "ALL" is active <LoadMore> mounts*/}
        {isAllListactive && (
          <LoadMore
            page={page}
            setPage={setPage}
            fullList={fullList}
            year={year}
          />
        )}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        <Routes>
          <Route // if error occures in fetching details, it navigates to "/films/error"
            path="/error"
            element={<FilmDetailError selectedFilmError={selectedFilmError} />}
          />
          <Route
            path=":filmId" // get the filmId from the url and pass it into <FilmDetail>
            element={
              <FilmDetail // the large component on the right to show the details
                selectedFilmJson={selectedFilmJson} // film to show
                setSelectedFilmId={setSelectedFilmId} // we need this to send up the params.filmId
              />
            }
          />
          {/* catch all other routes are equal to "no film selected" so we show <FilmDetailEmpty/> */}
          <Route path="*" element={<FilmDetailEmpty />} />
        </Routes>
      </div>
    </div>
  );
}

export default FilmLibrary;
