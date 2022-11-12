import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { UserStorage } from './contexts/UserContext';
import UserAccount from './pages/UserAccount/UserAccount';
import ProtectedRoute from './helpers/ProtectedRoute';
import PhotoPage from './pages/Photo/PhotoPage';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <UserStorage>
                    <Header />
                    <main className='AppBody'>
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="login/*" element={<Login />}/>
                            <Route 
                                path="account/*" 
                                element={
                                <ProtectedRoute>
                                    <UserAccount />
                                </ProtectedRoute>
                                }
                            />
                            <Route path="photo/:id" element={<PhotoPage />}></Route>
                            <Route path="profile/:user" element={<Profile />}></Route>
                            <Route path='*' element={<NotFound />}></Route>
                        </Routes>
                    </main>
                    <Footer />
                </UserStorage>
            </BrowserRouter>
        </div>
    );
}

export default App;