import { Helmet } from "react-helmet-async";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Word from "./Routes/Word";
import Test from "./Routes/Test";
import Results from "./Routes/Result";
import WordStore, { DataContext } from "./Data";
import { useContext } from "react";

function App() {
  const ctx = useContext(DataContext);
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Noto+Sans+KR:wght@500&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <WordStore>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Word />} />
            <Route path="/test" element={<Test />} />
            <Route path="/result" element={<Results />} />
          </Routes>
        </HashRouter>
      </WordStore>
    </>
  );
}

export default App;
