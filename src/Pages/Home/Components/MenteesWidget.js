import React from "react";
import MenteeBar from "../../../Components/MenteeBar/MenteeBar";
import { Link } from "react-router-dom";
import useSetMenteesList from "../../MenteesList/Logic/useSetMenteesList";

const MenteesWidget = () => {
  const { menteesList } = useSetMenteesList(2);

  return (
    <div className="mentees-container widget">
      {menteesList.map((mentee) => {
        return (
          <Link key={mentee.id} to={`/${mentee.id}`} state={mentee}>
            <MenteeBar className={"widget"} mentee={mentee} />
          </Link>
        );
      })}
    </div>
  );
};

export default MenteesWidget;
