import FilmLibrary from "./FilmLibrary";
import HomePage from "./HomePage";
import NotFound from "./NotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="films/*" element={<FilmLibrary />} />
          {/* the lower hierarchy that routes to the film details is in the <FilmLibrary>  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
