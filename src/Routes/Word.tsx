import { useState } from "react";
import { Navigate } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import { Irow, IWord } from "../interface";

function Word({ setWordList }: IWord) {
  const [finished, setFinished] = useState(false);
  const onFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;
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
  return (
    <>
      {finished ? (
        <Navigate to="/test" />
      ) : (
        <input
          type="file"
          onChange={onFileInput}
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      )}
    </>
  );
}

export default Word;
