import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const MenteesLeftPanel = ({
  setSearchQuestion,
  searchQuestion,
  searchMentees,
}) => {
  return (
    <div className="mentees-list side-panel">
      <div className="search-container mentee">
        <h4>Szukaj</h4>
        <div className="input-container flex-row">
          <input
            className="search-input mentee"
            type="text"
            onChange={(e) => {
              setSearchQuestion(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              searchMentees(searchQuestion.toLowerCase().split(" "));
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className="add-mentee-container">
        <Link to="add-mentee">
          <button className="button add-mentee">+ DODAJ PODOPIECZNEGO</button>
        </Link>
      </div>
    </div>
  );
};

export default MenteesLeftPanel;
