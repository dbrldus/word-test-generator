import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import File from "../Components/File";
import Radio from "../Components/Radio";
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
  const [settingOpened, setSettingOpened] = useState(false);
  const [settingChanged, setSettingChanged] = useState(false);
  const [radioIndex, setRadioIndex] = useState(0);
  const [testOptions, setTestOptions] = useState<Ioptions>({
    testMode: 0,
    wordCount: null,
    checkBoxValues: null,
  });

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
    setTestList(test);
    setStartPressed(true);
  };

  const RandomTest = () => {
    var newTest = wordList.map((val, idx) => idx);
    while (newTest.length != testOptions.wordCount) {
      var randIdx = Math.floor(newTest.length * Math.random());
      newTest.splice(randIdx, 1);
    }
    setTestList(newTest);
    setStartPressed(true);
  };

  const PickTest = () => {
    var list = testOptions.checkBoxValues ?? [];
    var test: Array<number> = [];
    list.forEach((val, idx) => {
      if (val) {
        test.push(idx);
      }
    });
    setTestList(test);
    setStartPressed(true);
  };

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
  console.log(testOptions);

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
              <div>
                <BtnPanel>
                  <ResetBtn onClick={onResetClicked}>Reset</ResetBtn>
                  <div />
                  <TestSettingBtn onClick={settingOpen}>Setting</TestSettingBtn>
                  <div />
                  <TestStartBtn onClick={onTestStartClicked}>
                    Start
                  </TestStartBtn>
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
            ) : (
              ""
            )}
          </Wrapper>
        </>
      )}
    </>
  );
}

interface IOptionDefault {
  settingSubmit: (options: Ioptions) => void;
}

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
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}

interface IOptionWindow {
  settingUpdate: Function;
  settingSubmit: (options: Ioptions) => void;
  testOptions: Ioptions;
}

function Random({ settingUpdate, settingSubmit, testOptions }: IOptionWindow) {
  const [counter, setCounter] = useState<number>(1);
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCounter(Number(event.currentTarget.value));
    settingUpdate();
  };

  const onReset = () => {
    setCounter(1);
  };

  const onSubmit = () => {
    settingSubmit({
      testMode: 1,
      wordCount: counter,
      checkBoxValues: null,
    });
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
      <form onSubmit={(e) => e.preventDefault()}>
        Word Count :
        <input
          type="number"
          placeholder="Count"
          value={counter == 0 ? "" : counter}
          onChange={onChange}
        ></input>
        <button onClick={onReset}>Reset</button>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
}

const PickWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 200px;
  overflow-y: auto;
  font-size: 20px;

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

function Pick({ settingUpdate, settingSubmit, testOptions }: IOptionWindow) {
  const { wordList } = useContext(DataContext);
  const [checkedList, setCheckedList] = useState<Array<boolean>>([]);

  useEffect(() => {
    if (testOptions.checkBoxValues == null) {
      setCheckedList(wordList.map(() => false));
    } else {
      setCheckedList(testOptions.checkBoxValues);
    }
  }, []);

  const deselectAll = () => {
    setCheckedList(wordList.map(() => false));
  };

  const onSubmit = () => {
    settingSubmit({
      testMode: 2,
      wordCount: null,
      checkBoxValues: checkedList,
    });
  };

  const updateCheckbox = (event: any) => {
    var newList = checkedList.map((value, index) => {
      if (index == event.currentTarget.value) {
        return !value;
      } else {
        return value;
      }
    });
    settingUpdate();
    setCheckedList(newList);
  };
  return (
    <>
      <PickWrapper>
        {wordList.map((value, index) => (
          <div key={`${index}`}>
            <input
              type="checkbox"
              id={`${index}`}
              value={index}
              onChange={updateCheckbox}
              checked={checkedList[index] ? true : false}
            ></input>
            <label htmlFor={`${index}`}>{value.word}</label>
          </div>
        ))}
      </PickWrapper>
      <button onClick={deselectAll}>Reset</button>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}
export default TestSetting;
