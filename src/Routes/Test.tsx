import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Irow, ITest } from "../interface";

function Test({ wordList }: ITest) {
  const [testList, setTestList] = useState<Array<Irow>>([]);

  const createTestList = () => {
    var randomizedList: Array<Irow> = [];
    var list: Array<Irow> = wordList;
    var length = list.length;
    for (var i = 0; i < length; i++) {
      var randInt = Math.floor(Math.random() * list.length);
      randomizedList[i] = list[randInt];
      list.splice(randInt, 1);
      if (i == length - 1) {
        setTestList(randomizedList);
      }
    }
  };

  useEffect(() => {
    createTestList();
  }, []);

  return (
    <>
      <div>
        <h1>Hello</h1>
        <form>
          <input type="text" />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default Test;
