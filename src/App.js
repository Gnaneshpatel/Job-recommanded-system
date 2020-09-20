import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import Jobs from "./Components/Jobs";
import Students from "./Components/Students";
import CompanyProfile from "./Components/CompanyProfile";
import CompanyProfile2 from "./Components/CompanyProfile2";

//firebase
import firebase from "firebase";
import StudentProfile2 from "./Components/StudentProfile2";
var firebaseConfig = {
  apiKey: "AIzaSyBdnO1BQPoAL0sOuM_71q8h238tiJa-P-A",
  authDomain: "hackathon-5e066.firebaseapp.com",
  databaseURL: "https://hackathon-5e066.firebaseio.com",
  projectId: "hackathon-5e066",
  storageBucket: "hackathon-5e066.appspot.com",
  messagingSenderId: "886336054274",
  appId: "1:886336054274:web:52ad626e5aa6608dbab31b",
  measurementId: "G-M14QE2KDSJ",
};
firebase.initializeApp(firebaseConfig);

//import firebaseConfig from "./Components/FirebaseConfig";
//init firebase
// var firebaseConfig = {
//   apiKey: "AIzaSyBdnO1BQPoAL0sOuM_71q8h238tiJa-P-A",
//   authDomain: "hackathon-5e066.firebaseapp.com",
//   databaseURL: "https://hackathon-5e066.firebaseio.com",
//   projectId: "hackathon-5e066",
//   storageBucket: "hackathon-5e066.appspot.com",
//   messagingSenderId: "886336054274",
//   appId: "1:886336054274:web:52ad626e5aa6608dbab31b",
//   measurementId: "G-M14QE2KDSJ"
// };
// firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/jobs" exact component={Jobs} />
        <Route path="/companyprofile2" exact component={CompanyProfile2} />
        <Route path="/students" exact component={Students} />
        <Route path="/studentsprofile" exact component={StudentProfile2} />
        <Route path="/companyprofile" exact component={CompanyProfile} />


      </Switch>
    </Router>
  );
};

export default App;
