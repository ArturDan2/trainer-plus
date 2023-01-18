import React from "react";
import "./Home.scss";
import MenteesWidget from "./Components/MenteesWidget";
import EventsWidget from "./Components/EventsWidget";
import ChatWidget from "./Components/ChatWidget";

const HomePage = () => {
  return (
    <>
      <div className="home grid-container">
        <MenteesWidget />
        <EventsWidget />
        <ChatWidget />
      </div>
    </>
  );
};

export default HomePage;
