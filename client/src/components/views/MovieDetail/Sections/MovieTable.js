import React from "react";
import { JsonToTable } from "react-json-to-table";

const MovieTable = ({ movieDetails }) => {
  let myJson = movieDetails;

  // if (movieDetails != null) {
  //   delete movieDetails.adult;
  //   delete movieDetails.backdrop_path;
  //   delete movieDetails.belongs_to_collection;
  //   delete movieDetails.id;
  //   delete movieDetails.imdb_id;
  //   delete movieDetails.poster_path;
  //   delete movieDetails.production_companies;
  //   delete movieDetails.video;
  // }
  // const myJson = movieDetails;

  return (
    <div>
      <div>
        <JsonToTable json={myJson} />
      </div>
    </div>
  );
};

export default MovieTable;
