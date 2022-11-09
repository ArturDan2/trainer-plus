import React, {useState} from 'react';
import ManteeLeftPanel from '../../Components/ManteeLeftPanel';
import ManteeBar from '../../../../GlobalComponents/ManteeBar/ManteeBar';
import { WeightChart } from '../../Components/WeightChart';
import BodyComposition from '../../Components/BodyComposition';
import useGetMantee from '../../Functionality/useGetMantee';
import CircumferencesTable from './Components/CircumferencesTable';

const AnalisysPage = () => {

const {mantee, setMantee} = useGetMantee();
const [newData, setNewData] = useState();

  return (
    mantee ?
    <div className="grid-container analisys-page">
      <ManteeLeftPanel mantee={mantee}/>
      <ManteeBar mantee={mantee} affilation="analisys-page"/>
      <WeightChart mantee={mantee} setMantee={setMantee} newData={newData} setNewData={setNewData} weightData={mantee.weight} affilation={"analisys-page"}/>
      <BodyComposition mantee={mantee} setMantee={setMantee} bodycompositionData={mantee.bodycomposition} affilation={"analisys-page"}/>
      <CircumferencesTable setMantee={setMantee} circumferencesData={mantee.circumferences} affilation={"analisys-page"}/>
    </div>
    : null
  )
}

export default AnalisysPage