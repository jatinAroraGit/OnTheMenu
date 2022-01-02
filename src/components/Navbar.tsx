import * as React from "react";
import { useState, useEffect } from "react";
import navBackground from "../img/navbarBg.jpg";
import "../styles/button.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import headerLogo from "../img/otmAbreviatedLogo.png";

import { Avatar, Header } from "grommet";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  useLocation,
  matchPath,
} from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Dev from "./Dev";
import FiltersForm from "../modules/FiltersForm";
import Button from "@mui/material/Button";
const routes = [
  {
    path: "/about",
    component: About,
  },
  {
    path: "/home",
    component: Homepage,
  },
  {
    path: "/dev",
    component: FiltersForm,
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function Navbar() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [buttonState, setButtonState] = React.useState("");
  const routeMatch = useRouteMatch(["/home", "/about", "/"]);
  console.log(routeMatch);
  const currentTab = routeMatch ? routeMatch.pathname : "";

  let navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      style={{
        zIndex: 2400,
        padding: 0,
        // backgroundImage: `url(${navBackground})`,
        //  background: "linear-gradient(to right, #ffb347, #ffcc33)", //yellow gradient
        background: "linear-gradient(to right, #ece9e6, #ffffff)", //white gradient
        backgroundPosition: "center",
        backgroundSize: "100%",
        // minHeight: 200,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        marginTop: 0,
      }}
    >
      <AppBar
        style={{
          padding: 0,
          background: "transparent",
          boxShadow: "none",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        elevation={0}
        position="relative"
      >
        <div
          style={{
            flexDirection: "row",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            background: "transparent",
          }}
        >
          <Header
            elevation="small"
            direction="row"
            style={{ padding: 5, background: "transparent" }}
          >
            <Avatar
              src={headerLogo}
              size={"medium"}
              onClick={() => navigate("/home")}
              style={{
                marginLeft: 20,
                marginTop: 5,
                padding: 19,
                boxShadow: "none",
              }}
            />

            <Box>
              <NavLink
                to="/home"
                style={{ textDecorationLine: "none", marginRight: 10 }}
                className={({ isActive }) =>
                  "nonav-link" + (isActive ? "active" : "inactive")
                }
              >
                <Button
                  variant={currentTab == "/home" ? "contained" : "outlined"}
                  color="secondary"
                >
                  Home
                </Button>
              </NavLink>

              <NavLink
                to="/about"
                style={{ textDecorationLine: "none", marginRight: 10 }}
                className={({ isActive }) =>
                  "nonav-link" + (isActive ? "active" : "inactive")
                }
              >
                <Button
                  variant={currentTab == "/about" ? "contained" : "outlined"}
                  color="secondary"
                >
                  About
                </Button>
              </NavLink>
              {/*
              <Tabs
                value={currentTab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="basic tabs example"
              >
                <Tab
                  onClick={() => navigate("/home")}
                  label="Home"
                  value={"/home" || ""}
                  {...a11yProps(0)}
                />

                <Tab
                  onClick={() => navigate("/about")}
                  label="About"
                  value="/about"
                  {...a11yProps(1)}
                />

                <Tab
                  onClick={() => navigate("*")}
                  label="Dev"
                  value="/dev"
                  {...a11yProps(2)}
                />
              </Tabs>
              */}
            </Box>
          </Header>
        </div>
      </AppBar>
      <Box></Box>
    </Box>
  );
}
