import { Link } from "react-router-dom";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="pageContainer">
      <h1 className="title">Film Project</h1>
      <p className="comeIn">
        <Link to="films">Click here to enter the cinema world!</Link>
      </p>
    </div>
  );
};
export default HomePage;
