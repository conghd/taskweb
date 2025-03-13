import * as React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";

import Navbar from "./components/Navbar";
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';


function App() {
    return (
      <Router>
         <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/tasks/edit/:id" element={<TaskForm />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/" element={<Login />} />
          </Routes>
      </Router>
    ); 
}

export default App;
