import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import Modal from './components/Modal/Modal';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Navbar />
        <main className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
          <Modal />
        </main>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
