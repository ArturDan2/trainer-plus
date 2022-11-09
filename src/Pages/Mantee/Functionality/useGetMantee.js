
import { useState, useEffect } from "react";
import { db } from "../../../Firestore/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";



function useGetMantee(){
    const {id} = useParams();
    const location = useLocation();
    const [mantee, setMantee] = useState(location.state);

    const getMantee = async () => {
        if(mantee === null){
            const docRef = doc(db, "mantees", id);
            const docSnap = await getDoc(docRef);
            setMantee(docSnap.data())
        }
    }

    useEffect(() => {
        getMantee();
    },[])

    return {mantee, setMantee}
}

export default useGetMantee;