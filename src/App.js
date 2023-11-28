import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { NoteContextProvider } from "./context/notes/NoteContext";
import { AlertContextProvider } from "./context/alerts/AlertContext";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteContextProvider>
        <Router>
          <Navbar appName="iNotebook" />
          <AlertContextProvider>
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </AlertContextProvider>
        </Router>
      </NoteContextProvider>
    </>
  );
}

export default App;
