import React from 'react';
import Header from '../pages/sharedPage/navbar/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header></Header> 
            <Outlet/> 
        </div>
    );
};

export default Main;