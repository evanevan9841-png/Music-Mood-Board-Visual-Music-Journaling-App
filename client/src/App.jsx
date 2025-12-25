import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BoardDetail from './pages/BoardDetail';
import Navbar from './components/Navbar';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="container">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/board/:id" element={<BoardDetail />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
