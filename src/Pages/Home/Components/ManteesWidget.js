import React from 'react';
import ManteeBar from '../../../GlobalComponents/ManteeBar/ManteeBar';
import {Link} from "react-router-dom";
import useGetMantees from '../../../Firestore/useGetMantees';



const ManteesWidget = () => {

  const {manteesList} = useGetMantees(2);

  return (
    <div className="mantees-container widget">
      {manteesList.map((mantee)=>{
        return <Link key={mantee.id} to={`/${mantee.id}`} state={mantee}> <ManteeBar className={'widget'} mantee={mantee}/> </Link>
      })}
    </div>
  )
}

export default ManteesWidget