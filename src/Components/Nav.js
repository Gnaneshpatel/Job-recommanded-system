import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase, { database } from "firebase";

var userId;
var x;
const Nav = () => {
  const [userId, setUserId] = useState();
  const [data, setData] = useState({});
  useEffect(() => {
    console.log("called");
    firebase.auth().onAuthStateChanged(function (user) {
      setUserId(user.uid);
      firebase
        .database()
        .ref("user/" + user.uid)
        .on("value", (snapshot) => {
          setData(snapshot.val());
          console.log("called", data);
        });
    });
    console.log(userId);
  }, []);

  const signOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("signout successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-default">
        <a className="navbar-brand" href="#">
          JobMatch
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav mr-auto">
            <li class="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {userId ? (
              <div></div>
            ) : (
              <li class="nav-item ">
                <a className="nav-link" href="/signin">
                  signin
                </a>
              </li>
            )}
            {userId ? (
              <div></div>
            ) : (
              <li class="nav-item ">
                <a className="nav-link" href="/signup">
                  signup
                </a>
              </li>
            )}
            {data.type == "student" ? (
              <li class="nav-item ">
                <a className="nav-link" href="/jobs">
                  Jobs
                </a>
              </li>
            ) : (
              <div></div>
            )}
            {console.log(data)}
            {data.type == "company" ? (
              <li class="nav-item ">
                <a className="nav-link" href="/students">
                  Candidates
                </a>
              </li>
            ) : (
              <div></div>
            )}

            {userId ? (
              <li class="nav-item ">
                <a className="nav-link" href="/" onClick={signOut}>
                  signOut
                </a>
              </li>
            ) : (
              <div></div>
            )}
          </ul>

          <form className="form-inline">
            <div className="md-form my-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
