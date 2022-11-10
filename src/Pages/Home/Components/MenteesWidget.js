import React from 'react';
import MenteeBar from '../../../GlobalComponents/MenteeBar/MenteeBar';
import {Link} from "react-router-dom";
import useGetMentees from '../../../Firestore/useGetMentees';



const MenteesWidget = () => {

  const {menteesList} = useGetMentees(2);

  return (
    <div className="mentees-container widget">
      {menteesList.map((mentee)=>{
        return <Link key={mentee.id} to={`/${mentee.id}`} state={mentee}> <MenteeBar className={'widget'} mentee={mentee}/> </Link>
      })}
    </div>
  )
}

export default MenteesWidget