
import './App.css';
import Header from './Komponentit/Header';
import Footer from './Komponentit/Footer';
import Myynti from './sivut/myynti' //<---esim myynti
import Kotisivu from './sivut/kotisivu'
import Eiloyda from './sivut/eiloyda_sivu'
import Register from './sivut/rekistrointisivu';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { Otayhteytta } from './sivut/otayhteyytta';
import { Kayttoehdot } from './sivut/kayttoehdot';
import { KategoriaUL } from './Komponentit/kategoriatUL';
import { UserProvider } from './Komponentit/kayttajacontext';
import UserPage from'./sivut/kayttajasivu';
import React, { useState, useEffect } from 'react';
import axios from "axios"
import ProductPage from './sivut/tuotesivu';
import Viestit from './Komponentit/Viestit';

//routet pitäisi laittaa omaan tiedostoonsa,myös frontendissä esim komponentit/routes yms
//routet käytännössä linkkejä, esim myynti haetaan hakemistosta, ja nimetään. käytetään sitten routessa elementtinä.
//<outletin /> alle <Footer /> kun tehty
function App() {
  
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      
      <div className="container">
        <div className="sidebar">
          {/* Sidebar content goes here */}
          <ul>
            <li><a href="/">Kotisivu</a></li>
            <li><a href="/myynti">Myynti</a></li>
            <li><a href="/Viestit">Viestit  </a></li>
            <li><a href='/rekisteröidy'>Rekisteröidy</a></li>
            
            </ul>
           <KategoriaUL/>
        </div>
        <main className="main-content">{children}</main>
      </div>
      
      <Footer />
    </div>
  );
};


  return (
    <Router>
      <UserProvider> {/* Wrap the entire app with UserContextProvider */}
        <Layout>
          <Routes>
            <Route path="/" element={<Kotisivu />} />
            <Route path="/myynti" element={<Myynti />} />
            <Route path="/otayhteytta" element={<Otayhteytta />} />
            <Route path="/kayttoehdot" element={<Kayttoehdot />} />
            <Route path="/users/:_id" element={<UserPage />} />
            <Route path="/tuotteet/:productId" element={<ProductPage />} />
            <Route path="*" element={<Eiloyda />} />
            <Route path="/Viestit" element={<Viestit />} />
            <Route path="/rekisteröidy" element={<Register />} />
          </Routes>
        </Layout>
      </UserProvider>
    </Router>
  );
}







export default App;
