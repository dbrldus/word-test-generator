import { useEffect, useState } from "react";
import { IOptionWindow } from "../../interface";

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

export default Random;
