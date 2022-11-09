import React from 'react';
import { useEffect, useState } from 'react';


const ChartPie = ({caption, value}) => {

return (
    <div className="pie-container">
      <h3>{caption}</h3>
      <div 
          className="pie" 
          style={{
            "--percentage": `${ isNaN(value) ? "0" : value}`, 
            "--border-thickness":"13px",
            "--color":`${caption === "Tkanka mięśniowa" ? "#532D87" : "yellow"}`}}>
        {value}%
      </div>
    </div>
  )
}

export default ChartPie