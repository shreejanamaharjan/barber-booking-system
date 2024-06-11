import React from 'react';
import Header from '../components/Header';  
import Footer from '../components/Footer';
import Router from '../routes/Router';

const Layout = () => {
  return (
    <>
    <Header/>
        <main>
            <Router/>
        </main>
    <Footer/>
    </>
  )
};

export default Layout;
