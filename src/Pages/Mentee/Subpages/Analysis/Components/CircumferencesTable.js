import React,{useState} from 'react';
import ExpendableButton from './ExpendableButton';
import { UpdateCircumferencesWindow } from './UpdateCircumferencesWindow';
import CircumferenceBodypart from '../../../Components/CircumferenceBodypart';
import MoreMeasurments from './MoreMeasurments';

const CircumferencesTable = ({circumferencesData, setMentee, affilation}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [detailedData, setDetailedData] = useState();

  return (
    <div className={`circumferences-table ${affilation}`}>
        <div className="heading">
          <h4>OBWODY CIAŁA</h4>
          <ExpendableButton windowInsides={<UpdateCircumferencesWindow circumferencesData={circumferencesData} setMentee={setMentee} />}/>
        </div>
        <div className="table flex-col">
          <div className='flex-row column-names'>
              <h5>Obwód</h5>
              <h5>Poprzedni</h5>
              <h5>Najnowszy</h5>
          </div>
          <ul className="circumferences-container">
          {Object.keys(circumferencesData).map((key) =>{
              return <li key={key} onClick={()=> {setDetailedData([key, circumferencesData[key]]); console.log(detailedData)}}>
                        <CircumferenceBodypart setDetailedData={setDetailedData} setIsOpen={setIsOpen} bodypart={key} data={circumferencesData[key]}/>
                     </li>
          })}
          </ul>
          <div onClick={() => {setIsOpen(false)}}className={`circumferences-details-background ${isOpen ? "open" : "closed"}`}>
          </div>
          <div className={`circumferences-details-container ${isOpen ? "open" : "closed"}`}>
            { detailedData ?
            <MoreMeasurments detailedData={detailedData}></MoreMeasurments>
            : ''}
          </div>
        </div>
      </div>
  )
}

export default CircumferencesTable