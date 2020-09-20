import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Card1 from "./Card1";
var ids = [];
var userId;
const CandidateApplied = (props) => {
  const [jobs, setJobs] = useState([]);
  const [cand, setcand] = useState([]);

  useEffect(() => {
    console.log("props are", props);
    userId = firebase.auth().currentUser.uid;
    // userId = "3nD20zq4dnd58QWecCQlb66cbTD3";
    // firebase
    //   .database()
    //   .ref("user/" + userId)
    //   .on("value", async (snapshot) => {
    // await setJobs(snapshot.val().jobs);
    // for (let k = 0; k < snapshot.val().jobs.length; k++) {
    // ids.push(jobs[k].aa)
    // }
    // });
  });
  const renderCandidates = () => {
    console.log(
      "lksmksmdfp;masdpomaspdf",
      props.job.numberOfApplied,
      props.job.numberOfApplied > 0
    );
    if (props.job.numberOfApplied > 0) {
      console.log("sddfsf" + props.job.applied);
      let tempo = props.job.applied;
      tempo.sort((a, b) => (a.score > b.score ? 1 : -1));
      return setcand(tempo);
    } else return setcand([]);
  };
  return (
    <div className="text-center">
      <a
        // class="btn btn-default"
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <button
          type="button"
          class="btn btn-outline-info waves-effect"
          onClick={renderCandidates}
        >
          Candidates Applied
        </button>
      </a>

      <div class="collapse" id="collapseExample">
        <div class="container">
          <div className="container mt-4">
            <div className="row mb-3">
              {cand.map((value) => {
                console.log("card is", value);
                return (
                  <div className="col-md-3 col-sm-6">
                    <Card1 candidate={value} />
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

export default CandidateApplied;
