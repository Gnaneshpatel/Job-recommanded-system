import React, { Fragment } from "react";
import "./Home.css";

const Crousel = () => {
  return (
    <Fragment>
      <div className="container p-auto">
        <div
          id="carousel-example-2"
          className="carousel slide carousel-fade "
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carousel-example-2"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carousel-example-2" data-slide-to="1"></li>
            <li data-target="#carousel-example-2" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <div className="view">
                <img
                  className="crousel-img"
                  src="https://miro.medium.com/max/11328/1*AvUpREMP85amQcVoNKntfw.jpeg"
                  alt="First slide"
                />
                <div className="mask rgba-black-light"></div>
              </div>
              <div className="carousel-caption">
                <h3 className="h3-responsive">Light mask</h3>
                <p>First text</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="view">
                <img
                  className="crousel-img"
                  src="https://miro.medium.com/max/2880/1*h3UULY5xTPvZ4ue7m7Yvfw.jpeg"
                  alt="Second slide"
                />
                <div className="mask rgba-black-strong"></div>
              </div>
              <div className="carousel-caption">
                <h3 className="h3-responsive">Strong mask</h3>
                <p>Secondary text</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="view">
                <img
                  className="crousel-img"
                  src="https://www.agileit.com/wp-content/uploads/2019/06/iStock-998334492.jpg"
                  alt="Third slide"
                />
                <div className="mask rgba-black-slight"></div>
              </div>
              <div className="carousel-caption">
                <h3 className="h3-responsive">Slight mask</h3>
                <p>Third text</p>
              </div>
            </div>
          </div>

          <a
            className="carousel-control-prev"
            href="#carousel-example-2"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carousel-example-2"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Crousel;
