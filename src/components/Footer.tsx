import React from "react";
import "../App.css";
import { Box, Link, Grid } from "@mui/material";
import { Avatar, Box as GBox } from "grommet";
import logo from "../img/otmFullFormLogo.png";

export default function Footer() {
  return (
    <GBox
      style={{
        marginTop: 20,
      }}
      direction="row-responsive"
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid style={{ background: "#A64A35" }} item xs={6}>
          <GBox
            direction="row-responsive"
            style={{ marginBottom: 8, textAlign: "center" }}
          >
            <Avatar
              src={logo}
              align="flex-end"
              size={"large"}
              style={{ marginLeft: 75, marginTop: 5, padding: 1 }}
            />
            <div className="column">
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  margin: 0,
                  marginLeft: 10,
                  marginTop: 24,
                }}
              >
                On The Menu
              </p>
              <p style={{ color: "#FFFFFF", fontSize: 12, margin: 0 }}>
                Made using Spoonacular API
              </p>
            </div>
          </GBox>
        </Grid>
        <Grid style={{ background: "#A64A35" }} item xs={6}>
          <GBox direction="column" style={{ marginRight: 20 }}>
            <h4
              style={{
                color: "#000000",
                fontWeight: "bold",
                margin: 0,
                marginBottom: 5,
                marginTop: 10,
                textAlign: "right",
              }}
            >
              Created by Jatin Arora
            </h4>
            <GBox direction="column" style={{ textAlign: "right" }}>
              <Link
                style={{ color: "#FFFFFF", marginBottom: 5 }}
                underline="none"
                href="https://www.github.com/jatinAroraGit"
              >
                Github
              </Link>
              <Link
                style={{ color: "#FFFFFF", marginBottom: 5 }}
                underline="none"
                href="https://www.linkedin.com/in/jatinarora08/"
              >
                Linkedin
              </Link>
              <Link
                style={{
                  color: "#FFFFFF",
                  marginBottom: 15,
                }}
                underline="none"
                href="mailto:jatin.arora08@outlook.com"
              >
                Email
              </Link>
            </GBox>
          </GBox>
        </Grid>
      </Grid>
    </GBox>
  );
  /*
  return (
    <GBox alignContent="end" style={{ background: "#000000", padding: 10 }}>
      <GBox direction="row-responsive" style={{ marginBottom: 8 }}>
        <Avatar
          src={logo}
          align="flex-end"
          size={"large"}
          style={{ marginLeft: 20, marginTop: 5, padding: 1 }}
        />
        <div className="column">
          <p
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              margin: 0,
              marginLeft: 7,
              marginTop: 20,
            }}
          >
            On The Menu
          </p>

          <p style={{ color: "#FFFFFF", fontSize: 10, margin: 0 }}>
            Made using Spoonacular API
          </p>
        </div>
      </GBox>
      <GBox direction="column">
        <h4
          style={{
            color: "#FFFFFF",
            fontWeight: "lighter",
            margin: 0,
            marginBottom: 5,
            textDecoration: "underline",
          }}
        >
          Create by Jatin Arora
        </h4>
        <GBox direction="row-responsive">
          <Link
            style={{ marginBottom: 5, marginRight: 10 }}
            underline="none"
            href="https://www.github.com/jatinAroraGit"
          >
            Github
          </Link>
          <Link
            style={{ marginBottom: 5, marginRight: 10 }}
            underline="none"
            href="https://www.linkedin.com/in/jatinarora08/"
          >
            Linkedin
          </Link>
          <Link
            style={{ marginBottom: 5, marginRight: 10 }}
            underline="none"
            href="mailto:jatin.arora08@outlook.com"
          >
            Email
          </Link>
        </GBox>
      </GBox>
    </GBox>
  );
  */
}
