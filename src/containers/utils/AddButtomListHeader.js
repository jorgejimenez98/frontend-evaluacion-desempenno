import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { LinkContainer } from "react-router-bootstrap";

const defaultToolbarStyles = {
  iconButton: {},
};

class AddButtomListHeader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <LinkContainer to={this.props.addLink}>
          <Tooltip title={this.props.title}>
            <IconButton className={classes.iconButton}>
              <AddIcon className={classes.deleteIcon} />
            </IconButton>
          </Tooltip>
        </LinkContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, {
  name: "AddButtomListHeader",
})(AddButtomListHeader);
