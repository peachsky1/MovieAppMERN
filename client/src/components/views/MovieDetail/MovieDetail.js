import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_URL, YT_API_KEY } from "../../Config";
import YTSearch from "youtube-api-search";
import MovieTrailer from "./Sections/MovieTrailer";
import MovieTable from "./Sections/MovieTable";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";
import {
  PlayCircleTwoTone,
  FileTextTwoTone,
  ContactsTwoTone,
} from "@ant-design/icons";
const MovieDetail = (props) => {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Cast, setCast] = useState([]);
  const [CastCard, setCastCard] = useState(null);
  const [Title, setTitle] = useState(null);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [Description, setDescription] = useState(null);
  const [ActorToggle, setActorToggle] = useState(false);
  const videoSearch = (Title) => {
    if (Title != null) {
      YTSearch({ key: YT_API_KEY, term: "movie ".concat(Title) }, (results) => {
        console.log("YT fetch");
        console.log(results[0]);
        setselectedVideo(results[0]);
      });
    }
  };

  const castingSearch = (Cast) => {
    if (Title != null) {
      let castInfo = JSON.parse(JSON.stringify(Cast));
      if (castInfo != null) {
        // remove ommited info
      }
      setCastCard(castInfo);
    }
  };
  const descSearch = (Movie) => {
    if (Movie != null) {
      let movieDetails = JSON.parse(JSON.stringify(Movie));

      if (movieDetails != null) {
        delete movieDetails.adult;
        delete movieDetails.backdrop_path;
        delete movieDetails.belongs_to_collection;
        delete movieDetails.id;
        delete movieDetails.imdb_id;
        delete movieDetails.poster_path;
        delete movieDetails.production_companies;
        delete movieDetails.video;
      }
      setDescription(movieDetails);
    }
  };

  // useEffect(() => {
  //   videoSearch(Title);
  // }, [Title]);
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

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCast(response.cast);
        console.log(response.cast);
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
        {/* Trailer */}
        <h2
          onClick={() => {
            videoSearch(Title);
          }}
        >
          Movie Trailer &nbsp; <PlayCircleTwoTone spin twoToneColor="#52c41a" />
        </h2>
        <hr />
        <MovieTrailer video={selectedVideo} />

        {/* Casting */}

        <h2
          onClick={() => {
            castingSearch(Cast);
          }}
        >
          Casting &nbsp; <ContactsTwoTone spin twoToneColor="#52c41a" />
        </h2>
        <hr />

        <Row gutter={[16, 16]}>
          {CastCard &&
            CastCard.map((cast, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    cast.profile_path
                      ? `${IMAGE_URL}w500${cast.profile_path}`
                      : null
                  }
                  castName={cast.name}
                />
              </React.Fragment>
            ))}
        </Row>

        {/* Description */}
        <h2
          onClick={() => {
            descSearch(Movie);
          }}
        >
          Movie Description &nbsp;{" "}
          <FileTextTwoTone spin twoToneColor="#52c41a" />
        </h2>
        <hr />
        <MovieTable movieDetails={Description} />
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
