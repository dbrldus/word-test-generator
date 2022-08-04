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
  text-align: center;
  width: 100px;
  height: 50px;
`;

export const TestSettingBtn = styled(DefaultBtn)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
`;

export const TestStartBtn = styled(DefaultBtn)`
  width: 100px;
  height: 50px;
`;

export const DetailsBtn = styled(DefaultBtn)`
  width: 50px;
  height: 50px;
`;

export const WrongRestartBtn = styled(DefaultBtn)<{ isDisabled: boolean }>`
  font-size: 25px;
  width: 150px;
  height: 80px;
  &:hover {
    background-color: ${(props) => (props.isDisabled ? "#fff" : "#7fddff")};
  }
  transition: background-color 0.3s linear;
`;

export const RestartBtn = styled(DefaultBtn)`
  font-size: 25px;
  width: 150px;
  height: 80px;
`;

export const OptionsBtn = styled(DefaultBtn)`
  background-color: #eee;
  font-size: 20px;
  text-align: center;
  width: 70px;
  height: 40px;
  margin: 5px;
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

export const ResultTable = styled(DefaultTable)``;

export const ResultTableWrapper = styled(DefaultTableWrapper)<{
  show: boolean;
}>`
  width: 600px;
  height: 500px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

////////////////////////////////////////////

export const Title = styled.h1`
  width: 100vw;
  padding: 10px 0px 10px 0px;
  margin-top: 0px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 5px 10px -10px black;
`;
