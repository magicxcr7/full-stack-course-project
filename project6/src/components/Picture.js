import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt=""></img>
      </div>
      <p>
        Download Image:{" "}
        <a target="_blank" href={data.src.large}>
          Clicl Here
        </a>
      </p>
    </div>
  );
};

export default Picture;
