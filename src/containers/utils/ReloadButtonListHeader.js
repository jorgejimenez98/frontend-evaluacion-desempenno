import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ReplayRoundedIcon from "@material-ui/icons/ReplayRounded";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {},
};

class ReloadButtonListHeader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
          <Tooltip title={this.props.title}>
            <IconButton className={classes.iconButton} onClick={this.props.onClick}>
              <ReplayRoundedIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, {
  name: "ReloadButtonListHeader",
})(ReloadButtonListHeader);
