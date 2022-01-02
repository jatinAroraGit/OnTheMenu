import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Zoom from "@mui/material/Zoom";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import {
  Avatar,
  Box as GBox,
  ThemeContext,
  ResponsiveContext,
  Grommet,
  grommet,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import defaultRecipeImage from "../img/defaultRecipeImage.jpg";
import "../styles/forms.css";
import Button from "@mui/material/Button";
import FiltersForm from "../modules/FiltersForm";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchBar from "../modules/SearchBar";
import RecipeCard from "../modules/RecipeCard";
import Dev from "./Dev";
import { createTheme, ThemeProvider } from "@mui/material";
import BounceLoader from "react-spinners/BounceLoader";
import { useLocation } from "react-router-dom";

const sk = process.env.REACT_APP_ALPHANUMERIC_CODE;
type Inputs = {
  searchString: string;
};

const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 300,
      },
      small: {
        value: 1100,
      },
      medium: undefined,
      middle: {
        value: 2000,
      },
    },
  },
});

const styles = {
  noSpaceBox: {
    padding: 0,
    margin: 0,
    alignItems: "center",
    display: "flex",
  },
};
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
      sm: 500,
      md: 1000,
      lg: 1200,
      xl: 2000,
    },
  },
});

let mockData = [
  { title: "test1", type: "testQ" },
  { title: "test2", type: "testW" },
  { title: "test3", type: "testE" },
  { title: "test4", type: "testR" },
  { title: "test5", type: "testT" },
  { title: "test6", type: "testY" },
  { title: "test7", type: "testU" },
  { title: "test8", type: "testI" },
  { title: "test9", type: "testO" },
  { title: "test10", type: "testP" },
  { title: "test11", type: "testA" },
  { title: "test12", type: "testB" },
];

export default function SearchResults(props: any) {
  const stateVar = useLocation();
  const [loading, setLoading] = useState(false);
  const [recipesList, setRecipesList] = useState(
    stateVar.state ? stateVar.state.recipeList.results : []
  );
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newPage, setNewPage] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentRecipes, setCurrentRecipes] = useState<any>(
    recipesList.length > 15 ? recipesList.slice(0, 14) : recipesList
  );
  const [filterQuery, setFilterQuery] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  let getNewRecipeList = (newList: any) => {
    setLoading(true);
    console.log("getting new list");
    console.log(newList);
    setRecipesList([...newList.results]);
    if (newList.results.length > 15)
      setCurrentRecipes(newList.results.slice(0, 14));
    else {
      setCurrentRecipes([...newList.results]);
    }
    console.log(recipesList);
    setLoading(false);
  };

  let getLoadingState = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  let getSearchResults = (data: any) => {
    console.log("searching");

    console.log(data);
  };
  if (stateVar.state) {
    console.log("State Recipe List");
    console.log(stateVar.state.recipeList);
    if (stateVar.state.recipeList) getSearchResults(stateVar.state.recipeList);
  }
  const setNewPageData = (event: React.ChangeEvent<unknown>, value: number) => {
    setNewPage(value);
    console.log(value);
    setLoading(true);
    if (value == 2) {
      console.log("Page 2");
      let newList = recipesList.slice(15, recipesList.length - 1);
      setCurrentRecipes([...newList]);
      console.log(currentRecipes);
    }
    if (value == 1) {
      console.log("page 1");
      let newList = recipesList.slice(0, 14);
      setCurrentRecipes([...newList]);
      console.log(currentRecipes);
    }
    setLoading(false);
  };

  return (
    <GBox
      direction="column"
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100%",
        padding: 5,
      }}
    >
      <GBox style={{ marginBottom: 20 }} direction="row">
        <SearchBar
          getLoadingState={getLoadingState}
          getNewRecipeList={getNewRecipeList}
        />
      </GBox>
      {recipesList.length == 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            variant="elevation"
            style={{ background: "#c94c30", borderRadius: 20, padding: 20 }}
          >
            <CardContent>
              <GBox direction="row">
                <h4 style={{ margin: 0 }}>Oops!</h4>
              </GBox>
              <p style={{ width: 300, fontWeight: "bold", fontSize: 16 }}>
                No results were found
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {recipesList.length > 0 && (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              flexGrow: 1,
              padding: 0,
              alignItems: "center",
              display: "flex",
              justifyContent: "flex",
            }}
          >
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 1, sm: 1, md: 12, lg: 12 }}
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              {!loading ? (
                recipesList.map((item: any, index: number) => (
                  <Grid
                    style={{
                      padding: 0,
                      margin: 0,
                      justifyContent: "center",
                      display: "flex",
                    }}
                    item
                    xs={1}
                    sm={1}
                    md={6}
                    lg={4}
                    key={index}
                  >
                    <RecipeCard recipeCardDetails={item}></RecipeCard>
                  </Grid>
                ))
              ) : (
                <p style={{ color: "#faba2c", margin: 0 }}> </p>
              )}
            </Grid>
          </Box>
        </ThemeProvider>
      )}
    </GBox>
  );
}
