import React from 'react'
import "./Home.scss";
import ManteesWidget from './Components/ManteesWidget';
import EventsWidget from './Components/EventsWidget';
import ChatWidget from './Components/ChatWidget';


const HomePage  = () => {
  return (
    <>
      <div className="home grid-container">
        <ManteesWidget/>
        <EventsWidget/>
        <ChatWidget/>
      </div>
    </>
  )
}

export default HomePage