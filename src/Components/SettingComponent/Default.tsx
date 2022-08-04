import { Ioptions } from "../../interface";

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

export default Default;
