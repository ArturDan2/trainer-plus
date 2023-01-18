import React, {useState} from 'react';
import { doc, updateDoc, arrayRemove, deleteField} from "firebase/firestore";
import { db } from '../../../Firestore/firestore';
import { useParams, useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';


const ChartStripe = ({setMentee, affilation, weightData, year, object, scaleRatio, setPickedYear}) => {
    
    const {weight, date} = object;

    const {id} = useParams();
    const navigate = useNavigate();
    const weightRef = "".concat("weight.", `${year}`);
    // const indexOfStripe = weightData[year].indexOf(object);
    const [isRemoved, setIsRemoved] = useState("not-removed");
    const [isVisible, setIsVisible] = useState(false);
    const [dynamicHeight, setDynamicHeight] = useState(weight/scaleRatio);

    useEffect(() => {
        setDynamicHeight(weight/scaleRatio)
      }, [scaleRatio])


    const onClickHandler = async () => {
        const docRef = doc(db, "mantees", id);
        
        if(Object.keys(weightData).length === 1 && weightData[year].length === 1){ //if it's an only value left, prevent from deleting it
            alert('Wykres musi zawierać minimum jeden pomiar')
        }else if(weightData[year].length > 1){ //if it's not a last weight in certain year, remove stripe only
            await updateDoc(docRef, {
                [weightRef]: arrayRemove(object)
            });
            setIsRemoved("is-removed");
            setMentee((prevState) => ({
                ...prevState,
                [weightRef]: arrayRemove(object),
            }));
        }else{ //if it's a last stripe to delete in certain year, remove the year from database and change view for year before
            await updateDoc(docRef, {
                [weightRef]: deleteField()
            });
            setMentee(prevState => {
                delete prevState.weight[year];
                return prevState
            });
            setPickedYear(Number(year) - 1);
        }

        navigate(''); // prevents from changes dissapearing after refresh
    } //removes data and updates UI

    return (
        <div onClick={(e)=> {e.preventDefault(); if(affilation === "mentee-page") return;  setIsVisible(!isVisible)}} className={`chart-stripe ${affilation} ${isRemoved} ${isVisible ? "active" : "not-active"}`} style={{height: dynamicHeight + "%"}}>
            <p>{weight}</p>
            <div className={`hidden-info ${affilation}  ${isVisible ? "visible" : "hidden"}`}>
                <button onClick={onClickHandler} className={`delete-stripe ${affilation}`}><ClearIcon className="icon"/></button>
                <p className={`date-stripe ${affilation}`}>{date}</p>
            </div>
        </div>
    )
}

export default ChartStripe