import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { IRouter } from "./interface";
import Test from "./Routes/Test";
import Word from "./Routes/Word";

function Router({ wordList, setWordList }: IRouter) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Word setWordList={setWordList} />} />
        <Route
          path="/test"
          element={
            wordList.length == 0 ? (
              <Navigate to="/word"></Navigate>
            ) : (
              <Test wordList={wordList} />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default Router;
