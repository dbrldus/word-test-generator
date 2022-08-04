import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import HomeButton from "../Components/HomeButton";
import { DataContext } from "../Data";

const Wrapper = styled.div`
  font-family: "Do Hyeon", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Word = styled.div`
  font-size: 100px;
  margin-bottom: 30px;
`;

const AnswerInput = styled.input.attrs({ type: "text" })`
  font-size: 40px;
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  border: none;
  border-bottom: 2px solid black;
  transition: border-bottom 0.2s linear;
  &:focus {
    outline: none;
    border-bottom: 2px solid #7fddff;
  }
`;

const SubmitBtn = styled.input.attrs({ type: "submit" })`
  font-size: 30px;
  font-family: "Do Hyeon", sans-serif;
  text-align: center;
  border: none;
  margin-top: 10px;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  &:focus {
    outline: none;
  }
`;

interface IProgress {
  total: number;
  current: number;
}
const Progress = styled.div<IProgress>`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(0%, 0%);
  text-align: right;
  padding-right: 0px;
  width: ${(props) => (100 * props.current) / props.total}vw;
  height: 25px;
  background-color: #7fddff;
  transition: width 0.2s linear;
  div {
    font-family: "Do Hyeon", sans-serif;
    font-size: 20px;
    margin-right: 10px;
  }
`;
const ProgressBG = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(0%, 0%);
  text-align: right;
  padding-right: 0px;
  width: 100vw;
  height: 25px;
  background-color: #5c646e;
  transition: width 0.2s linear;
`;

function Test() {
  const { wordList, testList, resultData, setResultData } =
    useContext(DataContext);
  const [selectedList, setSelectedList] = useState([...testList]);
  const [totalWord, setTotalWord] = useState(testList.length);
  const [textInput, setTextInput] = useState<string>("");
  const [index, setIndex] = useState(
    Math.floor(Math.random() * testList.length)
  );
  const [finished, setFinished] = useState(false);

  const onTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTextInput(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateResultData();
    getNextWord();
  };

  const checkAnswer = () => {
    var ansInput = textInput.split(",").map((value) => value.trim());
    var wrongList = ansInput.filter((answer) => {
      var check = wordList[selectedList[index]].meaning.find(
        (element) => element == answer
      );
      if (check == undefined) {
        //not found
        return true;
      } else {
        return false;
      }
    });

    if (wrongList.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const updateResultData = () => {
    if (checkAnswer() == false) {
      console.log("wrong");
      var current = resultData;
      current.push({
        id: wordList[selectedList[index]].id,
        answerInput: textInput,
      });
      setResultData(current);
    }
  };

  const getNextWord = () => {
    selectedList.splice(index, 1);

    if (selectedList.length != 0) {
      setIndex(Math.floor(Math.random() * selectedList.length));
      setTextInput("");
    } else {
      setFinished(true);
    }
  };
  return (
    <>
      {finished ? (
        <Navigate to="/test/result"></Navigate>
      ) : (
        <>
          <Helmet>
            <title>📝 Word Test</title>
          </Helmet>
          <ProgressBG></ProgressBG>
          <Progress total={totalWord} current={totalWord - selectedList.length}>
            <div>{totalWord - selectedList.length}</div>
          </Progress>
          <Wrapper>
            {totalWord - selectedList.length} / {totalWord}
            <Word>{wordList[selectedList[index]].word}</Word>
            <form onSubmit={onSubmit}>
              <AnswerInput
                onChange={onTextChange}
                value={textInput}
                placeholder="answer here"
              />
              <br />
              <SubmitBtn />
            </form>
          </Wrapper>
          <HomeButton />
        </>
      )}
    </>
  );
}

export default Test;
