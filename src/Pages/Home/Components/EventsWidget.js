import React, {useEffect, useState} from 'react'
import { db } from '../../../Firestore/firestore';
import {collection, getDocs, query, orderBy, limit, where} from "firebase/firestore";
import EventBar from './EventBar';
import {Link} from "react-router-dom";



const EventsWidget = () => {

  const [eventsList, setEventsList] = useState();
  const eventsCollectionRef = collection(db, "scheduler-events");

  const getEvents = async () => {
      const q = query(eventsCollectionRef, where("startDate", ">=", new Date()), limit(3));
      const data = await getDocs(q);
      const events = data.docs.map((doc) => ({...doc.data(), id: doc.id}) )
      setEventsList && setEventsList(events);
  };

  useEffect(()=> {getEvents()}, [])

  return (
    eventsList && eventsList.length != 0 ?
    <div className="events-container flex-col">
      <h3>Nadchodzące wydarzenia:</h3>
      { eventsList.map((event) => {
        return <Link key={event.id} to="/kalendarz"><EventBar event={event}/></Link>
      })} 
    </div> : 
    <div className="events-container empty"> 
      <h4>BRAK NADCHODZĄCYCH WYDARZEŃ</h4>
    </div>
  )

}
export default EventsWidget