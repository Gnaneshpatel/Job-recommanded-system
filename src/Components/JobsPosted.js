import React, { useState, useEffect } from "react";
import firebase from "firebase";
import CandidateApplied from "./CandidateApplied";

var userId, numberOfJobs;
const JobsPosted = () => {
  const [skills, renderSkills] = useState([]);
  const deleteJob = (value) => {
    skills.indexOf(value);
    skills.splice(skills.indexOf(value), 1);
    firebase
      .database()
      .ref("user/" + userId)
      .update({
        jobs: skills,
      });
    firebase
      .database()
      .ref("user/" + userId)
      .update({
        numberOfJobs: numberOfJobs - 1,
      });
  };
  useEffect(() => {
    userId = firebase.auth().currentUser.uid;

    // userId = "3nD20zq4dnd58QWecCQlb66cbTD3";
    firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        await renderSkills(snapshot.val().jobs);
        console.log(snapshot.val().jobs, "fgfghfgh");
      });
    firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        numberOfJobs = snapshot.val().numberOfJobs;
        console.log(numberOfJobs);
      });
  }, []);

  const ren = () => {
    console.log(skills);
    if (skills) {
      return skills.map((value) => {
        console.log(value);
        return (
          <div className="container card mt-3 mb-3">
            <ul className="list-group mb-3 mt-3">
              <li class="list-group-item">Description: {value.description}</li>
              <li class="list-group-item">Salary: {value.salary}</li>
              <li class="list-group-item">Skills: {value.skills}</li>
            </ul>
            <div className="conteiner d-inline-flex justify-content-center">
              <button
                className="btn btn-default"
                onClick={() => deleteJob(value)}
              >
                Delete
              </button>

              <button className="btn btn-default">Update</button>
            </div>
            <div className="container text-center">
              <CandidateApplied job={value} />
            </div>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  };
  return ren();
};
export default JobsPosted;
