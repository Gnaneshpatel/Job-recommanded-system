import React, { useState } from 'react';
import "./Home.css"
const Education2 = () => {

    const [collage, setcollage] = useState("");
    const [degree, setdegree] = useState("");
    const [year, setyear] = useState("");
    const [marks, setmarks] = useState("");
    return (
        <div className="container mt-3">
            <div className="container card">

                <div className="card-header text-bold">
                    Education
  </div>
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-3">
                            <div className="avatar mx-auto white">
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg" className="rounded-circle edu"
                                    alt="woman avatar" />
                            </div>
                        </div>
                        <div className="col-md-9"><h5 className="card-title mt-3">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Education2;
