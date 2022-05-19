import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Pool from './UserPool';
import Nav from './components/Nav'
import Cars from './components/Cars';
import RegisterCar from './components/RegisterCar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";

import { auth } from "./utils/firebase/firebase.utils";

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/" />;
}

const WrappedRoutes = () => {
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>      
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<PrivateRoute>
          <>
            <Nav />
            <Home />
          </>
          </PrivateRoute>} /> 
        <Route path="/registercar" element={<PrivateRoute>
          <>
            <Nav />
            <RegisterCar />
          </>
          </PrivateRoute>} /> 
          <Route path="/cars" element={<PrivateRoute>
          <>
            <Nav />
            <Cars />
          </>
          </PrivateRoute>} /> 
      </Routes>
    </Router>
  );
}

export default App;
