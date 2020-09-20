import React, { useState, useContext, useEffect } from "react";
import Editprofile from "./Editprofile";
import firebase from "firebase";
import "./avtar.css";
import JobApllied from "./JobApllied";
var skills = ["hetan", "thakkar", "vraj"];
var temp1 = [];

const ProfileCard = () => {
  const [name, setName] = useState("Update Name");
  const [position, setPosition] = useState("Update Position");
  const [study, setStudy] = useState("Update study");
  const [location, setLocation] = useState("Update Location");
  const [profilePhoto, setProfiePhoto] = useState("");
  const [result, setResult] = useState([]);

  useEffect(async () => {
    var userId = await firebase.auth().currentUser.uid;
    // var userId = "3nD20zq4dnd58QWecCQlb66cbTD3";
    await firebase
      .database()
      .ref("user/" + userId)
      .on("value", async (snapshot) => {
        setName(snapshot.val().name);
        setPosition(snapshot.val().position);
        setLocation(snapshot.val().location);
        setStudy(snapshot.val().study);
        setProfiePhoto(snapshot.val().profilePhoto);
        console.log(name);
      });

    // console.log("user id in profile is ", userId);
  }, []);
  const searchbar = (value) => {
    console.log("object");
    var skill = skills;
    setResult(skill.filter((skill) => skill.toLowerCase().includes(value)));
    console.log(skill);
  };
  return (
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
          <h4 className="card-title">Name : {name}</h4>
          <hr />
          <p>Location : {location} </p>
          <hr />
          <p>Education : {study} </p>
          <hr />
          <p>Position : {position} </p>
        </div>

        <Editprofile />
        <JobApllied />
      </div>
    </div>
  );
};

export default ProfileCard;
