import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { NoteContextProvider } from "./context/notes/NoteContext";

function App() {
  return (
    <>
      <NoteContextProvider>
        <Router>
          <Navbar appName="iNotebook" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteContextProvider>
    </>
  );
}

export default App;
