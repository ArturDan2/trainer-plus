import React, {useState} from 'react';
import { doc, updateDoc, arrayRemove} from "firebase/firestore";
import { db } from '../../../Firestore/firestore';
import { useParams, useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';


const ChartStripe = ({setMantee, affilation, weightData, year, object, scaleRatio}) => {
    
    const {weight, date} = object;

    const {id} = useParams();
    const navigate = useNavigate();
    const weightRef = "".concat("weight.", `${year}`);
    const indexOfStripe = weightData[year].indexOf(object);
    const [isRemoved, setIsRemoved] = useState("not-removed");
    const [isVisible, setIsVisible] = useState(false);
 
    const onClickHandler = async () => {
        const docRef = doc(db, "mantees", id);
        await updateDoc(docRef, {
        [weightRef]: arrayRemove(object)
        });

        if(indexOfStripe > -1){
            weightData[year].splice(indexOfStripe,1)
        };
        setIsRemoved("is-removed");
        setMantee((prevState) => ({
            ...prevState,
            [weightRef]: arrayRemove(object),
        }));
        navigate(''); //zapobiega znikaniu zmian po refreshu;
    } //removes data and updates UI

    return (
        
        <div onClick={(e)=> {e.preventDefault(); if(affilation === "mentee-page") return;  setIsVisible(!isVisible); console.log(isVisible)}} className={`chart-stripe ${affilation} ${isRemoved} ${isVisible ? "active" : "not-active"}`} style={{height: (weight)/scaleRatio + "%"}}>
            <p>{weight}</p>
            <div className={`hidden-info ${affilation}  ${isVisible ? "visible" : "hidden"}`}>
                <button onClick={onClickHandler} className={`delete-stripe ${affilation}`}><ClearIcon className="icon"/></button>
                <p className={`date-stripe ${affilation}`}>{date}</p>
            </div>
        </div>
    )
}

export default ChartStripe