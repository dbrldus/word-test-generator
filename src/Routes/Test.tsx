import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import { DataContext } from "../Data";
import { IResultData, Irow } from "../interface";

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

const HomeButton = styled.div`
  font-family: "Do Hyeon", sans-serif;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  width: 100px;
  height: 100px;
  font-size: 30px;
  a {
    color: #000;
    text-decoration: none;
  }

  &:hover {
    background-color: #7fddff;
  }
  transition: background-color 0.3s linear;
`;

function Test() {
  const { wordList, resultData, setResultData } = useContext(DataContext);

  const [testList, setTestList] = useState<Array<Irow>>(wordList);
  const [totalWord, setTotalWord] = useState(wordList.length);
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
      var { wrongCount: wc, correctCount: cc, wrongAnswers: wa } = resultData;
      wc += 1;
      wa.push({
        word: testList[index].word,
        answerInput: textInput,
        correctAnswer: testList[index].meaning.join(),
      });
      setResultData({
        wrongCount: wc,
        correctCount: cc,
        wrongAnswers: wa,
      });
    } else {
      console.log("correct");
      var { wrongCount: wc, correctCount: cc, wrongAnswers: wa } = resultData;
      cc += 1;
      setResultData({
        wrongCount: wc,
        correctCount: cc,
        wrongAnswers: wa,
      });
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
  console.log(wordList);
  return (
    <>
      {finished ? (
        <Navigate to="/result"></Navigate>
      ) : (
        <>
          <Helmet>
            <title>📝 Word Test</title>
          </Helmet>
          <ProgressBG></ProgressBG>
          <Progress total={totalWord} current={totalWord - testList.length}>
            <div>{totalWord - testList.length}</div>
          </Progress>
          <Wrapper>
            {totalWord - testList.length} / {totalWord}
            <Word>{testList[index].word}</Word>
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
          <HomeButton>
            <Link to="/">Home</Link>
          </HomeButton>
        </>
      )}
    </>
  );
}

export default Test;
