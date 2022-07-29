import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../Data";
import { HomeBtn } from "./StyledCOMP";

function HomeButton() {
  const { resetData } = useContext(DataContext);

  const [pressed, setPressed] = useState(false);
  const onClick = () => {
    resetData();
    setPressed(true);
  };
  return (
    <>
      {pressed ? (
        <Navigate to="/"></Navigate>
      ) : (
        <HomeBtn onClick={onClick}>Home</HomeBtn>
      )}
    </>
  );
}
export default HomeButton;
