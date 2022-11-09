import { useRef } from "react";
import "./GlobalStyles.scss"
import "./App.scss"
import Nav from "./GlobalComponents/Nav/Nav";
import HomePage from "./Pages/Home/HomePage";
import ManteesListPage from "./Pages/ManteesList/ManteesListPage";
import ManteePage from "./Pages/Mantee/ManteePage";
import AnalisysPage from "./Pages/Mantee/Subpages/Analysis/AnalisysPage";
import AddManteeForm from "./Pages/Forms/AddMantee/AddManteeForm";
import { SchedulerPage } from "./Pages/Scheduler/SchedulerPage";
//Router
import {Routes, Route} from "react-router-dom";



function App() {
  
  const appRef = useRef();

  return (
    <div className="main-container">
      <div ref={appRef} className="app-container">
      <Nav/>
      <Routes>
        <Route path="" element={<HomePage/>}/>
        <Route path="/podopieczni" element={<ManteesListPage/>}/>
        <Route path="/:id" element={<ManteePage/>}/>
        <Route path="/:id/analisys" element={<AnalisysPage/>}/>
        <Route path="/podopieczni/add-mantee" element={<AddManteeForm/>}/>
        <Route path="/kalendarz" element={<SchedulerPage ref={appRef}/>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App;
