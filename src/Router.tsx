import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Word from "./Routes/Word";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/word" />} />
        <Route path="/word" element={<Word />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
