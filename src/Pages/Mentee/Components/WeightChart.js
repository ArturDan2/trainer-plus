import React, { useState, useEffect, useRef } from "react";
import ExpendableButton from "../Subpages/Analysis/Components/ExpendableButton";
import UpdateWeightWindow from "../Subpages/Analysis/Components/UpdateWeightWindow";
import ChartStripe from "./ChartStripe";

export const WeightChart = ({
  mentee,
  weightData,
  affilation,
  setNewData,
  newData,
  setMentee,
}) => {
  const getLastUpdatedYear = (object) => {
    const entries = Object.entries(object);
    let lastUpdatedYear;
    lastUpdatedYear = entries[entries.length - 1][0];
    return lastUpdatedYear;
  };

  const [pickedYear, setPickedYear] = useState(getLastUpdatedYear(weightData));
  const [scaleRatio, setScaleRatio] = useState(1.3);
  const [isDown, setIsDown] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [startX, setStartX] = useState();
  const [scrollPosition, setScrollPosition] = useState();
  const stripesContainer = useRef();

  const scaller = (weightData) => {
    const allWeights = weightData[pickedYear].map((object) => {
      return object.weight;
    });

    if (allWeights.some((el) => el > 250)) {
      setScaleRatio(4);
    } else if (allWeights.some((el) => el > 200)) {
      setScaleRatio(3);
    } else if (allWeights.some((el) => el > 100)) {
      setScaleRatio(2);
    } else setScaleRatio(1.3);
  }; //scales stripes so it doesnt overflow the container

  useEffect(() => {
    stripesContainer.current.scrollLeft = stripesContainer.current.scrollWidth; //scrolls to the max right of the container so the last updates are visible first
    setPickedYear(getLastUpdatedYear(weightData));
  }, []);

  useEffect(() => {
    setPickedYear(getLastUpdatedYear(weightData));
    scaller(weightData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mentee]);

  useEffect(() => {
    scaller(weightData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedYear]);

  const onChangeHandler = (e) => {
    setPickedYear(e.target.value);
  };

  const onMouseDownHandler = (e) => {
    if (
      !e.target.classList.contains("stripes-container") &&
      affilation !== "mentee-page"
    )
      return;
    setIsDown(true);
    setIsActive(true);
    setStartX(e.pageX);
    setScrollPosition(e.target.scrollLeft);
  };
  const onMouseMoveHandler = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = x - startX;
    e.target.scrollLeft = scrollPosition - walk;
  };
  //grabb and scroll functionality

  return (
    <div
      onMouseDown={onMouseDownHandler}
      onMouseUp={() => {
        setIsDown(false);
        setIsActive(false);
      }}
      onMouseLeave={() => {
        setIsDown(false);
        setIsActive(false);
      }}
      onMouseMove={onMouseMoveHandler}
      className={`weight-chart ${affilation} ${
        isActive ? "active" : "not-active"
      }`}
    >
      <select onChange={onChangeHandler} name="year" value={pickedYear}>
        {Object.keys(weightData).map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <div className="heading">
        <h4>PROGRES WAGI</h4>
        <ExpendableButton
          windowInsides={
            <UpdateWeightWindow
              setMentee={setMentee}
              weightData={weightData}
              newData={newData}
              setNewData={setNewData}
            />
          }
        />
      </div>
      <div ref={stripesContainer} className="stripes-container flex-row">
        <div className="center-fix"></div>
        {weightData[pickedYear].map((object) => {
          return (
            <ChartStripe
              setMentee={setMentee}
              scaleRatio={scaleRatio}
              weightData={weightData}
              affilation={affilation}
              object={object}
              key={object.id}
              year={pickedYear}
              setPickedYear={setPickedYear}
            />
          );
        })}
        <div className="center-fix"></div>
      </div>
    </div>
  );
};
