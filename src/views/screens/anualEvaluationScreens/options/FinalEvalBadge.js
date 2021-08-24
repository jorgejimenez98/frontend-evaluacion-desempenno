import { CBadge } from "@coreui/react";
import React from "react";
import { FaRegHandPeace, BiLike, BiDislike } from "react-icons/all";

function FinalEvalBadge({ finalEval }) {
  return (
    <h1>
      <CBadge
        color={
          finalEval === "Deficiente"
            ? "danger"
            : finalEval === "Adecuado"
            ? "info"
            : finalEval === "Superior"
            ? "success"
            : "warning"
        }
      >
        {finalEval === "Deficiente" ? (
          <BiDislike size={25} className="mr-2 mb-2" />
        ) : finalEval === "Adecuado" ? (
          <BiLike size={25} className="mr-2 mb-2" />
        ) : (
          finalEval === "Superior" && (
            <FaRegHandPeace size={25} className="mr-2 mb-2" />
          )
        )}
        {finalEval}
      </CBadge>
    </h1>
  );
}

export default FinalEvalBadge;
