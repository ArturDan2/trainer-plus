import React from 'react'
import { capitalizeFirstLetter } from '../../Utils/firstLetterCapitalizer';


const MenteeBar = ({affilation, mentee}) => {

  const {fname, lname} = mentee;

  return (
    <div className={`mentee bar flex-row space-between ${affilation}`}>
        <h3>{capitalizeFirstLetter(fname)} {capitalizeFirstLetter(lname)}</h3>
        <div className="mentee-circle"></div>
    </div>
  )
}

export default MenteeBar