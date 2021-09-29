import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../../Config";

const MovieDetail = (props) => {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
  }, []);
  return (
    <div>
      {/* header */}

      {/* body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* movie info */}
        <br />
        {/* actor grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        ></div>
      </div>
    </div>
  );
};

export default MovieDetail;
