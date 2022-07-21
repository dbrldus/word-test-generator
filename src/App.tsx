import { useState } from "react";
import { Irow } from "./interface";
import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet-async";

function App() {
  const [wordList, setWordList] = useState<Array<Irow>>([]);
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
      <Router wordList={wordList} setWordList={setWordList}></Router>
    </>
  );
}

export default App;