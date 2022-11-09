import React from 'react';
import {Link} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';


const ManteesLeftPanel = ({setSearchQuestion, searchQuestion, searchMantees}) => {
  return (
    <div className="mantees-list side-panel">
        <div className="search-container mantee">
            <h4>Szukaj</h4>
            <div className='input-container flex-row'>
              <input className="search-input mantee" type="text" onChange={(e)=>{setSearchQuestion(e.target.value)}}></input>
              <button onClick={()=>{searchMantees(searchQuestion.toLowerCase().split(' '))}}><SearchIcon/></button>
            </div>
        </div>
        <div className="add-mantee-container">
            <Link to="add-mantee"><button className="button add-mantee">+ DODAJ PODOPIECZNEGO</button></Link>
        </div>
    </div>
  )
}

export default ManteesLeftPanel