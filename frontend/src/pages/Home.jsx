import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CSS/Home.css';
import Header from '../components/home/Header.jsx';
import FeatureList from '../components/home/FeatureList.jsx';
import Footer from '../components/home/Footer.jsx';

const Home = () => {
  return (
    <div>
      <Header />
      <FeatureList />
      <Footer />
    </div>
  );
};

export default Home;
