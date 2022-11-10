import React from 'react';
import { translatebodypart } from '../../../Functionality/bodypartTranslator';

const MoreMeasurments = ({detailedData}) => {
  return (
    <div className="more-measurments-container flex-col align-center">
        <h4>{translatebodypart(detailedData[0]).toUpperCase()}</h4>
        <div className="data-container flex-col">
        {detailedData[1].length > 0 ? detailedData[1].map((measure) => {
            return <div className="flex-row space-between">
                <p>{measure.date}</p>
                <p>{measure.value} cm</p>
            </div>
        }) : <div><p>Brak danych</p></div>}
        </div>
    </div>
  )
}

export default MoreMeasurments