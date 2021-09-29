import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
function LandingPage() {
  // 20 movie info per req
  const [Movies, setMovies] = useState([]);
  const [MainMovie, setMainMovie] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // spread notation
        setMovies([...Movies, ...response.results]);
        setMainMovie(response.results[0]);
        setCurrentPage(response.page);
        console.log(response.results);
        console.log(response.results[0]);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };
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
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>More</button>
      </div>
    </div>
  );
}

export default LandingPage;
