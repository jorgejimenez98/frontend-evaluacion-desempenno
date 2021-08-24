import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/img/logo.png";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CImg,
} from "@coreui/react";
// routes config
import routes from "../routes";

import { TheHeaderDropdown } from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let sidebarShow = useSelector((state) => state.sidebarShow.sidebarShow);
  if (sidebarShow === undefined) {
    sidebarShow = "responsive";
  }

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CImg
          src={Logo}
          className="c-sidebar-brand-full"
          alt="logo"
          height={65}
        />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <h5 className="text-center text-muted mt-2">
          Sistema de Evaluación del Desempeño
        </h5>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown userInfo={userInfo} />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
