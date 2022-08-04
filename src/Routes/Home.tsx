import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Title } from "../Components/StyledCOMP";
import { DataContext } from "../Data";

const Wrapper = styled.div`
  text-align: center;
`;

const ButtonLayer = styled.div`
  display: flex;
  justify-content: center;
`;

const TestBtn = styled.div`
  font-family: "Do Hyeon", sans-serif;

  width: 300px;
  height: 50px;
  font-size: 30px;
  border-radius: 10px;
  &:hover {
    background-color: #7fddff;
  }
  transition: background-color 0.3s linear;

  a {
    color: black;
    text-decoration: none;
  }
`;

function Home() {
  const { resetData } = useContext(DataContext);

  useEffect(() => {
    resetData();
  }, []);
  return (
    <Wrapper>
      <Title>Welcome</Title>
      <ButtonLayer>
        <TestBtn>
          <Link to="/test/file">Go To Test Page</Link>
        </TestBtn>
      </ButtonLayer>
    </Wrapper>
  );
}

export default Home;
