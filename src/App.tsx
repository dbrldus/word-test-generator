import { useState } from "react";
import { Irow } from "./interface";
import Router from "./Router";

function App() {
  const [wordList, setWordList] = useState<Array<Irow>>([]);
  return (
    <>
      <Router wordList={wordList} setWordList={setWordList}></Router>
    </>
  );
}

export default App;
