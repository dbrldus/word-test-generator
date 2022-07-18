import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import { Irow, IWord } from "../interface";

const Wrapper = styled.form`
  font-family: "Do Hyeon", sans-serif;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  input {
    display: none;
  }
`;

const DragField = styled.label<{ bgColor: string }>`
  width: 70vw;
  height: 70vh;
  font-size: 30px;
  border-radius: 50px;
  border: 10px dashed black;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  background-color: ${(props) => props.bgColor};
  transition: background-color 0.1s linear;
  p {
    margin: 0px;
  }
`;
function Word({ setWordList }: IWord) {
  const [finished, setFinished] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const onFileInput = async (files: any) => {
    if (files != null) {
      let content = await readXlsxFile(files[0]);
      let wordList: Array<Irow> = [];
      content.forEach((row) => {
        wordList.push({
          word: row[0].toString(),
          meaning: row[1].toString().split(","),
        });
      });
      setWordList(wordList);
      setFinished(true);
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
  return (
    <>
      {finished ? (
        <Navigate to="/test" />
      ) : (
        <Wrapper
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onSubmit={(e) => e.preventDefault()}
        >
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
              <p>Drag file Here</p>
              <p>or</p>
              <p>Click to upload file</p>
            </div>
            <div />
          </DragField>
        </Wrapper>
      )}
    </>
  );
}

export default Word;
