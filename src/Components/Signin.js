import React, { useState, useContext } from "react";
import "./Sign.css";
import Base from "./Base";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("nothing");
  const HandleSignIn = () => {
    console.log("HEYYYYY");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log("ldnsfkljasndfkjasndlfjnasldjfn");
        var userId = await firebase.auth().currentUser.uid;
        await firebase
          .database()
          .ref("user/" + userId)
          .on("value", async (snapshot) => {
            setType(snapshot.val().type);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (type == "student") return <Redirect to="/profile" />;
  if (type == "company") return <Redirect to="/companyprofile" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    HandleSignIn();
  };

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
                          autofocus
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          for="customCheck1"
                        >
                          Remember password
                        </label>
                      </div>
                      <button
                        className="btn btn-lg btn-default btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <a className="small" href="#">
                          Forgot password?
                        </a>
                      </div>
                      <div className="text-center mt-3 mb-3 other-heading">
                        Or
                      </div>
                      <div className="default-color btn-login">
                        <div className="container">
                          <div className="row py-2 d-flex align-items-center">
                            <div className="col-md-12 text-center">
                              <a href="#">
                                <i className="fab fa-facebook-f white-text mr-4">
                                  {" "}
                                </i>
                              </a>
                              <a href="#">
                                <i className="fab fa-google-plus-g white-text mr-4">
                                  {" "}
                                </i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Signin;
