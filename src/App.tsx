import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import AppLayout from './container/AppLayout';
import './App.scss';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppLayout />} />
    </Routes>
  </Router>
);
export default App;
