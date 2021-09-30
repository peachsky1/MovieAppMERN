import React from "react";
import Iframe from "react-iframe";
const MovieTrailer = ({ video }) => {
  console.log(video);
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="embed-responsive embed-responsive-16by9" align="center">
      <Iframe
        url={url}
        width="80%"
        height="700px"
        overflow="visible"
        className="embed-responsive-item"
        // display="flex"
        // justify-content="center"
        // align-items="center"
        allowFullScreen
      />
    </div>
  );
};

export default MovieTrailer;
