import Base from "./Base";
import { Card } from "./Card";
import Search from "./Search";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
var userId, ma;
var skills = [];
var final1 = [];
var description = [];
var jobify = [];
var count = 0;
// var userId = firebase.auth().currentUser;
// var firebaseConfig = {
//   apiKey: "AIzaSyBdnO1BQPoAL0sOuM_71q8h238tiJa-P-A",
//   authDomain: "hackathon-5e066.firebaseapp.com",
//   databaseURL: "https://hackathon-5e066.firebaseio.com",
//   projectId: "hackathon-5e066",
//   storageBucket: "hackathon-5e066.appspot.com",
//   messagingSenderId: "886336054274",
//   appId: "1:886336054274:web:52ad626e5aa6608dbab31b",
//   measurementId: "G-M14QE2KDSJ",
// };
// firebase.initializeApp(firebaseConfig);
const Jobs = () => {
  const [jobs, renderJobs] = useState([]);
  const [flag, setFlag] = useState(false);
  const [match1, setMatch] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      userId = user.uid;
      console.log(user.uid);
      firebase
        .database()
        .ref("user/" + user.uid)
        .on("value", async (snapshot) => {
          console.log(snapshot.val().skills);
          snapshot.val().skills ? (count = snapshot.val().skills) : (count = 0);
          for (let k = 0; k < count; k++) {
            // console.log(snapshot.val().skills[k].skill);
            skills.push(snapshot.val().skills[k].skill);
            description.push(snapshot.val().skills[k].description);
            console.log(skills);
          }
          firebase
            .database()
            .ref("jobs")
            .on("value", async (snapshot) => {
              if (snapshot.val()) {
                var match = snapshot.val();
                setMatch(match);
                console.log(match, skills);
                for (let x = 0; x < skills.length; x++) {
                  for (let j = 0; j < match.length; j++)
                    if (
                      match[j].skills.includes(skills[x]) ||
                      match[j].skills.includes(description[x])
                    )
                      jobify.push(match[j]);
                  console.log(skills);
                }
                console.log(jobify);
                console.log(final1);
                await renderJobs(jobify);
              } else await renderJobs([]);
            });
        });
      // console.log(userId);
    });
    // console.log(skills);
  }, []);
  const renderOther = () => {
    console.log(match1);
    let others = match1;
    for (let i = 0; i < others.length; i++) {
      for (let g = 0; g < jobify.length; g++)
        if (others[i] == jobify[g]) others.splice(jobify[g], 1);
    }

    console.log(others, jobify);
    return others.map((value) => (
      <div className="col-md-3 col-sm-6">
        <Card val={value} userId={userId} />
      </div>
    ));
  };
  return (
    <Base>
      <div className="container">
        <div className="container page header mb-3 mt-3">
          <h2>Your Matches</h2>
          <hr />
        </div>
        <div className="row mb-3 ">
          {jobs.map((value) => (
            <div className="col-md-3 col-sm-6">
              <Card val={value} userId={userId} />
            </div>
          ))}
        </div>
        <div className="container page header mb-3">
          <h2>Other Matches</h2>
          <hr />
        </div>
        <div className="row mb-3 ">{renderOther()}</div>
      </div>
    </Base>
  );
};

export default Jobs;
