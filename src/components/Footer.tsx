import React from "react";
import "../App.css";
import { Box, Link, Grid } from "@mui/material";
import { Avatar, Box as GBox } from "grommet";
import logo from "../img/otmFullFormLogo.png";

export default function Footer() {
  return (
    <GBox
      style={{
        marginTop: 80,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        position: "relative",
        clear: "both",
        background: "linear-gradient(to right, #ffb347, #ffcc33)",
      }}
      direction="row-responsive"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <GBox
            direction="column"
            style={{
              marginBottom: 8,
              textAlign: "center",
              padding: 10,
              alignItems: "center",
            }}
          >
            <Avatar
              src={logo}
              align="flex-end"
              size={"large"}
              style={{ marginTop: 5, padding: 1 }}
            />

            <p
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                margin: 0,

                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              On The Menu
            </p>
            <p style={{ color: "#FFFFFF", fontSize: 12, margin: 0 }}>
              Made using Spoonacular API
            </p>
          </GBox>
        </Grid>
        <Grid item xs={6}>
          <GBox
            direction="column"
            style={{ marginRight: 20, alignItems: "center" }}
          >
            <GBox direction="column" style={{ textAlign: "left" }}>
              <h4
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                  margin: 0,
                  marginBottom: 5,
                  marginTop: 10,
                  textAlign: "left",
                }}
              >
                Developed by
              </h4>
              <h4
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  margin: 0,
                  marginBottom: 5,
                  marginTop: 2,
                  textAlign: "left",
                }}
              >
                Jatin Arora
              </h4>
              <a
                style={{
                  color: "#FFFFFF",
                  marginBottom: 5,
                }}
                href="https://www.github.com/jatinAroraGit"
              >
                Github
              </a>
              <a
                style={{ color: "#FFFFFF", marginBottom: 5 }}
                href="https://www.linkedin.com/in/jatinarora08/"
              >
                Linkedin
              </a>
              <a
                style={{
                  color: "#FFFFFF",
                  marginBottom: 15,
                }}
                href="mailto:jatin.arora08@outlook.com"
              >
                Email
              </a>
            </GBox>
          </GBox>
        </Grid>
      </Grid>
    </GBox>
  );
}
