import { Helmet } from "react-helmet-async";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import WordStore, { DataContext } from "./Data";
import { useContext } from "react";
import Home from "./Routes/Home";
import File from "./Routes/File";
import Test from "./Routes/Test";
import Results from "./Routes/Result";

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
            <Route path="/" element={<Home />} />
            <Route path="/test/file" element={<File />} />
            <Route path="/test/progress" element={<Test />} />
            <Route path="/test/result" element={<Results />} />
          </Routes>
        </HashRouter>
      </WordStore>
    </>
  );
}

export default App;
