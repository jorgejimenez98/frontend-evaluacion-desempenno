import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "CASA",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Gestiones y aplicaciones"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Usuarios",
    route: "/base",
    icon: "cil-user",

    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Listado",
        to: "/users/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Insertar Usuario",
        to: "/users/list/add",
      },
    ],
  },
];

export default _nav;
