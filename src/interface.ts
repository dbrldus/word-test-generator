export interface Icontext {
  wordList: Array<Irow>;
  setWordList: Function;
  resultData: Array<IwrongAnswer>;
  setResultData: Function;
  resetData: Function;
}

export interface Irow {
  id: number;
  word: string;
  meaning: Array<string>;
}

export interface IRouter {
  wordList: Array<Irow>;
  setWordList: Function;
}

export interface IwrongAnswer {
  id: number;
  answerInput: string;
}

export interface IResults {
  resultData: Array<IwrongAnswer>;
}
