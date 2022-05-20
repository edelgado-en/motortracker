import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import Pool from './UserPool';
import Nav from './components/Nav'
import Cars from './components/Cars';
import RegisterCar from './components/RegisterCar';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet 
} from "react-router-dom";

import { auth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";

const redirectUrl = 'http://localhost:3000/'; //TODO: change this url in production

const isUserAuthenticated = () => {
    console.log('isAuthenticated');
    console.log(auth.currentUser);
    return auth.currentUser;
  }

const PrivateRoute = ({ children }) => {
  return auth.currentUser ? children : <Navigate to="/" />;
}

const Redirect = () => {
    useEffect(() => {
      window.location = redirectUrl;
    }, []);
  
    return <h5>Redirecting...</h5>
}


const App = () => {
    const [ appUser, setAppUser ] = useState(null);

    useEffect(() => {
        console.log("app use effect");
        //this listener is listening for auth changes meaning sign-in or sign-out
        const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
            console.log('user found');
            console.log(user);
            localStorage.setItem('user', true);
            setAppUser(user);
          } else {
              console.log('user NOT found');
              localStorage.removeItem('user');
              setAppUser(null);
          }
          
        });
    
        return unsubscribe;
      }, []); //dispatch never changes so there is no need to added, but the linter does not know it

      const ProtectedRoute = ({ appUser }) => {
        const userLocal = JSON.parse(localStorage.getItem('user'));

        if (!userLocal) {
            console.log('not authenticated!');
          return <Navigate to="/login" />
        }
      
        return <Outlet />
      }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Nav />}>
                <Route element={<ProtectedRoute appUser={appUser} />}>
                    <Route index element={<Home />} />
                    <Route path="/cars" element={<Cars />} />
                    <Route path="/registercar" element={<RegisterCar />} />
                </Route>
            </Route>

        </Routes>
    </BrowserRouter>
    /*   <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
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
    </Router> */
  );
}

export default App;
