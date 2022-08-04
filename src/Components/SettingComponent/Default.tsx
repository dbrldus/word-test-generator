import styled from "styled-components";
import { Ioptions } from "../../interface";
import { OptionsBtn } from "../StyledCOMP";

interface IOptionDefault {
  settingSubmit: (options: Ioptions) => void;
}

const DIV = styled.div`
  height: 200px;
  font-size: 20px;
`;

function Default({ settingSubmit }: IOptionDefault) {
  const onSubmit = () => {
    settingSubmit({
      testMode: 0,
      wordCount: null,
      checkBoxValues: null,
    });
  };
  return (
    <>
      <DIV>Test All Words In File</DIV>
      <OptionsBtn onClick={onSubmit}>Submit</OptionsBtn>
    </>
  );
}

export default Default;
