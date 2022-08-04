import { Helmet } from "react-helmet-async";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import WordStore, { DataContext } from "./Data";
import { useContext } from "react";
import Home from "./Routes/Home";
import TestSetting from "./Routes/Setting";
import Test from "./Routes/Test";
import Results from "./Routes/Result";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  margin : 0px;
}
`;

function App() {
  const ctx = useContext(DataContext);
  return (
    <>
      <GlobalStyle></GlobalStyle>
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
            <Route path="/test/file" element={<TestSetting />} />
            <Route path="/test/progress" element={<Test />} />
            <Route path="/test/result" element={<Results />} />
          </Routes>
        </HashRouter>
      </WordStore>
    </>
  );
}

export default App;
