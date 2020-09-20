import React from "react";

const Card2 = (props) => {
  return (
    <div className="card card-cascade wider mb-3">
      <div className="view view-cascade overlay">
        <img
          className="card-img-top"
          src={props.value.photo}
          alt="Card image cap"
        />
        <a href="#!">
          <div className="mask rgba-white-slight"></div>
        </a>
      </div>

      <div className="card-body card-body-cascade text-center">
        <h4 className="card-title">
          <strong>{props.value.name}</strong>
        </h4>
        <h5 className="blue-text pb-2">
          <strong>{props.value.about}</strong>
        </h5>
        <p className="card-text">
          {props.value.location} {props.value.email}{" "}
        </p>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          More Info
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
                  Company Profile
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
              <div class="modal-body">
                <div className="container mt-5 mb-5">
                  <div className="card testimonial-card">
                    <div className="card-up indigo lighten-1"></div>
                    <div className="avatar mx-auto white ">
                      <img
                        src={props.value.profilePhoto}
                        className="rounded-circle mt-3 profile"
                        alt="woman avatar"
                      />
                    </div>

                    <div className="card-body text-center">
                      <h4 className="card-title">{props.value.name}</h4>
                      <hr />
                      <p>{props.value.location} </p>
                      <hr />
                      <p>{props.value.about} </p>
                      <hr />
                      <p>{props.value.email} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;
