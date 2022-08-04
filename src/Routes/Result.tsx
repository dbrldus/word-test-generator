import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import HomeButton from "../Components/HomeButton";
import {
  DetailsBtn,
  ResultTable,
  ResultTableWrapper,
  RestartBtn,
  WrongRestartBtn,
  Title,
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
const NewTestPanel = styled.div`
  width: inherit;
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
`;
function Results() {
  const { wordList, testList, setTestList, resultData, setResultData } =
    useContext(DataContext);

  let correctCount = testList.length - resultData.length;
  let wrongCount = resultData.length;
  var wrongID = resultData.map((v) => v.id);
  const [showAll, setShowAll] = useState(false);
  const [restartTest, setRestartTest] = useState(false);

  const tableModeChange = () => {
    setShowAll((c) => !c);
  };

  const wrongRestart = () => {
    setTestList(resultData.map((value) => value.id));
    setResultData([]);
    setRestartTest(true);
  };

  const thisTestRestart = () => {
    setResultData([]);
    setRestartTest(true);
  };

  const allFileRestart = () => {
    setTestList(wordList.map((value) => value.id));
    setResultData([]);
    setRestartTest(true);
  };

  return (
    <>
      {restartTest ? (
        <Navigate to="/test/progress"></Navigate>
      ) : (
        <>
          <Helmet>
            <title>💯 Test Result</title>
          </Helmet>

          <Title>Result</Title>
          <Wrapper>
            <AnswerStatus>
              Correct : {correctCount} Wrong : {wrongCount}
            </AnswerStatus>
            <DetailsControl>
              <DetailsBtn onClick={tableModeChange}>&lt;</DetailsBtn>
              <div />
              <TableTitle>{showAll ? "All Words" : "Wrong Only"}</TableTitle>
              <div />
              <DetailsBtn onClick={tableModeChange}>&gt;</DetailsBtn>
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

            <NewTestPanel>
              <WrongRestartBtn
                onClick={wrongRestart}
                disabled={wrongCount == 0}
                isDisabled={wrongCount == 0}
              >
                {wrongCount == 0 ? (
                  <div>-</div>
                ) : (
                  <div>
                    오답만 <br /> 재시험
                  </div>
                )}
              </WrongRestartBtn>
              <div />
              <RestartBtn onClick={thisTestRestart}>
                이번 세트
                <br /> 재시험
              </RestartBtn>
              <div />
              <RestartBtn onClick={allFileRestart}>
                전체 파일
                <br /> 재시험
              </RestartBtn>
            </NewTestPanel>
          </Wrapper>
          <HomeButton />
        </>
      )}
    </>
  );
}

export default Results;
