import "./Home.css";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import CandidateApplied from "./CandidateApplied";
import "./avtar.css";
const Card1 = (props) => {
  console.log(props);
  const [candidate, setCandidate] = useState([]);
  useEffect(async () => {
    // console.log(props);
    await firebase
      .database()
      .ref("user/" + props.candidate.userId)
      .on("value", async (snapshot) => {
        console.log(props.candidate.userId);
        console.log("sdlknlasnvoliasndvoiaf", snapshot.val());
        setCandidate(await snapshot.val());
      });
  }, []);

  return (
    <div className="card testimonial-card">
      <div className="card-up indigo lighten-1"></div>

      <div className="avatar mx-auto mt-2 white">
        <img
          src={candidate.profilePhoto}
          className="rounded-circle studentCard profile"
          alt="woman avatar"
        />
      </div>

      <div className="card-body">
        <h4 className="card-title">{candidate.name}</h4>
        <hr />
        <h5 className="card-title">{candidate.location}</h5>
        <h5 className="card-title">{candidate.position}</h5>
        <hr />
        <button
          type="button"
          class="btn btn-default"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Info
        </button>

        <div
          class="modal fade bd-example-modal-lg"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Student Information
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="container">
                  <div className="container mt-5 mb-5">
                    <div className="card testimonial-card">
                      <div className="card-up indigo lighten-1"></div>

                      <div className="avatar mx-auto white ">
                        <img
                          src={candidate.profilePhoto}
                          className="rounded-circle mt-3 profile"
                          alt="woman avatar"
                        />
                      </div>

                      <div className="card-body text-center">
                        <h4 className="card-title">Name:{candidate.name}</h4>
                        <hr />
                        <p>location {candidate.location}</p>
                        <hr />
                        <p>study {candidate.study}</p>
                        <hr />
                        <p>position {candidate.position}</p>
                      </div>
                    </div>
                  </div>

                  <div className="container mt-3">
                    <div className="container card">
                      <div className="card-header text-bold">Certificate</div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="avatar mx-auto white">
                              <img
                                src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                                className="rounded-circle edu"
                                alt="woman avatar"
                              />
                            </div>
                          </div>
                          <div className="col-md-9">
                            <h5 className="card-title mt-3">
                              Special title treatment
                            </h5>
                            <p className="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container mt-3">
                    <div className="container card">
                      <div className="card-header text-bold">Education</div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            <div className="avatar mx-auto white">
                              <img
                                src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                                className="rounded-circle edu"
                                alt="woman avatar"
                              />
                            </div>
                          </div>
                          <div className="col-md-9">
                            <h5 className="card-title mt-3">
                              Special title treatment
                            </h5>
                            <p className="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container card mt-3 mb-3">
                    <div className="card-header text-bold mb-2">skills</div>
                    <ul class="list-group">
                      {["sd"].map((value) => {
                        console.log(candidate.skills);
                        return <li class="list-group-item">{value.skill}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card1;
