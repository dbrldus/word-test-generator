import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import styled from "styled-components";
import ControlPanel from "../Components/SettingComponent/ControlPanel";
import File from "../Components/SettingComponent/File";
import { Title, WordTable, WordTableWrapper } from "../Components/StyledCOMP";
import { DataContext } from "../Data";
import { Irow } from "../interface";

const Wrapper = styled.div`
  font-family: "Do Hyeon", sans-serif;
  text-align: center;
  margin: auto;
  width: 700px;
`;

const FileInfo = styled.div`
  width: inherit;
  font-size: 30px;
  text-align: left;
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
            <FileInfo>
              Total : {wordList.length != 0 ? wordList.length : ""}
            </FileInfo>
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

export default TestSetting;
