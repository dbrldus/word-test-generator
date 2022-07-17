import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IRouter } from "./interface";
import Test from "./Routes/Test";
import Word from "./Routes/Word";

function Router({ wordList, setWordList }: IRouter) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/word" />} />
        <Route path="/word" element={<Word setWordList={setWordList} />} />
        <Route path="/test" element={<Test wordList={wordList} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
