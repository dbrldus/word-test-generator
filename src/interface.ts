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
