import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState();
  const [MainMovie, setMainMovie] = useState(null);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([response.results]);
        setMainMovie(response.results[0]);
        console.log(response.results);
        console.log(response.results[0]);
      });
  }, []);
  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* {main img} */}
      {MainMovie && (
        <MainImage
          image={`${IMAGE_URL}w1280${MainMovie.backdrop_path}`}
          title={MainMovie.original_title}
          text={MainMovie.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* movie grid cards */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>More</button>
      </div>
    </div>
  );
}

export default LandingPage;
