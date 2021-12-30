import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Zoom from "@mui/material/Zoom";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import { Avatar, Box as GBox } from "grommet";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import defaultRecipeImage from "../img/defaultRecipeImage.jpg";
import "../styles/forms.css";
import { Button } from "@mui/material";
import bannerLogo from "../img/cookingPot.png";
import logo from "../img/otmFullFormLogo.png";

export default function About() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 10,
        height: "100%",
      }}
    >
      <GBox direction="column">
        <GBox
          style={{
            background: "linear-gradient(to right, #ffb347, #ffcc33)",
            borderRadius: 20,
            margin: 5,
            padding: 45,
            alignItems: "center",
            maxWidth: 700,
          }}
          direction="column"
        >
          <div
            className="column"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={logo}
              size={"2xl"}
              style={{ marginTop: 5, padding: 1 }}
            />
          </div>
          <div
            className="column"
            style={{
              textAlign: "center",

              justifyContent: "center",
            }}
          >
            <h3>
              On The Menu is a web app that uses limited/free version of
              Spoonacular API. It is built as a showcase for front end UI
              development.
            </h3>
            <Button
              target="_top"
              href="https://www.github.com/jatinAroraGit"
              variant="outlined"
              color="secondary"
            >
              Website Source Code
            </Button>
            <h5>
              Source code of this website is copyright of the Github Repository
              owner{" "}
              <a
                style={{ color: "#A64a35" }}
                target="_blank"
                href="https://www.github.com/jatinAroraGit"
              >
                Jatin Arora
              </a>{" "}
              and is not available for copying and modifying. Any mention of
              this website must be attributed to the creator of the website
            </h5>
          </div>
        </GBox>
        <GBox
          direction="row-responsive"
          style={{ maxWidth: 800, display: "flex", alignSelf: "center" }}
        >
          <Card
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              margin: 24,
              padding: 15,

              marginTop: 30,
              maxWidth: 400,
              minWidth: 250,
              height: 250,
            }}
            variant="elevation"
            raised={true}
          >
            <CardContent style={{ padding: 8 }}>
              <GBox
                style={{ marginLeft: 0, textAlign: "center" }}
                direction="column"
              >
                <h2 style={{ margin: 4, padding: 0, paddingRight: 0 }}>
                  Developed By
                </h2>
                <GBox direction="column">
                  <div className="row">
                    <h2 style={{ margin: 5, color: "#c94c30" }}>Jatin Arora</h2>
                  </div>

                  <div style={{ margin: 5 }} className="row">
                    <Button
                      href="https://www.linkedin.com/in/jatinarora08/"
                      color="success"
                      variant="outlined"
                    >
                      Linkedin
                    </Button>
                  </div>
                  <div style={{ margin: 5 }} className="row">
                    <Button
                      color="info"
                      variant="outlined"
                      href="https://www.github.com/jatinAroraGit"
                    >
                      Github
                    </Button>
                  </div>
                  <div style={{ margin: 5 }} className="row">
                    <Button
                      color="secondary"
                      variant="outlined"
                      href="mailto:jatin.arora08@outlook.com"
                    >
                      Email
                    </Button>
                  </div>
                </GBox>
              </GBox>
            </CardContent>
          </Card>

          <Card
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              margin: 24,
              padding: 15,

              marginTop: 30,
              maxWidth: 400,
              minWidth: 250,
              height: 250,
            }}
            variant="elevation"
            raised={true}
          >
            <CardContent style={{ padding: 4 }}>
              <GBox style={{ textAlign: "center" }} direction="column">
                <h2 style={{ margin: 2, padding: 3, paddingRight: 7 }}>
                  Tech Stack
                </h2>
                <GBox direction="column">
                  <div className="row">
                    <p
                      style={{
                        margin: 4,
                        color: "#a64a35",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      React
                    </p>
                  </div>

                  <div className="row">
                    <p
                      style={{
                        margin: 4,
                        color: "#a64a35",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      Typescript
                    </p>
                  </div>
                  <div className="row">
                    <p
                      style={{
                        margin: 4,
                        color: "#a64a35",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      MUI
                    </p>
                  </div>
                  <div className="row">
                    <p
                      style={{
                        margin: 4,
                        color: "#a64a35",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      Grommet
                    </p>
                  </div>
                </GBox>
              </GBox>
            </CardContent>
          </Card>
        </GBox>
      </GBox>
    </div>
  );
}
