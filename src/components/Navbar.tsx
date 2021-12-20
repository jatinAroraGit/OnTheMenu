import * as React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import navBackground from "../img/navbarBg.jpg";
import headerLogo from "../img/otmAbreviatedLogo.png";

import { Avatar, Header } from "grommet";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Dev from "./Dev";
import FiltersForm from "../modules/FiltersForm";
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

export default function Navbar() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(0);

  let navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      style={{
        padding: 0,
        backgroundImage: `url(${navBackground})`,
        backgroundPosition: "center",
        backgroundSize: "100%",
        minHeight: 200,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        margin: 6,
        marginTop: 0,
      }}
    >
      <AppBar
        style={{ padding: 0, background: "transparent", boxShadow: "none" }}
        position="relative"
      >
        <div style={{ flexDirection: "row" }}>
          <Header
            elevation="small"
            direction="row-responsive"
            style={{ padding: 5 }}
          >
            <Avatar
              src={headerLogo}
              size={"medium"}
              style={{ marginLeft: 20, marginTop: 5, padding: 19 }}
            />

            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="basic tabs example"
              >
                <Tab
                  onClick={() => navigate("/home")}
                  label="Home"
                  {...a11yProps(0)}
                />

                <Tab
                  onClick={() => navigate("/about")}
                  label="About"
                  {...a11yProps(1)}
                />

                <Tab
                  onClick={() => navigate("/dev")}
                  label="Dev"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
          </Header>
        </div>
      </AppBar>
      <Box></Box>
    </Box>
  );
}
