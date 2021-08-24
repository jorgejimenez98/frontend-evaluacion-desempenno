import React, { useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.div`
  position: fixed;
  width: 100%;
  left: 50%;
  bottom: 40px;
  height: 25px;
  font-size: 2rem;
  z-index: 1;
  cursor: pointer;
  color: white;
  cursor: pointer;
`;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <FaAngleDoubleUp
        onClick={scrollToTop}
        style={{
          display: visible ? "inline" : "none",
          backgroundColor: "#3399ff",
          borderRadius: "5px",
          padding: "3px",
        }}
      />
    </Button>
  );
};

export default ScrollToTop;
