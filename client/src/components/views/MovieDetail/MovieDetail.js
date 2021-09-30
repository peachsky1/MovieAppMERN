import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_URL, YT_API_KEY } from "../../Config";
import YTSearch from "youtube-api-search";
import MovieTrailer from "./Sections/MovieTrailer";
import MovieTable from "./Sections/MovieTable";
import MainImage from "../LandingPage/Sections/MainImage";

const MovieDetail = (props) => {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Title, setTitle] = useState(null);
  const [selectedVideo, setselectedVideo] = useState(null);
  const videoSearch = (Title) => {
    if (Title != null) {
      YTSearch({ key: YT_API_KEY, term: "movie ".concat(Title) }, (results) => {
        console.log("YT fetch");
        console.log(results[0]);
        setselectedVideo(results[0]);
      });
    }
  };

  useEffect(() => {
    videoSearch(Title);
  }, [Title]);
  useEffect(() => {
    setTitle(null);
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
        setTitle(response.original_title);
        console.log(response);
      });
  }, []);

  return (
    <div>
      {/* header */}
      <MainImage
        image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
        movieId={Movie.id}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movie Trailer</h2>
        <hr />

        <MovieTrailer video={selectedVideo} />
        <h2>Movie Description</h2>
        <hr />
        <MovieTable movieDetails={Movie} />
        {/* movie info */}
        <br />
        {/* actor grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button> View Casting</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
