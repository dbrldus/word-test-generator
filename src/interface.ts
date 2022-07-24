export interface Icontext {
  wordList: Array<Irow>;
  setWordList: Function;
  resultData: IResultData;
  setResultData: Function;
}

export interface Irow {
  word: string;
  meaning: Array<string>;
}

export interface IRouter {
  wordList: Array<Irow>;
  setWordList: Function;
}

export interface IResultData {
  correctCount: number;
  wrongCount: number;
  wrongAnswers: Array<IwrongAnswer>;
}

interface IwrongAnswer {
  word: string;
  answerInput: string;
  correctAnswer: string;
}

export interface IResults {
  resultData: IResultData;
}
