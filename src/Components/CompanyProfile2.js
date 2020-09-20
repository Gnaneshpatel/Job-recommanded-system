import React, { useState, useContext, useEffect } from "react";
import firebase from "firebase";
import "./avtar.css";
import Base from "./Base";
var temp, currentJob, job, numberOfApplied, index1, noOfJobsApplied, userId;
var x = [];
var flag = [];
var repeated = [];
const CompanyProfile2 = (props) => {
  const [name, setName] = useState("Update Name");
  const [view, setView] = useState("");
  const [error1, setError] = useState(true);
  const [about, setabout] = useState("");
  const [website, setwebsite] = useState("");
  const [location, setLocation] = useState("Update Location");
  const [profilePhoto, setProfiePhoto] = useState("");
  const [applied, setApplied] = useState([]);

  useEffect(async () => {
    console.log(userId);
    firebase.auth().onAuthStateChanged(function (user) {
      userId = user.uid;
    });
    // console.log("userid is", userId);
    await firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        await firebase
          .database()
          .ref("user/" + userId)
          .on("value", async (snapshot) => {
            temp = snapshot.val().currentlyViewing;
            noOfJobsApplied = snapshot.val().noOfJobsApplied;
            await setView(snapshot.val().currentlyViewing);
            firebase
              .database()
              .ref("user/" + temp)
              .on("value", async (snapshot) => {
                console.log(snapshot.val());
                setName(snapshot.val().name);
                setwebsite(snapshot.val().website);
                setLocation(snapshot.val().location);
                setabout(snapshot.val().about);
                setProfiePhoto(snapshot.val().profilePhoto);
                console.log("temp is", temp);
              });

            console.log(snapshot.val().currentlyViewing);
          });
      });
    // userId = "kQAHbFKHlJfXi4Sc1fSBWzVUSaX2";
    await firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        temp = snapshot.val().currentlyViewing;
        // userId = snapshot.val().userId;
        noOfJobsApplied = snapshot.val().noOfJobsApplied;
        await setView(snapshot.val().currentlyViewing);
        firebase
          .database()
          .ref("user/" + temp)
          .on("value", async (snapshot) => {
            console.log(snapshot.val());
            setName(snapshot.val().name);
            setwebsite(snapshot.val().website);
            setLocation(snapshot.val().location);
            setabout(snapshot.val().about);
            setProfiePhoto(snapshot.val().profilePhoto);
            console.log("temp is", temp);
          });

        console.log(snapshot.val().currentlyViewing);
      });

    // console.log("user id in profile is ", userId);
  }, []);
  const apply = async () => {
    firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        // var jobs = snapshot.val().jobs
        currentJob = snapshot.val().currentJob;
        console.log("current job is", currentJob);
        delete currentJob.id;
        delete currentJob.jobId;
        // await console.log(snapshot.val().currentJob)
      });

    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (!firebaseUser) {
        console.log("user not found");
      } else {
        firebaseUser
          .sendEmailVerification()
          .then(function () {
            console.log("mail sent successfully");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });

    firebase
      .database()
      .ref("user/" + temp)
      .on("value", async (snapshot) => {
        // console.log(currentJob)
        job = snapshot.val().jobs;
        console.log("jobs is ", job);
        // numberOfApplied = snapshot.val().numberOfApplied
        // var index = job.includes(currentJob)
        for (let i = 0; i < job.length; i++)
          if (job[i].description === currentJob.description) var index = i;
        index1 = index;
        console.log(index1);
        firebase
          .database()
          .ref("user/" + temp + "/jobs/" + index)
          .on("value", async (snapshot) => {
            console.log(snapshot.val(), index);
            numberOfApplied = snapshot.val().numberOfApplied;
            await console.log(snapshot.val().numberOfApplied);
          });

        // await console.log(index, job[0], currentJob)
        console.log(index1, userId, index1, numberOfApplied);
      });
    firebase
      .database()
      .ref("user/" + temp + "/jobs" + "/" + index1 + "/applied/")
      .on("value", async (snapshot) => {
        console.log("snap is", snapshot.val());
        if (snapshot.val()) x.push(snapshot.val());
        if (!snapshot.val()) flag = [];
        else flag = snapshot.val();
        for (let i = 0; i < flag.length; i++) {
          repeated.push(snapshot.val()[i]?.userId);
        }
        console.log(repeated, userId, repeated.includes(userId));
        if (!repeated.includes(userId)) {
          setError(false);
          await firebase
            .database()
            .ref(
              "user/" +
                temp +
                "/jobs" +
                "/" +
                index1 +
                "/applied/" +
                numberOfApplied
            )
            .update({
              userId,
            });
          await firebase
            .database()
            .ref("user/" + temp + "/jobs" + "/" + index1)
            .update({
              numberOfApplied: numberOfApplied + 1,
            });
          await firebase
            .database()
            .ref("user/" + userId + "/jobsApplied/" + noOfJobsApplied)
            .update({
              jobs: currentJob,
              from: temp,
            });
          await firebase
            .database()
            .ref("user/" + userId)
            .update({
              noOfJobsApplied: noOfJobsApplied + 1,
            });
        } else setError(true);
        console.log(error1);
        setApplied(x);
        console.log("x is", repeated);
        // await console.log(snapshot.val().numberOfApplied)
      });
    // for (let i = 0; i < x.length; i++) {
    //   console.log(x[i], userId);
    //   if (x[i].userId == userId) {
    //     console.log("entered");
    //     setError(true);
    //   }
    // }
    // if (!error1) {
    //   console.log("elnoinvoienvoeivnnvoleifnvhoi");
    // }
  };

  return (
    <Base>
      <div className="container mt-5 mb-5">
        <div className="card testimonial-card">
          <div className="card-up indigo lighten-1"></div>

          <div className="avatar mx-auto white ">
            <img
              src={
                profilePhoto
                  ? profilePhoto
                  : "https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
              }
              className="rounded-circle mt-3 profile"
              alt="woman avatar"
            />
          </div>

          <div className="card-body text-center">
            <h4 className="card-title">{name}</h4>
            <hr />
            <p>{location} </p>
            <hr />
            <p>{about} </p>
            <hr />
            <p>{website} </p>
          </div>

          <div className="container text-center">
            <button
              className="btn btn-default"
              onClick={apply}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Apply
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {error1 ? "Already Applied" : "Applied Succesfully"}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default CompanyProfile2;
