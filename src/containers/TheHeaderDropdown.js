import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { FaAngleDown } from "react-icons/fa";
import { BiLogOut } from "react-icons/all";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = ({ userInfo }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <CDropdown inNav className="c-header-nav-items" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="text-center">
          <h5>
            {userInfo?.username} <FaAngleDown />
          </h5>
        </div>
      </CDropdownToggle>
      <CDropdownMenu style={{ margin: 0 }}>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Cuenta</strong>
        </CDropdownItem>
        <LinkContainer to="/user/profile"> 
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />
            Perfil de usuario
          </CDropdownItem>
        </LinkContainer>
        <CDropdownItem divider />
        <CDropdownItem onClick={logoutHandler}>
          <BiLogOut /> &nbsp; Salir del Sistema
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
