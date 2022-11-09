import React from 'react';
import "./ManteePage.scss";
import ManteeLeftPanel from './Components/ManteeLeftPanel';
import ManteeBar from '../../GlobalComponents/ManteeBar/ManteeBar';
import InfoSubcontainer from './Components/InfoSubcontainer';
import { WeightChart } from './Components/WeightChart';
import TrainingDetails from './Components/TrainingDetails';
import BodyComposition from './Components/BodyComposition';
import useGetMantee from './Functionality/useGetMantee';


const ManteePage = () => {

const {mantee, setMantee} = useGetMantee();

const lastWeightObject = mantee ? mantee.weight[Object.keys(mantee.weight)[Object.keys(mantee.weight).length - 1]] : null;
const lastWeight = mantee ? lastWeightObject[lastWeightObject.length - 1].weight  : null;


return (
  mantee ?
    <div className="mantee-page grid-container">
        <ManteeLeftPanel mantee={mantee}/>
        <div className="basic-info">
          <ManteeBar mantee={mantee} affilation="mantee-page"/>
          <div className='info'>
            <InfoSubcontainer icon={"W"} type={"WAGA"} value={`${lastWeight ? lastWeight : 'null'} kg`}/>
            <InfoSubcontainer icon={"W"} type={"WIEK"} value={`${mantee.age} lat`}/>
            <InfoSubcontainer icon={"W"} type={"WZROST"} value={`${mantee.height} cm`}/>
            <InfoSubcontainer icon={"C"} type={"CEL"} value={`${mantee.goal}`}/>
          </div>
        </div>
        <WeightChart weightData={mantee.weight} affilation={"mantee-page"}/>
        <BodyComposition bodycompositionData={mantee.bodycomposition} affilation={"mantee-page"}/>
        <div className="training-history">
          <h3>Historia treningów</h3>
          <TrainingDetails/>
          <TrainingDetails/>
          <TrainingDetails/>
        </div>
    </div>
    : null
  )
}

export default ManteePage