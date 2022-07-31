import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import {
  ResetBtn,
  TestStartBtn,
  WordTable,
  WordTableWrapper,
} from "../Components/StyledCOMP";
import { DataContext } from "../Data";
import { Irow } from "../interface";

const Wrapper = styled.form`
  font-family: "Do Hyeon", sans-serif;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 10%);
  text-align: center;
  width: 700px;
  input {
    display: none;
  }
`;

const DragField = styled.label<{ bgColor: string }>`
  width: inherit;
  height: 100px;
  font-size: 30px;
  border-radius: 20px;
  border: 3px dashed black;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  background-color: ${(props) => props.bgColor};
  transition: background-color 0.1s linear;
  p {
    margin: 0px;
  }
`;

const BtnPanel = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: auto 1fr auto;
`;

function File() {
  const { wordList, setWordList, setTestList, resetData } =
    useContext(DataContext);
  const [dragActive, setDragActive] = useState(false);
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
  const handleDrag = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type == "dragenter" || e.type == "dragover") {
      setDragActive(true);
    } else if (e.type == "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = function (e: React.DragEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileInput(e.dataTransfer.files);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onFileInput(e.currentTarget.files);
  };

  const onResetClicked = () => {
    resetData();
  };

  const onTestStartClicked = () => {
    var test = wordList.map((value, index) => index);
    setTestList(test);
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
          <Wrapper
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
          >
            <h1>Test Setting</h1>
            <input
              type="file"
              id="fileUpload"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onChange}
            />
            <DragField
              htmlFor="fileUpload"
              bgColor={dragActive ? "#CCF1FF" : "#fff"}
            >
              <div />
              <div>
                <p>Drag file Here or Click to upload file</p>
              </div>
              <div />
            </DragField>
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
            {wordList.length != 0 ? (
              <BtnPanel>
                <ResetBtn onClick={onResetClicked}>Reset</ResetBtn>
                <div />
                <TestStartBtn onClick={onTestStartClicked}>
                  Test Start
                </TestStartBtn>
              </BtnPanel>
            ) : (
              ""
            )}
          </Wrapper>
        </>
      )}
    </>
  );
}

export default File;
