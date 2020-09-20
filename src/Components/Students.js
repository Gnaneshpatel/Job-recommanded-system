import React from 'react';
import Base from './Base';
import Search from './Search';
import Card1 from './Card1';

const Students = () => {
    return (
        <Base>
            <Search />
            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <Card1 />
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default Students;
