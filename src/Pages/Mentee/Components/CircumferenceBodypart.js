import React from "react";
import { translatebodypart } from "../Functionality/bodypartTranslator";

const CircumferenceBodypart = ({ data, bodypart, setIsOpen }) => {
  const getNewestVal = () => {
    if (data.length > 0) {
      return data[data.length - 1].value;
    } else {
      return "x";
    }
  };

  const getOlderVal = () => {
    if (data.length > 1) {
      return data[data.length - 2].value;
    } else {
      return "x";
    }
  };

  return (
    <div
      onClick={(e) => {
        setIsOpen(true);
      }}
      className="circumference-bodypart flex-row"
    >
      <h5>{translatebodypart(bodypart)}</h5>
      <p>{getOlderVal()}</p>
      <p>{getNewestVal()}</p>
    </div>
  );
};

export default CircumferenceBodypart;
