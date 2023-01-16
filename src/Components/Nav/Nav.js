import React, {useState, useEffect} from 'react';
import "./Nav.scss"
//Router
import {Link, useLocation} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';



const Nav = () => {

const [isOpen, setIsOpen] = useState(false);
const pathname = useLocation();

useEffect(()=>{
  setIsOpen(false)
},[pathname]);

  return (
    <div className="nav">
        <div className="flex-row nav-container space-between">
          <Link to="/"><h1>Trainer<span>+</span></h1></Link>
          <ul className={`default-menu`}>
              <Link to="/podopieczni"><li>PODOPIECZNI</li></Link>
              <Link to="/kalendarz"><li>KALENDARZ</li></Link>
          </ul>
          <ul className={`mobile-menu ${isOpen ? `open` : `closed`}`}>
              <Link to="/podopieczni"><li>PODOPIECZNI</li></Link>
              <Link to="/kalendarz"><li>KALENDARZ</li></Link>
              <div onClick={() => setIsOpen(!isOpen)} className="close-back"></div>
          </ul>
          <button className={`menu-icon`} onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon/>
          </button>
          <div onClick={()=>{setIsOpen(false)}} className="clickout-background">
          </div>
        </div>
    </div>
  )
}

export default Nav