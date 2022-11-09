import React from 'react';
import { translatebodypart } from '../Functionality/bodypartTranslator';

const CircumferenceBodypart = ({data, bodypart, setIsOpen, setDetailedData}) => {


const getNewestVal = () => {
  let value
  if(data.length > 0){
    value = data[data.length - 1].value
  }else{
    value = 'x'
  }
  return value
};

const getOlderVal = () => {
  let value
  if(data.length > 1){
    value = data[data.length - 2].value
  }else{
    value = 'x'
  }
  return value
};

  return (
    <div onClick={(e)=>{setIsOpen(true)}} className="circumference-bodypart flex-row">
      <h5>{translatebodypart(bodypart)}</h5>
      <p>{getOlderVal()}</p>
      <p>{getNewestVal()}</p>
    </div>
  )
}

export default CircumferenceBodypart