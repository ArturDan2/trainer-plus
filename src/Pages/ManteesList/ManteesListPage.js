import React, {useState} from 'react';
import ManteeBar from '../../GlobalComponents/ManteeBar/ManteeBar';
import ManteesLeftPanel from './Components/ManteesLeftPanel';
import "./ManteesListPage.scss";
import {Link} from "react-router-dom";
import useGetMantees from '../../Firestore/useGetMantees';
import { useEffect } from 'react';



const ManteesListPage = () => {
  const [searchQuestion, setSearchQuestion] = useState();
  const {manteesList, searchMantees, paginateMantees, errorMessage} = useGetMantees(10);
  const [isLoading, setIsLoading] = useState(true);

  const loadingHandler = () => {
    if(manteesList.length > 0) {
      setIsLoading(false);
    }
    setTimeout(() => {setIsLoading(false)}, 10000);
  } //if no data for 10 seconds, return false

  useEffect(()=> {
    loadingHandler()
  }, [manteesList])


  return (
    <div className="mantees-list-page flex-row">
        <ManteesLeftPanel searchMantees={searchMantees} setSearchQuestion={setSearchQuestion} searchQuestion={searchQuestion}/>
        <div className="mantees-list-container flex-col">
        {isLoading ?
          <div className="dot-pulse"></div> :
          <>
            {!isLoading && manteesList.length > 0 ?
            <ul className="mantees-list flex-col">
              {manteesList.map((mantee)=>{
                return <li key={mantee.id}><Link to={`/${mantee.id}`} state={mantee}><ManteeBar className={'mantees-list'} mantee={mantee}/></Link></li>
              })}
            </ul> :
            <h4 className="error-message">{errorMessage}</h4>}
          </>
        }
          {manteesList.length >= 10  ? <button onClick={paginateMantees}>Pokaż więcej</button> : ''} {/*button is not visible if there's not enought items to paginate*/}
        </div>
    </div>
  )
}

export default ManteesListPage