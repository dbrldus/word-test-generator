import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const DetailsBtn = styled.button`
  font-family: "Do Hyeon", sans-serif;
  font-size: 32px;
  background-color: #fff;
  border: none;
  width: 200px;
  height: 70px;
  border-radius: 30px;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #7fddff;
  }
`;
const TableWrapper = styled.div<{ showDetails: boolean }>`
  width: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  height: ${(p) => (p.showDetails ? "500px" : "0px")};
  transition: height 1s ease-in-out;

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const WrongTable = styled.table<{ showDetails: boolean }>`
  width: inherit;
  overflow-x: hidden;
  margin: 0px;
  opacity: ${(p) => (p.showDetails ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  font-size: 30px;
  th {
    border-bottom: 2px solid black;
    padding: 5px;
  }
  td {
    border-bottom: 2px solid black;
    padding: 5px;
  }
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

function Results() {
  const { resultData } = useContext(DataContext);

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
        <Title>Finished</Title>
        <AnswerStatus>
          Correct : {resultData.correctCount} Wrong : {resultData.wrongCount}
        </AnswerStatus>
        <DetailsBtn onClick={onButtonClick}>
          {showDetails ? "Hide Details" : "Show Details"}
        </DetailsBtn>
        <TableWrapper showDetails={showDetails}>
          <WrongTable showDetails={showDetails}>
            <thead>
              <tr>
                <th>Word</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {resultData.wrongAnswers.map((value, index) => (
                <tr key={index}>
                  <td>{value.word}</td>
                  <td>{value.answerInput}</td>
                  <td>{value.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </WrongTable>
        </TableWrapper>
      </Wrapper>
      <HomeButton>
        <Link to="/">Home</Link>
      </HomeButton>
    </>
  );
}

export default Results;
