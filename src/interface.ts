export interface Icontext {
  wordList: Array<Irow>;
  setWordList: Function;
  testList: Array<number>;
  setTestList: Function;
  resultData: Array<IwrongAnswer>;
  setResultData: Function;
  resetData: Function;
}

export interface Irow {
  id: number;
  word: string;
  meaning: Array<string>;
}

export interface IwrongAnswer {
  id: number;
  answerInput: string;
}

export interface IResults {
  resultData: Array<IwrongAnswer>;
}

export interface Ioptions {
  testMode: number; // 0 : default, 1 : random, 2 : pick
  wordCount: number | null; //for random
  checkBoxValues: Array<boolean> | null; //for pick
}

export interface IOptionWindow {
  settingUpdate: Function;
  settingSubmit: (options: Ioptions) => void;
  testOptions: Ioptions;
}
