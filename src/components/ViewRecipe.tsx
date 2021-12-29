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
export default function ViewRecipe(props: any) {
  let [recipeId, setRecipeId] = useState();
  let [recipe, seRecipe] = useState();
  let [loading, setLoading] = useState(false);

  let getRecipeDetails = (id: string) => {
    console.log(id);
    id = id.trim();
  };
  return (
    <Box style={{ height: "100vh", display: "flex" }}>
      <Card>
        <CardContent>View Recipe in dev</CardContent>
      </Card>
    </Box>
  );
}
