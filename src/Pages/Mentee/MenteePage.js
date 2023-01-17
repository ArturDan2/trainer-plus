import React from 'react';
import "./MenteePage.scss";
import MenteeLeftPanel from './Components/MenteeLeftPanel';
import MenteeBar from '../../Components/MenteeBar/MenteeBar';
import InfoSubcontainer from './Components/InfoSubcontainer';
import { WeightChart } from './Components/WeightChart';
import TrainingDetails from './Components/TrainingDetails';
import BodyComposition from './Components/BodyComposition';
import useGetMentee from './Functionality/useGetMentee';
import { getLastElement } from '../../Utils/getLastElement';


const MenteePage = () => {

const {mentee} = useGetMentee();


const lastWeightObject = mentee ? mentee.weight[getLastElement(Object.keys(mentee.weight))] : null;
const lastWeight = mentee ? getLastElement(lastWeightObject).weight : null;


return (
  mentee ?
    <div className="mentee-page grid-container">
        <MenteeLeftPanel mentee={mentee}/>
        <div className="basic-info">
          <MenteeBar mentee={mentee} affilation="mentee-page"/>
          <div className='info'>
            <InfoSubcontainer icon={"W"} type={"WAGA"} value={`${lastWeight ? lastWeight : 'null'} kg`}/>
            <InfoSubcontainer icon={"W"} type={"WIEK"} value={`${mentee.age} lat`}/>
            <InfoSubcontainer icon={"W"} type={"WZROST"} value={`${mentee.height} cm`}/>
            <InfoSubcontainer icon={"C"} type={"CEL"} value={`${mentee.goal}`}/>
          </div>
        </div>
        <WeightChart weightData={mentee.weight} affilation={"mentee-page"}/>
        <BodyComposition bodycompositionData={mentee.bodycomposition} affilation={"mentee-page"}/>
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

export default MenteePage