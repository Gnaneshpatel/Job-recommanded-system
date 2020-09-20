import React, { useState, useEffect, Fragment } from "react";
import firebase from "firebase";
var userId;
const Card = (props) => {
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    // userId = "1MbWyDxtFudr8cdtWVqif1HuRuz1";
    userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("user/" + props.val.id)
      .on("value", async (snapshot) => {
        setPhoto(snapshot.val().profilePhoto);
      });
  }, []);
  const view = () => {
    firebase
      .database()
      .ref("user/" + userId)
      .update({
        userId,
        currentlyViewing: props.val.id,
        currentJob: props.val,
      });
  };
  console.log(props.val.id);
  return (
    <Fragment>
      <div className="card card-cascade wider mb-3">
        <div className="view view-cascade overlay">
          <img
            className="card-img-top"
            src={
              photo
                ? photo
                : "https://mdbootstrap.com/img/Photos/Others/photo6.jpg"
            }
            alt="Card image cap"
          />
          <a href="#!">
            <div className="mask rgba-white-slight"></div>
          </a>
        </div>

        <div className="card-body card-body-cascade text-center">
          <h4 className="card-title">
            <strong>{props.val.name}</strong>
          </h4>
          <h5 className="blue-text pb-2">
            <strong>{props.val.skills}</strong>
          </h5>
          <p className="card-text">{props.val.description}</p>
          <a href="/companyprofile2">
            <button
              type="button"
              class="btn btn-outline-info waves-effect"
              onClick={view}
            >
              More Info
            </button>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export { Card };
