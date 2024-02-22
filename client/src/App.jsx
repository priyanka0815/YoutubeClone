import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { Header, Sidebar } from './Components/inc';
import Home from './Components/Home';
import WatchPage from './Components/Watch';
import Verify from './Components/Verify';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <div id="main_screen">
        <Sidebar />

        <main>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/watch" element={<WatchPage />} />
            <Route path="/account/">
              <Route path="verify" element={<Verify />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
