import React from 'react'

const InfoSubcontainer = ({icon, type, value}) => {
  return (
    <div className="info-container">
        <h3>{icon}</h3>
        <div className="info-container2">
            <p>{type}</p>
            <p>{value}</p>
        </div>
    </div>
  )
}

export default InfoSubcontainer