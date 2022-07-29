import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeButton from "../Components/HomeButton";
import {
  DetailsBtn,
  ResultTable,
  ResultTableWrapper,
} from "../Components/StyledCOMP";
import { DataContext } from "../Data";
import { IResults } from "../interface";

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

function Results() {
  const { wordList, resultData } = useContext(DataContext);

  let correctCount = wordList.length - resultData.length;
  let wrongCount = resultData.length;

  const [showDetails, setShowDetails] = useState(false);

  const onButtonClick = () => {
    setShowDetails((c) => !c);
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
        <DetailsBtn onClick={onButtonClick}>
          {showDetails ? "Hide Details" : "Show Details"}
        </DetailsBtn>
        <ResultTableWrapper showDetails={showDetails}>
          <ResultTable showDetails={showDetails}>
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
      </Wrapper>
      <HomeButton />
    </>
  );
}

export default Results;
