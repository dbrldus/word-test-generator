export interface Irow {
  word: string;
  meaning: Array<string>;
}

export interface IRouter {
  wordList: Array<Irow>;
  setWordList: Function;
}

export interface IWord {
  setWordList: Function;
}

export interface ITest {
  wordList: Array<Irow>;
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
