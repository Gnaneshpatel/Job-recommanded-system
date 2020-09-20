import React, { useState } from "react";
import "./Sign.css";
import Base from "./Base";
import { Redirect } from "react-router-dom";

//firebase
import firebase from "firebase";

var type1;
var currentId;
const Signup = () => {
  const [email, setEmail] = useState("");
  const [type1, setType1] = useState("");
  const [error, setError] = useState(true);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [password, setPassword] = useState("");

  const HandleSignUp = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        currentId = res.user.uid;
        setError(false);
        console.log("current id is", currentId);
        await firebase
          .database()
          .ref("user/" + currentId)
          .set({
            email: email,
            type: type1,
            name: name,
            location: location,
            noOfEducation: 0,
            noOfProCerti: 0,
            numberOfSkills: 0,
            noOfJobsApplied: 0,
            numberOfJobs: 0,
            profilePhoto:
              "https://firebasestorage.googleapis.com/v0/b/hackathon-5e066.appspot.com/o/cbfc36d521ce5c93a965a2376727e26aa7a3bb8ce8f50e14fcc2e40abe3e7833.jpg?alt=media&token=c7687de3-fba8-45ad-909e-8b5d64a42a12",
          });
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HandleSignUp();
  };
  if (type1 == "student" && !error) {
    return <Redirect to="/profile" />;
  }
  if (type1 == "company" && !error) {
    console.log("company");
    return <Redirect to="/companyprofile" />;
  }

  return (
    <Base>
      <div className="container mt-5">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <form onSubmit={handleSubmit}>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Email adsress"
                          required
                          autofocus
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="Name"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div class="form-group">
                        <input
                          type="Location"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>

                      <div className="container mb-3">
                        <div class="form-check form-check-inline">
                          <input
                            onClick={() => {
                              setType1("student");
                              console.log(type1);
                            }}
                            type="radio"
                            class="form-check-input"
                            id="materialInline1"
                            name="inlineMaterialRadiosExample"
                          />
                          <label
                            class="form-check-label text-bold"
                            for="materialInline1"
                          >
                            Student
                          </label>
                        </div>

                        <div class="form-check form-check-inline">
                          <input
                            onClick={() => setType1("company")}
                            type="radio"
                            class="form-check-input"
                            id="materialInline2"
                            name="inlineMaterialRadiosExample"
                          />
                          <label class="form-check-label" for="materialInline2">
                            Company
                          </label>
                        </div>
                      </div>

                      <button
                        className="btn btn-lg btn-default btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Signup;
