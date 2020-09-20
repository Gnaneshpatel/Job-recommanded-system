import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import PicUpload from "./PicUpload";
var userId;
const Editprofile = () => {
  useEffect(() => {
    console.log("s;kdnflsndflknlikn");
    // userId = "3nD20zq4dnd58QWecCQlb66cbTD3";
    userId = firebase.auth().currentUser.uid;
    console.log("user id in profile is ", userId);
  }, []);

  const [name, setname] = useState("");
  const [position, setposition] = useState("");
  const [study, setStudy] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageAsFile, setImageAsFile] = useState("");

  const _handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);
      if (!pickerResult.cancelled) {
        var uploadUrl = await uploadImageAsync(pickerResult.uri);
        await setImage(uploadUrl);
        firebase
          .database()
          .ref("user/" + userId)
          .update({
            profilePhoto: uploadUrl,
          });
      }
    } catch (e) {
      console.log(e);
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
    console.log(imageAsFile);

    await _handleImagePicked(imageAsFile);

    console.log(name, position, study, location, "pressed");
    if (!(name == "" || position == "" || study == "" || location == "")) {
      await firebase
        .database()
        .ref("user/" + userId)
        .update({
          name,
          position,
          study,
          location,
        });
    } else {
      console.log("enter proper details");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="modalContactForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">
                Write to us
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
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              <div className="md-form mb-5">
                <i className="fas fa-envelope prefix grey-text"></i>
                <input
                  type="email"
                  id="form29"
                  className="form-control validate"
                  value={position}
                  placeholder="position"
                  onChange={(e) => setposition(e.target.value)}
                />
              </div>

              <div className="md-form mb-5">
                <i className="fas fa-tag prefix grey-text"></i>
                <input
                  type="text"
                  id="form32"
                  className="form-control validate"
                  value={study}
                  placeholder="study"
                  onChange={(e) => setStudy(e.target.value)}
                />
              </div>

              <div className="md-form mb-5">
                <i className="fas fa-tag prefix grey-text"></i>
                <input
                  type="text"
                  id="form32"
                  className="form-control validate"
                  value={location}
                  placeholder="location"
                  onChange={(e) => setLocation(e.target.value)}
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
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-default"
                data-dismiss="modal"
                onClick={save}
              >
                Save your profile <i className="fas fa-paper-plane-o ml-1"></i>
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
          data-target="#modalContactForm"
        >
          Edit profile
        </a>
      </div>
    </div>
  );
};
export default Editprofile;
