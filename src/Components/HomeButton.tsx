import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { DataContext } from "../Data";

const Button = styled.button`
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
  border: none;
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

function HomeButton() {
  const { resetData } = useContext(DataContext);

  const [pressed, setPressed] = useState(false);
  const onClick = () => {
    resetData();
    setPressed(true);
  };
  return (
    <>
      {pressed ? (
        <Navigate to="/"></Navigate>
      ) : (
        <Button onClick={onClick}>Home</Button>
      )}
    </>
  );
}
export default HomeButton;
