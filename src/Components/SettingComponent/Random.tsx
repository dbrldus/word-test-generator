import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../Data";
import { IOptionWindow } from "../../interface";
import { OptionsBtn } from "../StyledCOMP";

const Wrapper = styled.form`
  display: block;
  height: 200px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const NumberInput = styled.input.attrs({
  type: "number",
  placeholder: "Count",
})`
  font-family: "Do Hyeon", sans-serif;
  border: none;
  outline: none;
  background-color: #eee;
  border-bottom: 3px solid black;
  width: 100px;
  font-size: 20px;
  margin-left: 10px;
  text-align: center;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

function Random({ settingUpdate, settingSubmit, testOptions }: IOptionWindow) {
  const [counter, setCounter] = useState<number>(1);
  const { wordList } = useContext(DataContext);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    var inputNum = Number(event.currentTarget.value);
    setCounter(Math.max(Math.min(inputNum, wordList.length), 0));
    settingUpdate();
  };

  const onReset = () => {
    setCounter(1);
  };

  const onSubmit = () => {
    if (counter == 0) {
      alert("Please Input Number");
      setCounter(1);
    } else {
      settingSubmit({
        testMode: 1,
        wordCount: counter,
        checkBoxValues: null,
      });
    }
  };

  useEffect(() => {
    if (testOptions.wordCount == null) {
      setCounter(1);
    } else {
      setCounter(testOptions.wordCount);
    }
  }, []);
  return (
    <>
      <Wrapper onSubmit={(e) => e.preventDefault()}>
        <Title>Word Count :</Title>
        <NumberInput
          value={counter == 0 ? "" : counter}
          onChange={onChange}
          min={1}
          max={wordList.length}
        ></NumberInput>
      </Wrapper>
      <OptionsBtn onClick={onReset}>Reset</OptionsBtn>
      <OptionsBtn onClick={onSubmit}>Submit</OptionsBtn>
    </>
  );
}

export default Random;
