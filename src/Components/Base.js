import React from 'react';
import Nav from "./Nav";
import Footer from "./Footer";

const Base = ({ children }) => {
    return (
        <div>
            <Nav />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Base;
