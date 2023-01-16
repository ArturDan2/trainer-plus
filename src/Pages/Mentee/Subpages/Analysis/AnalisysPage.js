import React, {useState} from 'react';
import MenteeLeftPanel from '../../Components/MenteeLeftPanel';
import MenteeBar from '../../../../Components/MenteeBar/MenteeBar';
import { WeightChart } from '../../Components/WeightChart';
import BodyComposition from '../../Components/BodyComposition';
import useGetMentee from '../../Functionality/useGetMentee';
import CircumferencesTable from './Components/CircumferencesTable';

const AnalisysPage = () => {

const {mentee, setMentee} = useGetMentee();
const [newData, setNewData] = useState();

  return (
    mentee ?
    <div className="grid-container analisys-page">
      <MenteeLeftPanel mentee={mentee}/>
      <MenteeBar mentee={mentee} affilation="analisys-page"/>
      <WeightChart mentee={mentee} setMentee={setMentee} newData={newData} setNewData={setNewData} weightData={mentee.weight} affilation={"analisys-page"}/>
      <BodyComposition mentee={mentee} setMentee={setMentee} bodycompositionData={mentee.bodycomposition} affilation={"analisys-page"}/>
      <CircumferencesTable setMentee={setMentee} circumferencesData={mentee.circumferences} affilation={"analisys-page"}/>
    </div>
    : null
  )
}

export default AnalisysPage