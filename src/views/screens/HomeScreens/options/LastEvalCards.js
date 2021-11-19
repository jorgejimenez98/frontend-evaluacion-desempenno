import React from "react";
import CardEval from "./CardEval";

function LastEvalCards() {
  return (
    <div className="p-2 mb-2">
      <div className="row">
        <div className="col-md-4">
          <CardEval />
        </div>
        <div className="col-md-4">
          <CardEval />
        </div>
        <div className="col-md-4">
          <CardEval />
        </div>
      </div>
    </div>
  );
}

export default LastEvalCards;
