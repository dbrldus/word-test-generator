import styled from "styled-components";

interface IRadio {
  wordOption: number;
  onWordOptionChange: any;
}

const RadioInput = styled.div`
  background-color: #eee;
  display: grid;
  grid-template-columns: 1fr auto auto auto 1fr;
  input {
    display: none;
  }
`;

const RadioLabel = styled.label<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#7fddff" : "#eee")};
  color: ${(props) => (props.selected ? "black" : "grey")};
  transition: background-color 0.25s linear, color 0.25s linear;
  display: block;
  width: 120px;
  border-radius: 10px;
  font-size: 30px;
`;

function Radio({ wordOption, onWordOptionChange }: IRadio) {
  return (
    <RadioInput>
      <div />
      <input
        type="radio"
        id="Default"
        name="wordOption"
        onChange={onWordOptionChange}
        value={0}
        defaultChecked
      />
      <RadioLabel htmlFor="Default" selected={wordOption == 0}>
        Default
      </RadioLabel>
      <input
        type="radio"
        id="Random"
        value={1}
        name="wordOption"
        onChange={onWordOptionChange}
      />
      <RadioLabel htmlFor="Random" selected={wordOption == 1}>
        Random
      </RadioLabel>
      <input
        type="radio"
        id="Custom"
        name="wordOption"
        value={2}
        onChange={onWordOptionChange}
      />
      <RadioLabel htmlFor="Custom" selected={wordOption == 2}>
        Custom
      </RadioLabel>
      <div />
    </RadioInput>
  );
}

export default Radio;
