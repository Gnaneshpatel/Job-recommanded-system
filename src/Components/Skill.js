import React, { useState, useEffect } from "react";
import firebase from "firebase";
var userId;
var skills = [];
var temp = [];
var finalSkills = [];
var numberOfSkills, score;
var skillArray = [];
const Skill = () => {
  const [skill, setskill] = useState([]);
  const [finalSkill, setFinalSkill] = useState([]);
  useEffect(async () => {
    // userId = "1MbWyDxtFudr8cdtWVqif1HuRuz1";
    userId = firebase.auth().currentUser.uid;
    console.log("user id in profile is ", userId);
    await firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        numberOfSkills = await snapshot.val().numberOfSkills;
        console.log(snapshot.val().skills);
        if (snapshot.val().skills) skillArray = await snapshot.val().skills;
        else {
          skillArray = [];
        }
        console.log(skillArray);
        await setFinalSkill(skillArray);
        console.log(finalSkills);
      });
  }, []);
  const remove = async (value) => {
    console.log(finalSkill);
    let index = finalSkill.indexOf(value);
    if (index != -1) finalSkill.splice(index, 1);
    // var ref = await firebase
    //   .database()
    //   .ref("user/" + userId + "skills/" + index);
    // console.log(ref, "reference");
    await firebase
      .database()
      .ref("user/" + userId)
      .update({
        numberOfSkills: numberOfSkills - 1,
      });
    await firebase
      .database()
      .ref("user/" + userId + "/" + skills)
      .update({
        skills: finalSkill,
      });

    console.log(finalSkill);
  };
  const renderSkills = () => {
    // setFinalSkill([]);
    console.log("finally", finalSkill);
    return finalSkill.map((value) => (
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <li class="list-group-item">{value.skill}</li>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-default" onClick={() => remove(value)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    ));
  };
  const addSkill = async () => {
    await firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        numberOfSkills = snapshot.val().numberOfSkills;
        score = snapshot.val().score;
      });

    console.log(numberOfSkills);
    await firebase
      .database()
      .ref("user/" + userId + "/skills/" + numberOfSkills)
      .update({ skill });
    await firebase
      .database()
      .ref("user/" + userId)
      .update({
        numberOfSkills: numberOfSkills + 1,
      });
    await firebase
      .database()
      .ref("user/" + userId)
      .update({
        score: score + 1,
      });
  };
  return (
    <div className="container">
      <div className="container card mt-4 mb-4">
        <div className="container">
          <div class="md-form">
            <div className="container">
              <div className="row">
                <div className="col-md-10">
                  <input
                    type="text"
                    id="form1"
                    class="form-control"
                    placeholder="Add Skills"
                    value={skill}
                    onChange={(e) => setskill(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-default" onClick={addSkill}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ul class="list-group mb-3">{renderSkills()}</ul>
        </div>
      </div>
    </div>
  );
};

export default Skill;
