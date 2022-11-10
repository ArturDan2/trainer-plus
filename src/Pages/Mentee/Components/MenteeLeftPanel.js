import React, {useState} from 'react';
//router
import {Link, useLocation} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import CollectionsIcon from '@mui/icons-material/Collections';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useEffect } from 'react';


const MenteeLeftPanel = ({mentee}) => {
  
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false);
  const [activePage, setActivePage] = useState()

  console.log(location.pathname.split('/').pop());

  useEffect(()=> {
    const page = location.pathname.split('/').pop();
    if(page === "analisys"){
      setActivePage("analisys")
    }else{
      setActivePage("home-profile")
    }
  },[location])

  return (
      <div className={`mentee-page side-panel flex-col ${isVisible ? "visible" : "hidden"}`}>
          <Link to={`/${mentee.id}`} state={mentee}><button className={`icon ${activePage == "home-profile" ? "highlight" : ""}`}><PersonIcon/></button></Link>
          <Link to={`/${mentee.id}/analisys`} state={mentee}><button className={`icon ${activePage == "analisys" ? "highlight" : ""}`}><BarChartIcon/></button></Link>
          <Link to=""><button title="Ta funkcja jest czasowo niedostępna." className="icon inactive"><FitnessCenterIcon/></button></Link>
          <Link to=""><button title="Ta funkcja jest czasowo niedostępna." className="icon inactive"><CollectionsIcon/></button></Link>
          <div onClick={()=> {setIsVisible(!isVisible)}} className="reveal-hide-button">
            <div className="arrow-right"></div>
          </div>
      </div>
  )
}

export default MenteeLeftPanel