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
  Grommet,
  ResponsiveContext,
  ThemeContext,
} from "grommet";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
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
import { createTheme, ThemeProvider } from "@mui/material";
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

export default function Dev() {
  const { state } = useLocation();
  const searchData = state.searchData;

  console.log(searchData);

  return (
    <div>
      <SearchBar searchData={state.searchData}></SearchBar>
    </div>
  );
}
