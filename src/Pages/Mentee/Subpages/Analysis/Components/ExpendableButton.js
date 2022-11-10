import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';


const ExpendableButton = ({windowInsides}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
    <div>
        <div onClick={() => {setIsOpen(false)}} className={`clickout-background ${isOpen ? "open" : "closed"}`}></div>
        <div className="button-container">
            <button onClick={() => {setIsOpen(!isOpen)}}>
                <AddIcon/>
            </button>
            <div className={`toggle-window ${isOpen ? "open" : "closed"}`}>
                {windowInsides}
            </div>
        </div>
    </div>
  )
}

export default ExpendableButton