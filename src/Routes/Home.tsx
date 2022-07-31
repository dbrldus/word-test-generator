import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Data";

function Home() {
  const { resetData } = useContext(DataContext);

  useEffect(() => {
    resetData();
  }, []);
  return (
    <div>
      <Link to="/test/file">Go To Test Page</Link>
    </div>
  );
}

export default Home;
