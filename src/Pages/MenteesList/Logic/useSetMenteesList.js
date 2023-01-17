import {useState, useEffect} from 'react';
import { db } from '../../../Firestore/firestore';
import {collection, getDocs, query, orderBy, limit, where, startAfter} from "firebase/firestore";

function useGetMentees(limitstatement){

    const [menteesList, setMenteesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("WYSTĄPIŁ PROBLEM")
    const menteesCollectionRef = collection(db, "mantees");


    const getMentees = async () => {
        try {
          const firebasequery = query(menteesCollectionRef, orderBy("timestamp", "desc"), limit(limitstatement));
          const data = await getDocs(firebasequery);
          const mentees = data.docs.map((doc) => ({...doc.data(), id: doc.id}) )
          setMenteesList && setMenteesList(mentees);}
        catch (e){
          setErrorMessage("WYSTĄPIŁ PROBLEM Z POŁĄCZENIEM Z SERWEREM");
        }
       };

    const searchMentees = async (searchquery) => { //searchquery are the words entered in text input in search component
        const setQuery = () => {
          switch (searchquery.length) {
            case 1:
              // if user's searching by one word for example first name only, or number only, search if searchdata array witch contains 
              //data desinged for searching contains this word
              return query(menteesCollectionRef, where("searchdata", "array-contains-any", searchquery));
            case 2:
              //if users searching for mentee by two words - first name and last name, search for that specific object in manteesCollectionRef
              return query(menteesCollectionRef, where("fname", "==", searchquery[0]), where("lname", "==", searchquery[1]));
            default:
              return;
        };
        }
        const firebasequery = setQuery();
        const data = await getDocs(firebasequery);
        const mentees = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        if(data.docs.length === 0){
          setErrorMessage("BRAK PODOPIECZNEGO W BAZIE");
        }
        setMenteesList && setMenteesList(mentees.reverse());
    };

    const paginateMentees = async (e) =>{
      const firebasequery = query(menteesCollectionRef, orderBy("timestamp", "desc"), limit(limitstatement), startAfter(menteesList[menteesList.length - 1].timestamp));
      const data = await getDocs(firebasequery);
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