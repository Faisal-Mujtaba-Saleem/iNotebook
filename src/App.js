import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { NoteStates } from "./context/notes/NoteContext";

function App() {
  return (
    <>
      <NoteStates>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteStates>
    </>
  );
}

export default App;
