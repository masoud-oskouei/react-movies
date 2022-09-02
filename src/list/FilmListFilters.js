// the listFilters appears on top
import React from "react";
function FilmListFilters(props) {
  return (
    <div className="film-list-filters">
      <button
        className={`film-list-filter ${props.isAllListactive && "is-active"}`}
        onClick={() => {
          props.setIsallListActive(true);
        }}
      >
        ALL
        <span className="section-count">{props.fullList.length}</span>
      </button>
      <button
        className={`film-list-filter ${!props.isAllListactive && "is-active"}`}
        onClick={() => {
          //props.handleDisplayCondition("faves"); // handleDisplayCondition takes a listName and sets the DisplayCondition
          props.setIsallListActive(false);
        }}
      >
        FAVES
        <span className="section-count">{props.favList.length}</span>
      </button>
    </div>
  );
}
export default FilmListFilters;
