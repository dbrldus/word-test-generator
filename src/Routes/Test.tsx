import React, { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Irow, ITest } from "../interface";

const Wrapper = styled.div`
  font-family: "Do Hyeon", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

function Test({ wordList }: ITest) {
  const [testList, setTestList] = useState<Array<Irow>>(wordList);
  const [textInput, setTextInput] = useState<string>("");
  const [index, setIndex] = useState(
    Math.floor(Math.random() * wordList.length)
  );
  const [finished, setFinished] = useState(false);

  const onTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTextInput(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkAnswer();
    getNextWord();
  };

  const checkAnswer = () => {
    var check = testList[index].meaning.find((element) => element == textInput);
    if (check == undefined) {
      console.log("wrong");
    } else {
      console.log("correct");
    }
  };

  const getNextWord = () => {
    var newList = testList;
    newList.splice(index, 1);
    setTestList(newList);

    if (testList.length != 0) {
      setIndex(Math.floor(Math.random() * testList.length));
      setTextInput("");
    } else {
      setFinished(true);
    }
  };
  return (
    <>
      {finished ? (
        "finished"
      ) : (
        <Wrapper>
          <h1>{testList[index].word}</h1>
          <form onSubmit={onSubmit}>
            <input type="text" onChange={onTextChange} value={textInput} />
            <input type="submit" />
          </form>
        </Wrapper>
      )}
    </>
  );
}

export default Test;
