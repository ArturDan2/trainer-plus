import React, {useState} from 'react';
import { db } from '../../../../../Firestore/firestore';
import { doc, updateDoc} from "firebase/firestore";
import { useParams, useNavigate} from "react-router-dom";




const EnterInitialBodycompositionData = ({affilation, setMantee}) => {
  
  const [initialFatMeasure, setInitialFatMeasure] = useState();
  const [initialMuscleMeasure, setInitialMuscleMeasure] = useState();
  const {id} = useParams();
  const navigate = useNavigate()


  const onSubmitHandler = async (e) => {
    e.prevDefault();
    const docRef = doc(db, "mantees", id);
    const initialData = {
      bodycomposition: [
        {fattissue:{
          firstmeasure: initialFatMeasure,
          lastmeasure: initialFatMeasure,
        }},
        {muscletissue:{
          firstmeasure: initialMuscleMeasure,
          lastmeasure: initialMuscleMeasure,
        }}
      ]
    };
    await updateDoc(docRef, initialData);
    setMantee((prevState) => ({...prevState, ...initialData}))
    navigate('')
  } //updating database and UI

  return (
    <div className={`body-composition-chart ${affilation}`}>
      {affilation === "analisys-page" ? 
      <form onSubmit={onSubmitHandler} className={`flex-col firstmeasurment-bodycomposition`}>
        <p>Wprowadź pierwsze pomiary</p>
        <div className="flex-row">
          <div className="flex-col input-container">
            <label htmlFor="fat">Tkanka tłuszczowa(%)</label>
            <input name="fat" onChange={(e) => setInitialFatMeasure(Number(e.target.value))} min="1" max="100" type="number"></input>
          </div>
          <div className="flex-col input-container">
            <label htmlFor="muscle">Tkanka mięśniowa(%)</label>
            <input name="muscle" onChange={(e) => setInitialMuscleMeasure(Number(e.target.value))} min="1" max="100" type="number"></input>
          </div>
        </div>
        <input type="submit" className="initial button"></input>
      </form> :
      <p>No data to display. Enter initial data through an Analisys Panel</p>}
    </div>
  )
}

export default EnterInitialBodycompositionData