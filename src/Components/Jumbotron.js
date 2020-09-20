import React, { Fragment } from "react";

const Jumbotron = () => {
  return (
    <Fragment>
      <div className="container p-auto">
        <div class="jumbotron card card-image back">
          <div class="text-white text-center py-5 px-4">
            <div>
              <h2 class="card-title h1-responsive pt-3 mb-5 font-bold">
                <strong>Job Recommender System</strong>
              </h2>
              <p class="mx-5 mb-5">
                Aim is to come up with a job recommender system, which takes the
                skills from LinkedIn and jobs from Indeed and throws the best
                jobs available for you according to your skills.{" "}
              </p>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <a className="text-white" href="/signin">
                      {" "}
                      <button
                        className="btn btn-lg btn-secondary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a className="text-white" href="/signup">
                      {" "}
                      <button
                        className="btn btn-lg btn-secondary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign up
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Jumbotron;
