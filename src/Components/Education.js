import React, { useState, useEffect } from "react";
import "./Home.css";
import firebase from "firebase";
var userId;
const Education = () => {
  const [college, setcollege] = useState("");
  const [degree, setdegree] = useState("");
  const [year, setyear] = useState("");
  const [marks, setmarks] = useState("");
  const [books, updateBooks] = useState([]);
  const [noOfEducation, setnoOfEducation] = useState("");
  useEffect(() => {
    // userId = "1MbWyDxtFudr8cdtWVqif1HuRuz1";
    userId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("user/" + userId + "/education")
      .on("value", async (snapshot) => {
        if (snapshot.val()) updateBooks(snapshot.val());
        else {
          updateBooks([]);
        }
        console.log(snapshot.val());
      });
    firebase
      .database()
      .ref("user/" + userId + "/noOfEducation")
      .on("value", async (snapshot) => {
        setnoOfEducation(snapshot.val());
      });
  }, []);
  const save = async () => {
    console.log("fuck u");

    if (!(college == "" || year == "" || degree == "" || marks == "")) {
      await firebase
        .database()
        .ref("user/" + userId + "/education/" + noOfEducation)
        .update({
          college,
          year,
          degree,
          marks,
        });

      await firebase
        .database()
        .ref("user/" + userId)
        .update({
          noOfEducation: noOfEducation + 1,
        });
    } else {
      console.log("enter proper details");
    }
  };

  return (
    <div className="container mt-3">
      <div className="container card">
        <div className="card-header text-bold">Education</div>
        {books.map((value) => (
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
                <h5 className="card-title mt-3 ml-5">{value.college}</h5>
                <p className="card-text ml-5">Degree: {value.degree}</p>
                <p className="card-text ml-5">Marks: {value.marks}</p>
                <p className="card-text ml-5">Year: {value.year}</p>

                <i className="fa fa-trash-o" aria-hidden="true"></i>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        ))}
        <div>
          <div
            class="modal fade"
            id="gnanesh"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">
                    Your Educational Details
                  </h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-user prefix grey-text"></i>
                    <input
                      type="text"
                      id="form34"
                      class="form-control validate"
                      placeholder="college"
                      value={college}
                      onChange={(e) => {
                        setcollege(e.target.value);
                      }}
                    />
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input
                      type="email"
                      id="form29"
                      class="form-control validate"
                      placeholder="Degree"
                      value={degree}
                      onChange={(e) => {
                        setdegree(e.target.value);
                      }}
                    />
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-tag prefix grey-text"></i>
                    <input
                      type="text"
                      id="form32"
                      class="form-control validate"
                      placeholder="year"
                      value={year}
                      onChange={(e) => {
                        setyear(e.target.value);
                      }}
                    />
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-tag prefix grey-text"></i>
                    <input
                      type="text"
                      id="form32"
                      class="form-control validate"
                      placeholder="CGPA"
                      value={marks}
                      onChange={(e) => {
                        setmarks(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                  <button class="btn btn-unique" onClick={save}>
                    Save <i class="fas fa-paper-plane-o ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <a
              href=""
              class="btn btn-default btn-rounded mb-4"
              data-toggle="modal"
              data-target="#gnanesh"
            >
              Add Education
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
