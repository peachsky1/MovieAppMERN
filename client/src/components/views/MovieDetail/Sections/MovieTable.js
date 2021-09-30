import React from "react";
import { JsonToTable } from "react-json-to-table";

const MovieTable = ({ movieDetails }) => {
  let myJson = movieDetails;
  return (
    <div>
      <div>
        <JsonToTable json={myJson} />
      </div>
    </div>
  );
};

export default MovieTable;
