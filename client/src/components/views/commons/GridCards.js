import React from "react";
import { Col } from "antd";

function GridCards(props) {
  //  1col - 24 size
  if (props.landingPage) {
    console.log("gridcards movienames");
    console.log(props.movieName);

    return (
      <Col xxl={3} xl={4} lg={6} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col xxl={2} xl={3} lg={4} md={8} sm={12} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
