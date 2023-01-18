import React, { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../Firestore/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { dateFormater } from "../../../../../Utils/dateFormater";
import { getDate } from "../../../../../Utils/getDate";
import uniqid from "uniqid";

const UpdateWeightWindow = ({ setMentee, weightData }) => {
  const [newWeight, setNewWeight] = useState();
  const { id } = useParams();
  const { year, month, day } = getDate();
  const navigate = useNavigate();

  const weightRef = "".concat("weight.", `${year}`);
  const newWeightObject = {
    weight: newWeight,
    date: `${dateFormater(day)}.${dateFormater(month)}`,
    id: uniqid(),
  };

  const setUptadedWeight = () => {
    if (weightData[year]) {
      return [...weightData[year], newWeightObject];
    } else {
      return [newWeightObject];
    }
  };

  const onChangeHandler = (e) => {
    setNewWeight(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    setUptadedWeight();
    e.preventDefault();
    const updatedWeight = setUptadedWeight();
    const docRef = doc(db, "mantees", id);
    await updateDoc(docRef, {
      [weightRef]: updatedWeight,
      timestamp: serverTimestamp(),
    });
    setMentee((prevState) => ({
      ...prevState,
      weight: { ...prevState.weight, [year]: updatedWeight },
      timestamp: serverTimestamp(),
    }));
    weightData[year].push(newWeightObject);
    setNewWeight("");
    navigate(""); //prevents changes from dissapearing after refresh
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex-col">
      <h5>Nowy pomiar:</h5>
      <label htmlFor="waga-ciała">Waga ciała(kg)</label>
      <input
        name="waga-ciała"
        onChange={onChangeHandler}
        value={newWeight}
        type="number"
        min="10"
        max="350"
      ></input>
      <input
        onSubmit={onSubmitHandler}
        className="submit toggle-window"
        type="submit"
      ></input>
    </form>
  );
};

export default UpdateWeightWindow;
