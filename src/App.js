import { Routes, Route, BrowserRouter } from "react-router-dom";
import Calender from "./components/calender";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calender />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
