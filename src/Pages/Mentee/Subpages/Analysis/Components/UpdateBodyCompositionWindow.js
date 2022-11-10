
import React, {useState} from 'react';
import { db } from '../../../../../Firestore/firestore';
import { doc, updateDoc, serverTimestamp} from "firebase/firestore";
import { useParams, useNavigate} from "react-router-dom";


const UpdateBodyCompositionWindow = ({bodycompositionData, setMentee}) => {

  const [updatedFat, setUpdatedFat] = useState();
  const [updatedMuscle, setUpdatedMuscle] = useState()
  const {id} = useParams();
  const navigate = useNavigate();


  const convertedbodycomposition = bodycompositionData ? bodycompositionData.map((x) => {
    return Object.entries(x);
  }) : [];
  const fattissueValues = convertedbodycomposition[0][0][1];
  const muscletissueValues = convertedbodycomposition[1][0][1];

  const updatedBodycomposition = [
      {fattisue:{
        ...bodycompositionData[0].fattissue, lastmeasure: updatedFat
      }},
      {muscletissue:{
        ...bodycompositionData[1].muscletissue, lastmeasure: updatedMuscle
      }}
    ]

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "mantees", id);
    await updateDoc(docRef, {
      bodycomposition: updatedBodycomposition,
      timestamp: serverTimestamp()
    });
    setMentee((prevState) => ({
      ...prevState,
      bodycomposition: updatedBodycomposition,
    }))
    setUpdatedFat('');
    setUpdatedMuscle('');
    navigate(''); //prevents changes to dissapear after refresh
  } //updates database and UI

  return (
    <div className="flex-row update-bodycomposition">
      <div className="flex-col space-between">
        <div>
          <h5>Pierwszy pomiar:</h5>
          <p>Tłuszcz: {fattissueValues.firstmeasure}%</p>
          <p>Mięśnie: {muscletissueValues.firstmeasure}%</p>
        </div>
        <div>
          <h5>Ostatni pomiar:</h5>
          <p>Tłuszcz: {fattissueValues.lastmeasure}%</p>
          <p>Mięśnie: {muscletissueValues.lastmeasure}%</p>
        </div>
      </div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <h5>Nowy pomiar:</h5>
          <div className='flex-col'>
            <label htmlFor="bodyfat">Tłuszcz(%)</label>
            <input onChange={(e) => setUpdatedFat(e.target.value)} value={updatedFat} type="number" min="1" max="100" name="bodyfat"></input>
          </div>
          <div className="flex-col">
            <label htmlFor="muscle">Mięśnie(%)</label>
            <input onChange={(e) => setUpdatedMuscle(e.target.value)} value={updatedMuscle} type="number" min="1" max="100" name="muscle"></input>
          </div>
          <input className="submit toggle-window" type="submit"></input>
        </form>
      </div>
    </div>
  )
}

export default UpdateBodyCompositionWindow