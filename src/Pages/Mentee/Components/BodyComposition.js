import React from "react";
import ExpendableButton from "../Subpages/Analysis/Components/ExpendableButton";
import UpdateBodyCompositionWindow from "../Subpages/Analysis/Components/UpdateBodyCompositionWindow";
import ChartPie from "./ChartPie.js";
import EnterInitialBodycompositionData from "../Subpages/Analysis/Components/EnterInitialBodycompositionData";

const BodyComposition = ({
  affilation,
  bodycompositionData,
  mentee,
  setMentee,
}) => {
  const bodycompositionConverted = bodycompositionData
    ? bodycompositionData.map((x) => {
        return Object.entries(x);
      })
    : []; //getting data ready for proper iteration

  return (
    <div className={`body-composition-chart ${affilation}`}>
      <div className="heading">
        <h4>SKŁAD CIAŁA</h4>
        {bodycompositionData ? (
          <ExpendableButton
            windowInsides={
              <UpdateBodyCompositionWindow
                mentee={mentee}
                setMentee={setMentee}
                bodycompositionData={bodycompositionData}
              />
            }
          />
        ) : (
          <></>
        )}
      </div>
      <div className="flex-row charts-container">
        {bodycompositionData ? (
          bodycompositionConverted.map((data) => {
            const tissuearray = data[0];
            const tissuetype = tissuearray[0];
            const valuesobject = tissuearray[1];
            return (
              <ChartPie
                key={tissuetype}
                caption={
                  tissuetype === "muscletissue"
                    ? "Tkanka mięśniowa"
                    : "Tkanka tłuszczowa"
                }
                value={valuesobject.lastmeasure}
              ></ChartPie>
            );
          })
        ) : (
          <EnterInitialBodycompositionData
            setMentee={setMentee}
            affilation={affilation}
            bodycompositionState={bodycompositionData}
          ></EnterInitialBodycompositionData>
        )}
      </div>
    </div>
  );
};

export default BodyComposition;
