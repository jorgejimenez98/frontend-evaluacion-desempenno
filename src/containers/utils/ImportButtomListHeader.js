import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import GetpAppIcon from "@material-ui/icons/GetApp";
import { withStyles } from "@material-ui/core/styles";
import { LinkContainer } from "react-router-bootstrap";

const defaultToolbarStyles = {
  iconButton: {},
};

class ImportButtomListHeader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <LinkContainer to={this.props.link}>
          <Tooltip title={this.props.title}>
            <IconButton className={classes.iconButton}>
              <GetpAppIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        </LinkContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, {
  name: "ImportButtomListHeader",
})(ImportButtomListHeader);
