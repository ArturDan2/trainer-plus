import React, {useState} from 'react';
import MenteeBar from '../../GlobalComponents/MenteeBar/MenteeBar';
import MenteesLeftPanel from './Components/MenteesLeftPanel';
import "./MenteesListPage.scss";
import {Link} from "react-router-dom";
import useGetMentees from '../../Firestore/useGetMentees';
import { useEffect } from 'react';



const MenteesListPage = () => {
  const [searchQuestion, setSearchQuestion] = useState();
  const {menteesList, searchMentees, paginateMentees, errorMessage} = useGetMentees(10);
  const [isLoading, setIsLoading] = useState(true);

  const loadingHandler = () => {
    if(menteesList.length > 0) {
      setIsLoading(false);
    }
    setTimeout(() => {setIsLoading(false)}, 10000);
  } //if no data for 10 seconds, return false

  useEffect(()=> {
    loadingHandler()
  }, [menteesList])


  return (
    <div className="mentees-list-page flex-row">
        <MenteesLeftPanel searchMentees={searchMentees} setSearchQuestion={setSearchQuestion} searchQuestion={searchQuestion}/>
        <div className="mentees-list-container flex-col">
        {isLoading ?
          <div className="dot-pulse"></div> :
          <>
            {!isLoading && menteesList.length > 0 ?
            <ul className="mentees-list flex-col">
              {menteesList.map((mentee)=>{
                return <li key={mentee.id}><Link to={`/${mentee.id}`} state={mentee}><MenteeBar className={'mentees-list'} mentee={mentee}/></Link></li>
              })}
            </ul> :
            <h4 className="error-message">{errorMessage}</h4>}
          </>
        }
          {menteesList.length >= 10  ? <button onClick={paginateMentees}>Pokaż więcej</button> : ''} {/*button is not visible if there's not enought items to paginate*/}
        </div>
    </div>
  )
}

export default MenteesListPage