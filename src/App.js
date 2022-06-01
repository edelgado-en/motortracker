import React, { useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './routes/login/Login';
import Home from './routes/dashboard/Home';
import Nav from './components/Nav'
import Cars from './routes/cars/Cars';
import RegisterCar from './routes/registration/RegisterCar';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet 
} from "react-router-dom";

import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";

import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 30000,
        }
    }
});

const App = () => {
    
    useEffect(() => {
        //this listener is listening for auth changes meaning sign-in or sign-out
        const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
            localStorage.setItem('user', true);
          
          } else {
              localStorage.removeItem('user');
          }
        });
    
        return unsubscribe;
      }, []); 

    const ProtectedRoute = () => {
        const userLocal = JSON.parse(localStorage.getItem('user'));

        if (!userLocal) {
          return <Navigate to="/login" />
        }
      
        return <Outlet />
    }

  return (
      <>
        <QueryClientProvider client={queryClient}>
            <ToastContainer autoClose={2000}/>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Nav />}>
                        <Route element={<ProtectedRoute />}>
                            <Route index element={<Home />} />
                            <Route path="/cars" element={<Cars />} />
                            <Route path="/registercar" element={<RegisterCar />} />
                        </Route>
                    </Route>

                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </>
  );
}

export default App;
