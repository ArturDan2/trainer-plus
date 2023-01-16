import {useState, useEffect} from 'react';
import { db } from './firestore';
import {collection, getDocs, query, orderBy, limit, where, startAfter} from "firebase/firestore";

function useGetMentees(limitstatement){

    const [menteesList, setMenteesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("WYSTĄPIŁ PROBLEM")

    const menteesCollectionRef = collection(db, "mantees");


    const getMentees = async () => {
        try {
          const q = query(menteesCollectionRef, orderBy("timestamp", "desc"), limit(limitstatement));
          const data = await getDocs(q);
          const mentees = data.docs.map((doc) => ({...doc.data(), id: doc.id}) )
          setMenteesList && setMenteesList(mentees);}
        catch (e){
          setErrorMessage("WYSTĄPIŁ PROBLEM Z POŁĄCZENIEM Z SERWEREM");
        }
       };

    const searchMentees = async (searchquery) => {
        let q = null;
        switch (searchquery.length) {
            case 1:
              q = query(menteesCollectionRef, where("searchdata", "array-contains-any", searchquery));
            break;
            case 2:
              q = query(menteesCollectionRef, where("fname", "==", searchquery[0]), where("lname", "==", searchquery[1]));
              break;
            default:
              return;
        };
        const data = await getDocs(q);
        const mentees = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        if(data.docs.length === 0){
          setErrorMessage("BRAK PODOPIECZNEGO W BAZIE");
        }
        setMenteesList && setMenteesList(mentees.reverse());
    };

    const paginateMentees = async (e) =>{
      const q = query(menteesCollectionRef, orderBy("timestamp", "desc"), limit(limitstatement), startAfter(menteesList[menteesList.length - 1].timestamp));
      const data = await getDocs(q);
      const mentees = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      if(mentees[0] === undefined || menteesList.some(mentee => mentee.id === mentees[0].id)){
        e.target.classList.add('inactive')
      }else{
        setMenteesList && setMenteesList([...menteesList, ...mentees.reverse()]);
      }
    };

       useEffect(() => {
        getMentees();
       },[]);

       return {menteesList, setMenteesList, searchMentees, paginateMentees, errorMessage}
}

export default useGetMentees;