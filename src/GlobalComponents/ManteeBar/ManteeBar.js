import React from 'react'
// import "./ManteeBar.scss"
import { capitalizeFirstLetter } from '../../GlobalFunctionality/firstLetterCapitalizer';


const ManteeBar = ({affilation, mantee}) => {

  const {fname, lname} = mantee;

  return (
    <div className={`mantee bar flex-row space-between ${affilation}`}>
        <h3>{capitalizeFirstLetter(fname)} {capitalizeFirstLetter(lname)}</h3>
        <div className="mantee-circle"></div>
    </div>
  )
}

export default ManteeBar