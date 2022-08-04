import { useState } from "react";
import styled from "styled-components";

interface IFile {
  onFileInput: Function;
}

const FileComponent = styled.form`
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

function File({ onFileInput }: IFile) {
  const [dragActive, setDragActive] = useState(false);
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
    <FileComponent
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
      <DragField htmlFor="fileUpload" bgColor={dragActive ? "#CCF1FF" : "#fff"}>
        <div />
        <div>
          <p>Drag file Here or Click to upload file</p>
        </div>
        <div />
      </DragField>
    </FileComponent>
  );
}

export default File;
