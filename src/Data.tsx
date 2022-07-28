import { createContext, useContext, useState } from "react";
import { Icontext, Irow, IwrongAnswer } from "./interface";

export const DataContext = createContext<Icontext>({
  wordList: [],
  setWordList: () => {},
  resultData: [],
  setResultData: () => {},
  resetData: () => {},
});

function WordStore(props: any) {
  const [wordList, setWordList] = useState<Array<Irow>>([]);
  const [resultData, setResultData] = useState<Array<IwrongAnswer>>([]);

  const resetData = () => {
    setWordList([]);
    setResultData([]);
  };

  return (
    <DataContext.Provider
      value={{
        wordList,
        setWordList,
        resultData,
        setResultData,
        resetData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export default WordStore;
