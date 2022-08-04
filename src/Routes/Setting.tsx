import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import Default from "../Components/SettingComponent/Default";
import File from "../Components/SettingComponent/File";
import Pick from "../Components/SettingComponent/Pick";
import Radio from "../Components/SettingComponent/Radio";
import Random from "../Components/SettingComponent/Random";
import {
  ResetBtn,
  TestSettingBtn,
  TestStartBtn,
  WordTable,
  WordTableWrapper,
} from "../Components/StyledCOMP";
import { DataContext } from "../Data";
import { Ioptions, Irow } from "../interface";

const Wrapper = styled.div`
  font-family: "Do Hyeon", sans-serif;
  text-align: center;
  margin: auto;
  width: 700px;
`;

const Title = styled.h1`
  width: 100vw;
  padding: 10px 0px 10px 0px;
  margin-top: 0px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 5px 10px -10px black;
`;

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

function TestSetting() {
  const { wordList, setWordList, setTestList, resetData } =
    useContext(DataContext);
  const [startPressed, setStartPressed] = useState(false);

  const onFileInput = async (files: any) => {
    if (files != null) {
      let content = await readXlsxFile(files[0]);
      let list: Array<Irow> = [];
      content.forEach((row, index) => {
        list.push({
          id: index,
          word: row[0].toString(),
          meaning: row[1]
            .toString()
            .split(",")
            .map((value) => value.trim()),
        });
      });
      setWordList(list);
    }
  };

  const changeTestList = (test: any) => {
    setTestList(test);
  };

  const onStart = () => {
    setStartPressed(true);
  };

  useEffect(() => {
    resetData();
  }, []);

  return (
    <>
      {startPressed ? (
        <Navigate to="/test/progress"></Navigate>
      ) : (
        <>
          <Helmet>
            <title>Test Settings</title>
          </Helmet>
          <Title>Test Setting</Title>
          <Wrapper>
            <File onFileInput={onFileInput} />
            <WordTableWrapper>
              <WordTable>
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {wordList.map((value, index) => (
                    <tr key={index}>
                      <td>{value.word}</td>
                      <td>{value.meaning.join()}</td>
                    </tr>
                  ))}
                </tbody>
              </WordTable>
            </WordTableWrapper>
            <div>
              WordList Length : {wordList.length != 0 ? wordList.length : ""}
            </div>
            {wordList.length != 0 ? (
              <ControlPanel changeTestList={changeTestList} onStart={onStart} />
            ) : (
              ""
            )}
          </Wrapper>
        </>
      )}
    </>
  );
}

interface IcontrolPanel {
  changeTestList: Function;
  onStart: Function;
}

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
export default TestSetting;
