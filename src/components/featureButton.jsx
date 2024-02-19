import React from "react";

const FeatureButton = ({ buttonText }) => {
  return (
    <button className="featureButton">
      <a href="#" target="_blank">
        <span> </span>
        <span> </span>
        <span> </span>
        <span> </span>
        {buttonText}
      </a>
    </button>
  );
};

export default FeatureButton;
