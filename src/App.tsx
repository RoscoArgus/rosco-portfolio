import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import View from './pages/View/View';
import Modal from './components/Modal/Modal';
import { ModalProvider } from './context/ModalProvider';

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Navbar />
        <main className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/view" element={<View />} />
          </Routes>
          <Modal />
        </main>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
