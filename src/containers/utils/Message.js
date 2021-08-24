import React from "react"; //useState
import { CAlert } from "@coreui/react";

function Message({ variant, children }) {
  //const [showMessage, setShowMessage] = useState(true);
  /*   setTimeout(() => {
    setShowMessage(false);
  }, 5000); */

  return (
    <div>
      <CAlert color={variant} closeButton>
        {children}
      </CAlert>
    </div>
  );
}

export default Message;
