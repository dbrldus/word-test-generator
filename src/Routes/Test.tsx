import React, { FormEvent, useEffect, useState } from "react";
import { Irow, ITest } from "../interface";

function Test({ wordList }: ITest) {
  const [testList, setTestList] = useState<Array<Irow>>([]);
  const [loading, setLoading] = useState(true);
  const [textInput, setTextInput] = useState<string>("");
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    var randomizedList: Array<Irow> = [];
    var list: Array<Irow> = wordList;
    var length = list.length;
    for (var i = 0; i < length; i++) {
      var randInt = Math.floor(Math.random() * list.length);
      randomizedList[i] = list[randInt];
      list.splice(randInt, 1);
      if (i == length - 1) {
        setTestList(randomizedList);
        setLoading(false);
      }
    }
  }, []);

  const onTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTextInput(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      testList[index].meaning.find((element) => element == textInput)
    );
    if (index < testList.length - 1) {
      setIndex((current) => current + 1);
      setTextInput("");
    } else {
      setFinished(true);
    }
  };

  return (
    <>
      {loading ? (
        "loading"
      ) : finished ? (
        "finished"
      ) : (
        <div>
          <h1>{testList[index].word}</h1>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onTextChange} value={textInput} />
            <input type="submit" />
          </form>
        </div>
      )}
    </>
  );
}

export default Test;
