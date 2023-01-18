import { useRef } from "react";
import "./GlobalStyles.scss";
import "./App.scss";
import Nav from "./Components/Nav/Nav";
import HomePage from "./Pages/Home/HomePage";
import MenteesListPage from "./Pages/MenteesList/MenteesListPage";
import MenteePage from "./Pages/Mentee/MenteePage";
import AnalisysPage from "./Pages/Mentee/Subpages/Analysis/AnalisysPage";
import AddMenteeForm from "./Pages/Forms/AddMentee/AddMenteeForm";
import { SchedulerPage } from "./Pages/Scheduler/SchedulerPage";
//Router
import { Routes, Route } from "react-router-dom";

function App() {
  const appRef = useRef();
  return (
    <div className="main-container">
      <div ref={appRef} className="app-container">
        <Nav />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/podopieczni" element={<MenteesListPage />} />
          <Route path="/:id" element={<MenteePage />} />
          <Route path="/:id/analisys" element={<AnalisysPage />} />
          <Route path="/podopieczni/add-mentee" element={<AddMenteeForm />} />
          <Route
            path="/kalendarz"
            element={<SchedulerPage ref={appRef} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
