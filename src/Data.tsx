import { createContext, useContext, useState } from "react";
import { Icontext, IResultData, Irow } from "./interface";

export const DataContext = createContext<Icontext>({
  wordList: [],
  setWordList: () => {},
  resultData: {
    correctCount: 0,
    wrongCount: 0,
    wrongAnswers: [],
  },
  setResultData: () => {},
});

function WordStore(props: any) {
  const [wordList, setWordList] = useState<Array<Irow>>([]);
  const [resultData, setResultData] = useState<IResultData>({
    correctCount: 0,
    wrongCount: 0,
    wrongAnswers: [],
  });

  return (
    <DataContext.Provider
      value={{
        wordList,
        setWordList,
        resultData,
        setResultData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default WordStore;
