import readXlsxFile from "read-excel-file";

interface Irow {
  word: string;
  meaning: Array<string>;
}

function Word() {
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
      console.log(wordList);
    }
  };
  return (
    <input
      type="file"
      onChange={onFileInput}
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    />
  );
}

export default Word;
