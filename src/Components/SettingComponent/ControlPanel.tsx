import { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../Data";
import { Ioptions } from "../../interface";
import { ResetBtn, TestSettingBtn, TestStartBtn } from "../StyledCOMP";
import Default from "./Default";
import Pick from "./Pick";
import Radio from "./Radio";
import Random from "./Random";

interface IcontrolPanel {
  changeTestList: Function;
  onStart: Function;
}

const BtnPanel = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: auto 1fr auto 1fr auto;
  align-items: center;
`;

const SettingPanel = styled.div<{ visible: boolean }>`
  opacity: ${(props) => (props.visible ? "1" : "0")};
  height: ${(props) => (props.visible ? "400px" : "0")};
  transition: opacity 0.5s linear, height 0.5s linear;
  width: inherit;
  background-color: #eee;
`;

function ControlPanel({ changeTestList, onStart }: IcontrolPanel) {
  const { wordList, resetData } = useContext(DataContext);
  const [settingOpened, setSettingOpened] = useState(false);
  const [settingChanged, setSettingChanged] = useState(false);
  const [radioIndex, setRadioIndex] = useState(0);
  const [testOptions, setTestOptions] = useState<Ioptions>({
    testMode: 0,
    wordCount: null,
    checkBoxValues: null,
  });

  const onWordOptionChange = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setRadioIndex(Number(event.currentTarget.value));
  };

  const settingUpdate = () => {
    setSettingChanged(true);
  };

  const settingSubmit = (options: Ioptions) => {
    setTestOptions(options);
    setSettingChanged(false);
  };

  const onResetClicked = () => {
    resetData();
  };

  const settingOpen = () => {
    setSettingOpened((c) => !c);
  };

  const onTestStartClicked = () => {
    if (testOptions.testMode == 0) {
      DefaultTest();
    } else if (testOptions.testMode == 1) {
      RandomTest();
    } else {
      PickTest();
    }
  };

  const DefaultTest = () => {
    var test = wordList.map((value, index) => index);
    changeTestList(test);
    onStart();
  };

  const RandomTest = () => {
    var newTest = wordList.map((val, idx) => idx);
    while (newTest.length != testOptions.wordCount) {
      var randIdx = Math.floor(newTest.length * Math.random());
      newTest.splice(randIdx, 1);
    }
    changeTestList(newTest);
    onStart();
  };

  const PickTest = () => {
    var list = testOptions.checkBoxValues ?? [];
    var test: Array<number> = [];
    list.forEach((val, idx) => {
      if (val) {
        test.push(idx);
      }
    });
    changeTestList(test);
    onStart();
  };

  return (
    <div>
      <BtnPanel>
        <ResetBtn onClick={onResetClicked}>Reset</ResetBtn>
        <div />
        <TestSettingBtn onClick={settingOpen}>Setting</TestSettingBtn>
        <div />
        <TestStartBtn onClick={onTestStartClicked}>Start</TestStartBtn>
      </BtnPanel>
      <SettingPanel visible={settingOpened}>
        <div>Options{settingChanged ? "*" : ""}</div>
        <Radio
          wordOption={radioIndex}
          onWordOptionChange={onWordOptionChange}
        />
        {radioIndex == 0 ? (
          <Default settingSubmit={settingSubmit} />
        ) : radioIndex == 1 ? (
          <Random
            settingUpdate={settingUpdate}
            settingSubmit={settingSubmit}
            testOptions={testOptions}
          />
        ) : (
          <Pick
            settingUpdate={settingUpdate}
            settingSubmit={settingSubmit}
            testOptions={testOptions}
          />
        )}
      </SettingPanel>
    </div>
  );
}

export default ControlPanel;
