import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

import {
  Header,
  Menu,
  Search,
} from './Components/inc';
import Home from './Components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          index
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
