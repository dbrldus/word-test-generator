import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../Data";
import { IOptionWindow } from "../../interface";
import { OptionsBtn } from "../StyledCOMP";

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

function Custom({ settingUpdate, settingSubmit, testOptions }: IOptionWindow) {
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
    var trueCount = checkedList.filter((value) => value).length;
    if (trueCount == 0) {
      alert("At least one thing should be checked");
    } else {
      settingSubmit({
        testMode: 2,
        wordCount: null,
        checkBoxValues: checkedList,
      });
    }
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
      <OptionsBtn onClick={deselectAll}>Reset</OptionsBtn>
      <OptionsBtn onClick={onSubmit}>Submit</OptionsBtn>
    </>
  );
}

export default Custom;
