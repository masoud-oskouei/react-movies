// <Year> is the input for choosing the desired year
// if "ALL" is active, the list shown on the left will be filtered
// in order to show only the films from the year selected.
const Year = (props) => {
  return (
    <div
      style={{
        width: "100%",
        fontSize: "1.2em",
        padding: "0.5em",
        textAlign: "center",
      }}
    >
      <b>Year:</b>
      <span> </span>
      <input
        onChange={(e) => {
          props.setYear(e.target.value);
        }}
        type="number"
        min={1894} // first year that the server can provide meaningful data
        max={props.thisYear} // restrict max year to the current year
        defaultValue={props.thisYear}
        style={{ fontSize: "1em" }}
      ></input>
    </div>
  );
};
export default Year;
