import React,{useState} from 'react';
import { db } from '../../../../../Firestore/firestore';
import { doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { useParams, useNavigate} from "react-router-dom";
import {getDate} from '../../../../../GlobalFunctionality/getDate';
import { dateFormater } from '../../../../../GlobalFunctionality/dateFormater';
import uniqid from 'uniqid';



export const UpdateCircumferencesWindow = ({circumferencesData, setMentee}) => {

const [selectedBodypart, setSelectedBodypart] = useState('chest');
const [updatedValue, setUpdatedValue] = useState();
const {id} = useParams();
const navigate = useNavigate();
const {year, month, day} = getDate();

const newMeasureObject = {
  value: updatedValue,
  id: uniqid(),
  date: `${dateFormater(day)}.${dateFormater(month)}.${year}`
}

const updatedData = [...circumferencesData[selectedBodypart], newMeasureObject] 

const objectRef = "".concat("circumferences.", `${selectedBodypart}`);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  const docRef = doc(db, "mantees", id);
  await updateDoc(docRef, {
    [objectRef]: updatedData,
    timestamp: serverTimestamp()
  });
  setMentee((prevState) => ({
    ...prevState, 
    circumferences: {...prevState.circumferences, [selectedBodypart]: updatedData}
  }));
  setUpdatedValue('');
  navigate(''); //prevents changes to dissapear after refresh
}//updates database and UI

  return (
    <form onSubmit={onSubmitHandler} className="update-circumferences">
        <h5>Nowy pomiar:</h5>
        <label htmlFor="circumference-bodypart">Część ciała</label>
        <select onChange={(e) => {setSelectedBodypart(e.target.value)}} name="bodypart">
            <option value="chest">KLATKA PIERSIOWA</option>
            <option value="waist">TALIA</option>
            <option value="hips">BIODRA</option>
            <option value="shoudelrs">RAMIONA</option>
            <option value="biceps">BICEPS</option>
            <option value="thigh">UDO</option>
            <option value="calf">ŁYDKA</option>
        </select>
        <label htmlFor="circumference-value">Wartość(cm)</label>
        <input onChange={(e)=> {setUpdatedValue(e.target.value)}} value={updatedValue} type="number" min="10" max="300" name="circumference-value"></input>
        <input type="submit"></input>
    </form>
  )
}
