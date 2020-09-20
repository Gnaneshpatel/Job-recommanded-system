import React, { useEffect } from 'react';
import Base from './Base';
import "./Home.css";
import Crousel from './Crousel';
import Jumbotron from './Jumbotron';

const Home = (props) => {

    return (
        <Base>
            <div className="row mt-4">
                <div className="col-md-6">
                    <Crousel />
                </div>
                <div className="col-md-6">
                    <Jumbotron />
                </div>
            </div>

        </Base>
    );
}

export default Home;
