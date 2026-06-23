import React from 'react';
import Hero from '../components/hero';
import About from '../components/about';
import Features from '../components/features';
import Realisation from '../components/realisation';
import Comment from '../components/comment';
import Newsletter from '../components/newsletter';

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <About />
            <Features />
            <Realisation />
            <Comment />
            <Newsletter />
        </div>
    );
};

export default Home;
