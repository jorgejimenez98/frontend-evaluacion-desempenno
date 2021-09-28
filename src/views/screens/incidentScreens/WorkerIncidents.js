import React from "react";

function WorkerIncidents({ match }) {
  const workerId = match.params.workerId;
  const payTimeId = match.params.payTimeId;
  const hotelId = match.params.hotelId;

  return (
    <div>
      Incidencias work {workerId} pay {payTimeId} ho {hotelId}
    </div>
  );
}

export default WorkerIncidents;
