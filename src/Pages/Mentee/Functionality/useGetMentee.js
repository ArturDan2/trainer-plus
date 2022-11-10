
import { useState, useEffect } from "react";
import { db } from "../../../Firestore/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useLocation, useParams } from "react-router-dom";



function useGetMentee(){
    const {id} = useParams();
    const location = useLocation();
    const [mentee, setMentee] = useState(location.state);

    const getMentee = async () => {
        if(mentee === null){
            const docRef = doc(db, "mantees", id);
            const docSnap = await getDoc(docRef);
            setMentee(docSnap.data())
        }
    }

    useEffect(() => {
        getMentee();
    },[])

    return {mentee, setMentee}
}

export default useGetMentee;