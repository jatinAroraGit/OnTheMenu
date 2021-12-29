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
import { Navigate, useNavigate } from "react-router-dom";
import CardActionArea from "@mui/material/CardActionArea";

const sk = process.env.REACT_APP_ALPHANUMERIC_CODE;

const styles = {
  recipeCardStyle: {
    background: "#FFFFFF",
    borderRadius: 20,
    margin: 0,
    padding: 7,
    paddingRight: 0,
    marginTop: 26,
    width: window.screen.width < 480 ? 380 : 500,

    height: 160,
  },
  recipeImageStyle: {
    borderWidth: 4,
    borderColor: "#c94c30",
    borderStyle: "solid",
    padding: 2,

    minHeight: 130,
    minWidth: 130,
    borderRadius: 100,
    margin: 0,
    marginTop: 3,
  },
};

export default function RecipeCard(props: any) {
  const [recipeInfo, setRecipeInfo] = useState(props.recipeCardDetails);
  let navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/recipe/" + recipeInfo.id)}
      style={{ margin: 5, borderRadius: 20 }}
      variant="elevation"
      raised={true}
    >
      <CardActionArea style={{ borderRadius: 20 }}>
        <CardContent style={styles.recipeCardStyle}>
          <GBox direction="row">
            <Avatar
              style={styles.recipeImageStyle}
              src={recipeInfo.image}
              size={"2xl"}
            />

            <GBox style={{ marginLeft: 20 }} direction="column">
              <h3
                style={{
                  margin: 0,
                  padding: 0,
                  wordBreak: "break-all",
                  color: "#c94c30",
                  paddingRight: 16,
                  maxWidth: 270,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {recipeInfo.title.length > 49
                  ? recipeInfo.title.substring(0, 48) + "...."
                  : recipeInfo.title}
              </h3>
              <GBox direction="column">
                <div className="row" style={{ display: "flex" }}>
                  <p
                    style={{
                      margin: 1,
                      fontWeight: "500",
                      fontSize: 18,
                    }}
                    color="success"
                  >
                    Serves
                  </p>
                  <p
                    style={{
                      margin: 1,
                      marginLeft: 5,
                      color: "#000000",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {recipeInfo.servings}
                  </p>
                </div>

                <div className="row" style={{ display: "flex" }}>
                  <p
                    style={{
                      margin: 1,
                      color: "#000000",
                      fontWeight: "500",
                      fontSize: 18,
                    }}
                  >
                    Per Serving Price
                  </p>
                  <p
                    style={{
                      margin: 1,
                      marginLeft: 5,
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {recipeInfo.pricePerServing}
                  </p>
                </div>
                <div className="row" style={{ display: "flex" }}>
                  <p
                    style={{ margin: 1, fontWeight: "500", fontSize: 18 }}
                    color="success"
                  >
                    Ready in
                  </p>
                  <p
                    style={{
                      margin: 1,
                      marginLeft: 5,
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {recipeInfo.readyInMinutes} min
                  </p>
                </div>
              </GBox>
            </GBox>
          </GBox>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
