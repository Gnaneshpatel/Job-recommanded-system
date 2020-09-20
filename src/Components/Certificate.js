import React, { useState, useEffect } from "react";
import "./Home.css";
import firebase from "firebase";
var userId;
const Certificate = () => {
  const [course, setcourse] = useState("");
  const [demo, setdemo] = useState("");
  // const [noOfProCerti, setNoOfProCerti] = useState(-1);
  const [organization, setorganization] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [time1, settime1] = useState(-1);
  const [imageAsFile, setImageAsFile] = useState("");
  const [noOfProCerti, setnoOfProCerti] = useState(-1);
  const [date1, setdate1] = useState("");
  const [books, updateBooks] = React.useState([]);
  const [uploading, setUploading] = useState(false);
  const [score, setScore] = useState(-1);

  // useEffect(async () => {
  //   console.log("s;kdnflsndflknlikn");
  //   userId = "1MbWyDxtFudr8cdtWVqif1HuRuz1";
  //   // userId = firebase.auth().currentUser.uid;
  //   console.log("user id in profile is ", userId);
  //   await firebase
  //     .database()
  //     .ref("user/" + userId + "/procerti")
  //     .on("value", async (snapshot) => {
  //       setProject(snapshot.val());
  //       console.log(project);
  //     });
  // }, []);
  useEffect(() => {
    // userId = "1MbWyDxtFudr8cdtWVqif1HuRuz1";
    userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("user/" + userId + "/procerti")
      .on("value", async (snapshot) => {
        if (snapshot.val()) updateBooks(snapshot.val());
        else {
          updateBooks([]);
        }
        console.log(snapshot.val());
      });
    firebase
      .database()
      .ref("user/" + userId + "/noOfProCerti")
      .on("value", async (snapshot) => {
        setnoOfProCerti(snapshot.val());
      });
    firebase
      .database()
      .ref("user/" + userId + "/score")
      .on("value", async (snapshot) => {
        setScore(snapshot.val());
      });

    // userId = await firebase.auth().currentUser.uid;

    // firebase
    //   .database()
    //   .ref("totalNumberOfJobs/totalNumberOfJobs")
    //   .on("value", async (snapshot) => {
    //     await settotal(snapshot.val());
    //     console.log(snapshot.val());
    //   });

    // firebase
    //   .database()
    //   .ref("user/" + userId + '/' + numberOfJobs)
    //   .on("value", async (snapshot) => {
    //     setskills(snapshot.val().skills);
    //     setsalary(snapshot.val().salary);
    //     setadd_skills(snapshot.val().add_skills);
    //   });
  }, []);

  const _handleImagePicked = async (pickerResult) => {
    console.log(pickerResult);
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        var uploadUrl = await uploadImageAsync(pickerResult.uri);
        console.log(uploadUrl);
        firebase
          .database()
          .ref("user/" + userId + "/procerti/" + noOfProCerti)
          .update({
            profilePhoto: uploadUrl,
          });
      }
    } catch (e) {
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(true);
    }
  };
  const uploadImageAsync = async (uri) => {
    const ref = firebase.storage().ref().child(imageAsFile.name);
    const snapshot = await ref.put(imageAsFile);
    return await snapshot.ref.getDownloadURL();
  };
  const handleImageAsFile = async (e) => {
    const image = e.target.files[0];
    await setImageAsFile((imageFile) => image);
  };

  const save = async () => {
    console.log("fuck u");

    await firebase
      .database()
      .ref("user/" + userId + "/noOfProCerti")
      .on("value", async (snapshot) => {
        await settime1(snapshot.val());
        console.log(snapshot.val());
      });
    console.log(
      "course",
      course,
      "organization",
      organization,
      "Date",
      date,
      "time",
      time
    );
    if (!(course == "" || organization == "" || date == "" || time == "")) {
      await firebase
        .database()
        .ref("user/" + userId + "/procerti/" + noOfProCerti)
        .update({
          course,
          organization,
          date,
          time,
        });

      await firebase
        .database()
        .ref("user/" + userId)
        .update({
          noOfProCerti: noOfProCerti + 1,
          score: score + 1,
        });
    } else {
      console.log("enter proper details");
    }
    await _handleImagePicked(imageAsFile);
  };
  const delete1 = (value) => {
    books.splice(books.indexOf(value), 1);
    firebase
      .database()
      .ref("user/" + userId)
      .update({
        procerti: books,
      });
    firebase
      .database()
      .ref("user/" + userId)
      .update({
        noOfProCerti: noOfProCerti - 1,
      });
    // console.log(value);
  };
  return (
    <div className="container mt-3">
      <div className="container card">
        <div className="card-header text-bold">Certificate</div>
        {books.map((value) => {
          console.log("books", books);
          return (
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="avatar mx-auto white">
                    <img
                      src={value.profilePhoto}
                      className="rounded-circle edu"
                      alt="woman avatar"
                    />
                  </div>
                </div>

                <div className="col-md-9">
                  <h5 className="card-title mt-3 ml-5">
                    Course Name : {value.course}
                  </h5>
                  <p className="card-text ml-5">
                    Organization Name : {value.organization}
                  </p>
                  <p className="card-text ml-5">Date : {value.date}</p>
                  <p className="card-text ml-5">Time Period : {value.time}</p>
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
              </div>
              <div className="container text-center">
                <button
                  className="btn btn-default"
                  onClick={() => delete1(value)}
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          );
        })}
        <div>
          <div
            class="modal fade"
            id="hetan"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <h4 class="modal-title w-100 font-weight-bold">
                    Your Certification Details
                  </h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body mx-3">
                  <div class="md-form mb-5">
                    <i class="fas fa-user prefix grey-text"></i>
                    <input
                      type="text"
                      id="form34"
                      class="form-control validate"
                      placeholder="Name"
                      value={course}
                      onChange={(e) => setcourse(e.target.value)}
                    />
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <input
                      type="email"
                      id="form29"
                      class="form-control validate"
                      placeholder="Organization"
                      value={organization}
                      onChange={(e) => setorganization(e.target.value)}
                    />
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-tag prefix grey-text"></i>
                    <input
                      type="text"
                      id="form32"
                      class="form-control validate"
                      placeholder="Joing Date"
                      value={date}
                      onChange={(e) => setdate(e.target.value)}
                    />
                  </div>

                  <div class="md-form mb-5">
                    <i class="fas fa-tag prefix grey-text"></i>
                    <input
                      type="text"
                      id="form32"
                      class="form-control validate"
                      placeholder="Tine Period"
                      value={time}
                      onChange={(e) => settime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="container">
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="inputGroupFile04"
                        onChange={handleImageAsFile}
                      />
                      <label class="custom-file-label" for="inputGroupFile04">
                        {imageAsFile ? imageAsFile.name : "Choose file"}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="modal-footer d-flex justify-content-center">
                  <button class="btn btn-default" onClick={save}>
                    Save <i class="fas fa-paper-plane-o ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="container text-center mb-5 mt-5">
            <a
              href=""
              class="btn btn-default btn-rounded"
              data-toggle="modal"
              data-target="#hetan"
            >
              Add Certifficate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
