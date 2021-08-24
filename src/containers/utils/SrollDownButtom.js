import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";

const defaultToolbarStyles = {
  iconButton: {},
};

class SrollDownButtom extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tooltip title={"Evaluación"}>
          <IconButton
            onClick={() => {
              window.scrollTo({
                top: 500,
                behavior: "smooth",
              });
            }}
          >
            <ArrowDownwardRoundedIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, {
  name: "SrollDownButtom",
})(SrollDownButtom);
