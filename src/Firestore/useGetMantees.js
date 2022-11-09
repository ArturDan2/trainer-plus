import {useState, useEffect} from 'react';
import { db } from './firestore';
import {collection, getDocs, query, orderBy, limit, where, startAfter} from "firebase/firestore";

function useGetMantees(limitstatement){

    const [manteesList, setManteesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("WYSTĄPIŁ PROBLEM")

    
    
    const manteesCollectionRef = collection(db, "mantees");


    const getMantees = async () => {
        try {
          const q = query(manteesCollectionRef, orderBy("timestamp", "desc"), limit(limitstatement));
          const data = await getDocs(q);
          const mantees = data.docs.map((doc) => ({...doc.data(), id: doc.id}) )
          setManteesList && setManteesList(mantees);}
        catch (e){
          setErrorMessage("WYSTĄPIŁ PROBLEM Z POŁĄCZENIEM Z SERWEREM");
        }
       };

    const searchMantees = async (searchquery) => {
        let q = null;
        switch (searchquery.length) {
            case 1:
              q = query(manteesCollectionRef, where("searchdata", "array-contains-any", searchquery));
            break;
            case 2:
              q = query(manteesCollectionRef, where("fname", "==", searchquery[0]), where("lname", "==", searchquery[1]));
              break;
        }
        const data = await getDocs(q);
        const mantees = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        if(data.docs.length == 0){
          setErrorMessage("BRAK PODOPIECZNEGO W BAZIE");
        }
        setManteesList && setManteesList(mantees.reverse());
    };
    
    const paginateMantees = async (e) =>{
      const q = query(manteesCollectionRef, orderBy("timestamp", "desc"), limit(limitstatement), startAfter(manteesList[manteesList.length - 1].timestamp));
      const data = await getDocs(q);
      const mantees = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      if(mantees[0] === undefined || manteesList.some(mantee => mantee.id === mantees[0].id)){
        e.target.classList.add('inactive')
      }else{
        setManteesList && setManteesList([...manteesList, ...mantees.reverse()]);
      }
    };

       useEffect(() => {
        getMantees();
       },[]);

       return {manteesList, setManteesList, searchMantees, paginateMantees, errorMessage}
}

export default useGetMantees;