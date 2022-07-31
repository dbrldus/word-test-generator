import { useContext, useDebugValue, useState } from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import HomeButton from "../Components/HomeButton";
import {
  DetailsBtn,
  ResultTable,
  ResultTableWrapper,
} from "../Components/StyledCOMP";
import { DataContext } from "../Data";

const Wrapper = styled.div`
  font-family: "Do Hyeon", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Title = styled.div`
  font-size: 100px;
`;

const AnswerStatus = styled.div`
  font-size: 50px;
`;

const DetailsControl = styled.div`
  width: inherit;
  font-size: 30px;
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
`;

const TableTitle = styled.div`
  font-size: 30px;
  text-align: center;
`;

function Results() {
  const { wordList, testList, resultData } = useContext(DataContext);

  let correctCount = wordList.length - resultData.length;
  let wrongCount = resultData.length;
  var wrongID = resultData.map((v) => v.id);
  //console.log(resultData.map((value) => value.id));
  const [showAll, setShowAll] = useState(false);

  const onButtonClick = () => {
    setShowAll((c) => !c);
  };

  return (
    <>
      <Helmet>
        <title>💯 Test Result</title>
      </Helmet>
      <Wrapper>
        <Title>Result</Title>
        <AnswerStatus>
          Correct : {correctCount} Wrong : {wrongCount}
        </AnswerStatus>
        <DetailsControl>
          <DetailsBtn onClick={onButtonClick}>&lt;</DetailsBtn>
          <div />
          <TableTitle>{showAll ? "All Words" : "Wrong Only"}</TableTitle>
          <div />
          <DetailsBtn onClick={onButtonClick}>&gt;</DetailsBtn>
        </DetailsControl>
        <div>
          <ResultTableWrapper show={!showAll}>
            <ResultTable>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Correct Answer</th>
                  <th>Your Answer</th>
                </tr>
              </thead>
              <tbody>
                {resultData.map((value, index) => (
                  <tr key={index}>
                    <td>{wordList[value.id].word}</td>
                    <td>{wordList[value.id].meaning.join()}</td>
                    <td>{value.answerInput}</td>
                  </tr>
                ))}
              </tbody>
            </ResultTable>
          </ResultTableWrapper>

          <ResultTableWrapper show={showAll}>
            <ResultTable>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Correct Answer</th>
                  <th>Your Answer</th>
                </tr>
              </thead>
              <tbody>
                {testList.map((value, index) => {
                  var searchResult = wrongID.indexOf(value);
                  if (searchResult == -1) {
                    return (
                      <tr key={index}>
                        <td>{wordList[value].word}</td>
                        <td>{wordList[value].meaning.join()}</td>
                        <td></td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td>{wordList[value].word}</td>
                        <td>{wordList[value].meaning.join()}</td>
                        <td>{resultData[searchResult].answerInput}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </ResultTable>
          </ResultTableWrapper>
        </div>
      </Wrapper>
      <HomeButton />
    </>
  );
}

export default Results;
