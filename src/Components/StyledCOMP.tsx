import styled from "styled-components";

const DefaultBtn = styled.button`
  font-family: "Do Hyeon", sans-serif;
  background-color: #fff;
  border-radius: 10px;
  border: none;
  font-size: 30px;
  &:hover {
    background-color: #7fddff;
  }
  transition: background-color 0.3s linear;
`;

export const HomeBtn = styled(DefaultBtn)`
  font-family: "Do Hyeon", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  width: 100px;
  height: 100px;
  transform: translate(-50%, 0%);
`;

export const ResetBtn = styled(DefaultBtn)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
`;

export const TestStartBtn = styled(DefaultBtn)`
  width: 150px;
  height: 50px;
`;

export const DetailsBtn = styled(DefaultBtn)`
  width: 200px;
  height: 50px;
`;

////////////////////////////////////////////////////////////////

const DefaultTableWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;

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

const DefaultTable = styled.table`
  width: inherit;
  overflow-x: hidden;
  margin: 0px;
  font-size: 30px;

  th,
  td {
    border-bottom: 2px solid black;
    padding: 5px;
  }
`;

export const WordTable = styled(DefaultTable)``;

export const WordTableWrapper = styled(DefaultTableWrapper)`
  width: inherit;
  margin-top: 20px;
  height: 500px;
`;

export const ResultTable = styled(DefaultTable)<{ showDetails: boolean }>`
  opacity: ${(p) => (p.showDetails ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export const ResultTableWrapper = styled(DefaultTableWrapper)<{
  showDetails: boolean;
}>`
  width: 600px;
  height: ${(p) => (p.showDetails ? "500px" : "0px")};
  transition: height 1s ease-in-out;
`;
