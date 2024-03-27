import React from 'react'
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';


import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TextBox from './components/TextBox/TextBox';
import TaskManager from './components/TaskManager/TaskManager';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Register />} />
          <Route path='/register' element={<Register />} />
          <Route path='/textbox' element={<TextBox />} />
          <Route path='/tasks' element={<TaskManager />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;