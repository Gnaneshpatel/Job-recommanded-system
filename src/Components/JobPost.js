import React, { useState, useEffect } from "react";
import firebase from "firebase";
var userId;
var numberOfJobs;
const JobPost = () => {
  const [skills, setskills] = useState("");
  const [salary, setsalary] = useState("");
  const [add_skills, setadd_skills] = useState("");
  const [totalNumberOfJobs, settotal] = useState("");

  useEffect(() => {
    userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        numberOfJobs = snapshot.val().numberOfJobs;
        console.log(numberOfJobs);
      });
    firebase
      .database()
      .ref("totalNumberOfJobs/totalNumberOfJobs")
      .on("value", async (snapshot) => {
        await settotal(snapshot.val());
        console.log(snapshot.val());
      });

    // firebase
    //   .database()
    //   .ref("user/" + userId + '/' + numberOfJobs)
    //   .on("value", async (snapshot) => {
    //     setskills(snapshot.val().skills);
    //     setsalary(snapshot.val().salary);
    //     setadd_skills(snapshot.val().add_skills);
    //   });
  }, []);

  const save = async () => {
    if (!(skills == "" || salary == "" || add_skills == "")) {
      console.log(
        "numberOfJobs",
        numberOfJobs,
        "totalNumberOfJobs",
        totalNumberOfJobs
      );
      await firebase
        .database()
        .ref("user/" + userId + "/jobs/" + numberOfJobs)
        .update({
          skills,
          salary,
          numberOfApplied: 0,
          description: add_skills,
        });
      console.log("object");
      await firebase
        .database()
        .ref("jobs/" + totalNumberOfJobs)
        .update({
          jobId: totalNumberOfJobs,
          skills,
          salary,
          description: add_skills,
          id: userId,
        });
      console.log("object", numberOfJobs);

      firebase
        .database()
        .ref("user/" + userId)
        .update({
          numberOfJobs: numberOfJobs + 1,
        });

      await firebase
        .database()
        .ref("totalNumberOfJobs")
        .update({ totalNumberOfJobs: totalNumberOfJobs + 1 });
    } else {
      console.log("enter proper details");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="sumo"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">
                post your jobs
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <div className="md-form mb-5">
                <i className="fas fa-user prefix grey-text"></i>
                <input
                  type="text"
                  id="form34"
                  className="form-control validate"
                  placeholder="Skills require "
                  value={skills}
                  onChange={(e) => setskills(e.target.value)}
                />
              </div>

              <div className="md-form mb-5">
                <i className="fas fa-tag prefix grey-text"></i>
                <input
                  type="text"
                  id="form32"
                  className="form-control validate"
                  placeholder="Salary "
                  value={salary}
                  onChange={(e) => setsalary(e.target.value)}
                />
              </div>

              <div className="md-form">
                <i className="fas fa-pencil prefix grey-text"></i>
                <textarea
                  type="text"
                  id="form8"
                  className="md-textarea form-control"
                  rows="4"
                  placeholder="Discription"
                  value={add_skills}
                  onChange={(e) => setadd_skills(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-default"
                data-dismiss="modal"
                onClick={save}
              >
                Post Job <i className="fas fa-paper-plane-o ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a
          href=""
          className="btn btn-default btn-rounded mb-4"
          data-toggle="modal"
          data-target="#sumo"
        >
          post jobs
        </a>
      </div>
    </div>
  );
};

export default JobPost;
