import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/core/styles";
import { LinkContainer } from "react-router-bootstrap";

const defaultToolbarStyles = {
  iconButton: {},
};

class GoBackButtonListHeader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <LinkContainer to={this.props.link}>
          <Tooltip title={this.props.title}>
            <IconButton className={classes.iconButton}>
              <ArrowBackIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        </LinkContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, {
  name: "GoBackButtonListHeader",
})(GoBackButtonListHeader);

