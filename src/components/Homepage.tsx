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
import { Avatar, Box as GBox } from "grommet";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import bannerLogo from "../img/cookingPot.png";
import bannerBackground from "../img/bannerBG.jpg";

import "../styles/forms.css";
import Button from "@mui/material/Button";
import FiltersForm from "../modules/FiltersForm";
import IconButton from "@mui/material/IconButton";
import SearchBar from "../modules/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
const sk = process.env.REACT_APP_ALPHANUMERIC_CODE;

type Inputs = {
  searchString: string;
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#FFFFFF",
  borderRadius: 5,
  shadow: 0,
  borderColor: "#FFFF00",
  padding: 2,
  outlize: "none",
};

const recipeCardStyle = {};
export default function Homepage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let searchData: any;
  if (state) {
    const searchData = state.searchData;
  } else {
    searchData = null;
  }
  let appliedFilters = {
    excludeIngredients: [],
    cuisine: "",
    diet: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [filtersData, setFiltersData] = useState(appliedFilters);
  const [filterQuery, setFilterQuery] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  let getFiltersData = (filterData: any) => {
    let filterString = "Filtering by ";
    setShowModal(false);
    appliedFilters.excludeIngredients = filterData.excludeIngredients;
    appliedFilters.cuisine = filterData.cuisine;
    appliedFilters.diet = filterData.diet;
    if (appliedFilters.cuisine != "") {
      filterString = filterString + "CUISINE: " + appliedFilters.cuisine + "\n";
    }
    if (appliedFilters.diet != "") {
      filterString = filterString + " DIET: " + appliedFilters.diet + "\n";
    }
    if (appliedFilters.excludeIngredients) {
      filterString = filterString + "NOT INCLUDING: ";
      appliedFilters.excludeIngredients.forEach(
        (item: string, index: number) => {
          if (index < appliedFilters.excludeIngredients.length - 1)
            filterString = filterString + "i" + ", ";
          else filterString = filterString + "i" + " ";
        }
      );
    }
    setFilterQuery(filterString);
    setFiltersData(appliedFilters);
    return appliedFilters;
  };

  /* use the below onSubmit function */

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    let query = "";
    let searchQuery = data.searchString.trim();
    if (searchQuery != "") {
      query = query + "query=" + searchQuery;
    }

    if (filtersData.excludeIngredients.length > 0) {
      query = query + "&excludeIngredients=";
      filtersData.excludeIngredients.forEach((item: string, index: number) => {
        if (index < filtersData.excludeIngredients.length - 1) {
          query = query + item + ",";
        } else query = query + item;
      });
    }
    if (filtersData.cuisine != "") {
      query = query + "&cuisine=" + filtersData.cuisine;
    }
    if (filtersData.diet != "") {
      query = query + "&diet=" + filtersData.diet;
    }
  };

  const quickSearch = (value: any) => {
    let query = value;
    navigate("/search", {
      state: {
        searchQuery: query,
      },
    });
  };

  return (
    <Box style={{ padding: 0 }}>
      <GBox
        style={{
          // background: "linear-gradient(to right, #ffb347, #ffcc33)",
          background: `url(${bannerBackground})`,
          resize: "block",
          backgroundSize: "contain",
          borderRadius: 20,
          margin: 15,
          padding: 15,
          alignItems: "center",
        }}
        direction="column"
      >
        <div
          style={{
            justifyContent: "center",
            //background: "rgba(234, 56, 77, .8)",
            background: "rgba(250, 186, 44, .8)",
            width: window.screen.width < 700 ? 225 : 500,
            padding: 20,
            borderRadius: 20,
            backgroundAttachment: "",
          }}
        >
          <div className="column" style={{ textAlign: "center" }}>
            <Zoom in={true}>
              <div>
                <h2 style={{ padding: 0, margin: 0 }}>What's</h2>
                <h1 style={{ padding: 0, margin: 0 }}>On The Menu</h1>
                <h2 style={{ padding: 0, margin: 0 }}>Today</h2>
              </div>
            </Zoom>
          </div>
          <div
            className="column"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={bannerLogo}
              size={"3xl"}
              style={{ marginLeft: 20, marginTop: 5, padding: 1 }}
            />
          </div>
          <h3 style={{ textAlign: "center" }}>Search 1000s of Recipes</h3>
          <h3 style={{ textAlign: "center", margin: 4 }}>
            Explore Different Cuisines and Diets
          </h3>
        </div>
      </GBox>

      <GBox direction="row-responsive" style={{ padding: 40 }}>
        <Box
          style={{
            width: "100%",
            background: "#FFFFFF",
            borderRadius: 20,
            padding: 30,
          }}
          alignSelf="center"
        >
          <GBox>
            <h3 style={{ margin: 2, textAlign: "center" }}>Start Searching</h3>
            <SearchBar showSuggestions={true}></SearchBar>
          </GBox>
        </Box>
      </GBox>
    </Box>
  );
}
