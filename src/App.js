import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navmin from './components/Navmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Home from './components/Home';
import About from './components/About'
import NoteState from './context/notes/NoteStates';
import Alert from './components/Alert';

function App() {
  return (
    <>
<NoteState>
    <BrowserRouter>
    <Navmin />
    <Alert message="This is a good course" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
