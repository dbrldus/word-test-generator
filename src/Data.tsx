import { createContext, useContext, useState } from "react";
import { Icontext, Irow, IwrongAnswer } from "./interface";

export const DataContext = createContext<Icontext>({
  wordList: [],
  setWordList: () => {},
  testList: [],
  setTestList: () => {},
  resultData: [],
  setResultData: () => {},
  resetData: () => {},
});

function WordStore(props: any) {
  const [wordList, setWordList] = useState<Array<Irow>>([]); // 파일에서 읽어온 전체 단어
  const [testList, setTestList] = useState<Array<number>>([]); // 전체 단어 중 테스트에 출제되는 단어
  const [resultData, setResultData] = useState<Array<IwrongAnswer>>([]);

  const resetData = () => {
    setWordList([]);
    setTestList([]);
    setResultData([]);
  };

  return (
    <DataContext.Provider
      value={{
        wordList,
        setWordList,
        testList,
        setTestList,
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
