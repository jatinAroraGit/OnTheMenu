import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
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
import "../styles/forms.css";
import Button from "@mui/material/Button";
import FiltersForm from "../modules/FiltersForm";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import Zoom from "@mui/material/Zoom";

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
export default function SearchBar(props: any) {
  let navigate = useNavigate();

  let appliedFilters = {
    excludeIngredients: [],
    cuisine: "",
    diet: "",
  };
  console.log("recieving props");

  console.log(props);
  let initSearchData: any;
  if (props.searchData) {
    initSearchData = props.searchData;
  } else if (window.sessionStorage.getItem("searchSessionData")) {
    console.log("Using Session Stored data");
    let sessionJSON = "";
    sessionJSON = window.sessionStorage.getItem("searchSessionData") || "";
    let searchSessionData = JSON.parse(sessionJSON);

    initSearchData = searchSessionData;
  } else initSearchData = null;
  const [showModal, setShowModal] = useState(false);
  const [filtersData, setFiltersData] = useState(
    initSearchData ? initSearchData.appliedFiltersObj : appliedFilters
  );
  const [filterQuery, setFilterQuery] = useState(""); // string to show summary of applied filters on top of search bar.
  const [searchQuery, setSearchQuery] = useState("");
  const [searchString, setSearchString] = useState(
    initSearchData ? initSearchData.searchStringObj : ""
  );

  const [recipeList, setRecipeList] = useState<any>([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const { state } = useLocation();

  let searchObj = {
    searchStringObj: searchString,
    appliedFiltersObj: filtersData,
  };

  if (state) {
    //  console.log(state.filters);
  }

  if (!window.sessionStorage.getItem("searchSessionData")) {
    //  console.log("Creating new Cookie");
    window.sessionStorage.setItem(
      "searchSessionData",
      JSON.stringify(searchObj)
    );
  }

  // console.log("Cookier");
  //console.log(window.sessionStorage.getItem("searchSessionData"));

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
      filterString =
        filterString + "Cusine type: " + appliedFilters.cuisine + "\n";
    }
    if (appliedFilters.diet != "") {
      filterString = filterString + " Diet type: " + appliedFilters.diet + "\n";
    }
    if (appliedFilters.excludeIngredients) {
      filterString = filterString + "Not including any: ";
      appliedFilters.excludeIngredients.forEach(
        (item: string, index: number) => {
          if (index < appliedFilters.excludeIngredients.length - 1)
            filterString = filterString + item + ", ";
          else filterString = filterString + item + " ";
        }
      );
    }
    setFilterQuery(filterString);
    setFiltersData(appliedFilters);
    return appliedFilters;
  };

  /* use the below onSubmit function */

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    setLoadingResults(true);
    if (props.getLoadingState) props.getLoadingState(true);
    console.log(data);
    let query = "";
    let searchQuery = data.searchString.trim();
    if (searchQuery != "") {
      setSearchString(searchQuery.toString());

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
    searchObj.appliedFiltersObj = filtersData;
    searchObj.searchStringObj = searchQuery;
    window.sessionStorage.setItem(
      "searchSessionData",
      JSON.stringify(searchObj)
    );

    axios
      .get(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
          sk +
          "&instructionsRequired=true&addRecipeInformation=true&" +
          query +
          "&number=10"
      )
      .then(function(response) {
        console.log(
          "Request Sent \n " + response.status + "\n" + response.config.url
        );
        if (response.data) {
          console.log(response.data);
          if (props.getNewRecipeList) {
            props.getNewRecipeList(response.data);
          }
          console.log("Hit");
          navigate("/search", {
            state: {
              searchData: searchObj,
              searchQuery: query,
              recipeList: response.data,
            },
          });
          setLoadingResults(false);
          if (props.getLoadingState) props.getLoadingState(false);

          setRecipeList([]);
        }
      })
      .catch(function(error) {
        setLoadingResults(false);
        if (props.getLoadingState) props.getLoadingState(false);

        console.log(error);
      })
      .then(function() {
        setLoadingResults(false);
        if (props.getLoadingState) props.getLoadingState(false);

        console.log("DONE");
      });
  };

  return (
    <form style={{ padding: 2 }} onSubmit={handleSubmit(onSubmit)}>
      <p>{filterQuery}</p>
      <GBox style={{ padding: 8 }} direction="row-responsive">
        <input
          {...register("searchString")}
          //color={"#F1EFEA"}
          color={"#FFFFFF"}
          disabled={loadingResults}
          defaultValue={searchString != "" ? searchString : ""}
          style={{
            height: 54,
            fontSize: 24,
            borderRadius: 25,
            marginRight: 20,
            background: "#FFFFFF",
          }}
          placeholder="Search For Recipes"
        />
        <GBox direction="row" style={{ justifyContent: "center" }}>
          {loadingResults ? (
            <Zoom in={true}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BounceLoader color="#faba2c" size={55} />
              </div>
            </Zoom>
          ) : (
            <>
              <div style={{ borderRadius: 100 }}>
                <IconButton
                  style={{
                    marginLeft: 5,
                    background: "#faba2c",
                    color: "#FFFFFF",
                  }}
                  size="large"
                  onClick={handleSubmit(onSubmit)}
                >
                  <SearchIcon fontSize="inherit" />
                </IconButton>
              </div>
              <div style={{ borderRadius: 100 }}>
                <IconButton
                  style={{
                    marginLeft: 5,
                    background: "#A64A35",
                    color: "#FFFFFF",
                  }}
                  size="large"
                  onClick={() => setShowModal(true)}
                >
                  <FilterListIcon fontSize="inherit" />
                </IconButton>
              </div>
            </>
          )}
        </GBox>
      </GBox>

      <Modal
        open={showModal}
        onClose={() => handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={modalStyle}>
          <FiltersForm
            filters={filtersData}
            getFilterQuery={getFiltersData}
          ></FiltersForm>

          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
            }}
          >
            <IconButton
              onClick={() => setShowModal(false)}
              color="error"
              size="large"
              style={{
                padding: 1,
                background: "#FFFFFF",
                left: 300,
                bottom: 10,
              }}
            >
              <CancelIcon fontSize={"large"} style={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </Box>
      </Modal>
    </form>
  );
}
