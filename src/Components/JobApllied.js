import Card2 from "./Card2";
import React, { useState, useEffect, Fragment } from "react";
import firebase from "firebase";
var userId, details;
var render = [];
var r = [];
var jobs = [];
const JobApllied = () => {
  const [renderJobs, setRenderJobs] = useState([]);
  useEffect(async () => {
    // userId = "1MbWyDxtFudr8cdtWVqif1HuRuz1";
    userId = await firebase.auth().currentUser.uid;
    console.log("userID is fuck", userId);
    firebase
      .database()
      .ref("user/" + userId + "/jobsApplied")
      .on("value", async (snapshot) => {
        if (snapshot.val()) jobs = await snapshot.val();
        for (let i = 0; i < jobs.length; i++) {
          render.push(jobs[i].from);
          console.log(render);
        }
        for (let k = 0; k < render.length; k++) {
          firebase
            .database()
            .ref("user/" + render[k])
            .on("value", async (snapshot) => {
              console.log(snapshot.val());
              details = {
                name: snapshot.val().name,
                photo: snapshot.val().profilePhoto,
                email: snapshot.val().email,
                about: snapshot.val().about,
                location: snapshot.val().location,
              };
              console.log(details);
              r.push(details);
              setRenderJobs((renderJobs) => [...renderJobs, details]);
              console.log(r);
            });
          console.log(r);
        }
      });
  }, []);

  return (
    <div className="text-center">
      <a
        class="btn btn-default"
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Job Applied
      </a>
      <div class="collapse" id="collapseExample">
        <div class="container">
          <div className="container mt-4">
            {/* {renderJobs.map((value) => <span>wfmwe</span>)} */}
            <div className="row mb-3">
              {r.map((value) => {
                console.log(value);
                return (
                  <div className="col-sm-6 col-md-3">
                    <Card2 value={value} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApllied;
