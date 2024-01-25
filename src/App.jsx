import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import {
  Header,
  Sidebar,
} from './Components/inc';
import Home from './Components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <div id="main_screen">
        <Sidebar />

        <main>
          <Routes>
            <Route
              path="/"
              index
              element={<Home />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
