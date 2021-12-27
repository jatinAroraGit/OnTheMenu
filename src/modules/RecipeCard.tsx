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
import defaultRecipeImage from "../img/defaultRecipeImage.jpg";
import "../styles/forms.css";

const sk = process.env.REACT_APP_ALPHANUMERIC_CODE;

const styles = {
  recipeCardStyle: {
    background: "#C94C30",
    borderRadius: 20,
    margin: 4,
    padding: 5,
    paddingRight: 0,
    marginTop: 30,
    width: 400,
    height: 160,
  },
  recipeImageStyle: {
    borderWidth: 4,
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    padding: 2,

    minHeight: 130,
    minWidth: 130,
    borderRadius: 100,
    margin: 0,
  },
};

export default function RecipeCard(props: any) {
  const [recipeInfo, setRecipeInfo] = useState(props.recipeCardDetails);

  return (
    <Card style={styles.recipeCardStyle} variant="elevation" raised={true}>
      <CardContent style={{ padding: 4 }}>
        <GBox direction="row">
          <Avatar
            style={styles.recipeImageStyle}
            src={recipeInfo.image}
            size={"2xl"}
          />

          <GBox style={{ marginLeft: 20 }} direction="column">
            <h3 style={{ margin: 2, padding: 3, paddingRight: 7 }}>
              {recipeInfo.title}
            </h3>
            <GBox direction="column">
              <div className="row">
                <p style={{ margin: 1 }} color="success">
                  Serves [4]
                </p>
              </div>

              <div className="row">
                <p style={{ margin: 1 }} color="success">
                  Average Price [ 56.50]
                </p>
              </div>
              <div className="row">
                <p style={{ margin: 1 }} color="success">
                  Ready in minutes [120]
                </p>
              </div>
            </GBox>
          </GBox>
        </GBox>
      </CardContent>
    </Card>
  );
}
