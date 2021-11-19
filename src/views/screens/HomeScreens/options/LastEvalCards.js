import React from "react";
import CardEval from "./CardEval";

function LastEvalCards({ paytimes }) {
  return (
    <div className="p-2 mb-2">
      <div className="row">
        <div className="col-md-4">
          <CardEval paytime={paytimes.first} title={"Último mes"} />
        </div>
        <div className="col-md-4">
          <CardEval paytime={paytimes.second} title={"Penúltimo mes"} />
        </div>
        <div className="col-md-4">
          <CardEval paytime={paytimes.third} title={"Antepenúltimo mes"} />
        </div>
      </div>
    </div>
  );
}

export default LastEvalCards;
