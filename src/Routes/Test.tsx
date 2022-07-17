import { ITest } from "../interface";

function Test({ wordList }: ITest) {
  return <div>{wordList[0].word}</div>;
}

export default Test;
