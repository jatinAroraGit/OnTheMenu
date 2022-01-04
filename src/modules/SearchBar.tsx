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
  width: 300,
};
export default function SearchBar(props: any) {
  let navigate = useNavigate();
  let showSuggestions = props.showSuggestions ? props.showSuggestions : false;
  let appliedFilters = {
    excludeIngredients: [],
    cuisine: "",
    diet: "",
  };

  let initSearchData: any;
  if (props.searchData) {
    initSearchData = props.searchData;
  } else if (window.sessionStorage.getItem("searchSessionData")) {
    let sessionJSON = "";
    sessionJSON = window.sessionStorage.getItem("searchSessionData") || "";
    let searchSessionData = JSON.parse(sessionJSON);

    initSearchData = searchSessionData;
  } else initSearchData = null;

  const [showModal, setShowModal] = useState(false);
  const [filtersData, setFiltersData] = useState(
    initSearchData ? initSearchData.appliedFiltersObj : appliedFilters
  );

  let buildFilterQuery = () => {
    let filterString = "Filtering by ";
    let filterFlag = false;
    if (filtersData.cuisine != "") {
      filterFlag = true;
      filterString =
        filterString + "Cusine type: " + filtersData.cuisine + "\n";
    }
    if (filtersData.diet != "") {
      filterFlag = true;
      filterString = filterString + " Diet type: " + filtersData.diet + "\n";
    }
    if (filtersData.excludeIngredients.length > 0) {
      filterFlag = true;
      filterString = filterString + "Not including any: ";
      filtersData.excludeIngredients.forEach((item: string, index: number) => {
        if (index < filtersData.excludeIngredients.length - 1)
          filterString = filterString + item + ", ";
        else filterString = filterString + item + " ";
      });
    }
    if (filterFlag) {
      return filterString;
    } else {
      return filterString + " None";
    }
  };
  const [filterQuery, setFilterQuery] = useState(buildFilterQuery()); // string to show summary of applied filters on top of search bar.
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

  if (!window.sessionStorage.getItem("searchSessionData")) {
    window.sessionStorage.setItem(
      "searchSessionData",
      JSON.stringify(searchObj)
    );
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  let getFiltersData = (filterData: any) => {
    let filterFlag = false;
    let filterString = `Filtering by `;

    setShowModal(false);
    appliedFilters.excludeIngredients = filterData.excludeIngredients;
    appliedFilters.cuisine = filterData.cuisine;
    appliedFilters.diet = filterData.diet;

    if (appliedFilters.cuisine != "") {
      filterFlag = true;
      filterString =
        filterString + "Cuisine type: " + appliedFilters.cuisine + " \n ";
    }
    if (appliedFilters.diet != "") {
      filterFlag = true;
      filterString = filterString + " Diet type: " + appliedFilters.diet + "\n";
    }
    if (appliedFilters.excludeIngredients.length > 0) {
      filterFlag = true;
      filterString = filterString + "Not including any: ";
      appliedFilters.excludeIngredients.forEach(
        (item: string, index: number) => {
          if (index < appliedFilters.excludeIngredients.length - 1)
            filterString = filterString + item + ", ";
          else filterString = filterString + item + " ";
        }
      );
    }
    if (filterFlag) {
      setFilterQuery(filterString);
    } else {
      setFilterQuery(filterString + " \n None ");
    }
    setFiltersData(appliedFilters);
    return appliedFilters;
  };
  const quickSearch = (query: string) => {
    setSearchString(query);
    let data = {
      searchString: query,
    };
    onSubmit(data);
  };
  /* use the below onSubmit function */

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    setLoadingResults(true);
    if (props.getLoadingState) props.getLoadingState(true);
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
          "&number=15"
      )
      .then(function(response) {
        if (response.data) {
          if (props.getNewRecipeList) {
            props.getNewRecipeList(response.data);
          }
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
      })
      .then(function() {
        setLoadingResults(false);
        if (props.getLoadingState) props.getLoadingState(false);
      });
  };

  return (
    <form
      style={{ padding: 0, width: window.screen.width - 80 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {loadingResults ? (
        <Zoom in={true}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BounceLoader color="#faba2c" size={55} />
          </div>
        </Zoom>
      ) : (
        <>
          <p>{filterQuery}</p>

          <GBox style={{ padding: 0, margin: 0 }} direction="row-responsive">
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
                marginRight: 15,
                width: window.screen.width - 80,
                background: "#FFFFFF",
              }}
              placeholder="Search "
            />
            <GBox direction="column" style={{ alignSelf: "center" }}>
              <GBox direction="row" style={{ marginBottom: 6 }}>
                <div style={{ borderRadius: 100 }}>
                  <IconButton
                    style={{
                      margin: 0,
                      marginRight: 2,
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
                      margin: 0,
                      marginLeft: 2,
                      background: "#A64A35",
                      color: "#FFFFFF",
                    }}
                    size="large"
                    onClick={() => setShowModal(true)}
                  >
                    <FilterListIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </GBox>
            </GBox>
          </GBox>
        </>
      )}

      {showSuggestions && (
        <GBox
          direction="column"
          style={{ justifyContent: "space-between", marginTop: 20 }}
        >
          <GBox direction="column" style={{ marginRight: 90 }}>
            <h3 style={{ margin: 2 }}>Top Searches</h3>

            <GBox direction="row">
              <Chip
                onClick={(value: any) => quickSearch(value.target.outerText)}
                color="primary"
                disabled={loadingResults}
                style={{ margin: 2, fontSize: 20, width: "fit-content" }}
                label="Pasta"
              />
              <Chip
                onClick={(value: any) => quickSearch(value.target.outerText)}
                color="primary"
                disabled={loadingResults}
                style={{ margin: 2, fontSize: 20, width: "fit-content" }}
                label="Pizza"
              />
              <Chip
                onClick={(value: any) => quickSearch(value.target.outerText)}
                color="primary"
                disabled={loadingResults}
                style={{ margin: 2, fontSize: 20, width: "fit-content" }}
                label="Salads"
              />
            </GBox>
          </GBox>
          <GBox direction="column" style={{ marginLeft: 0 }}>
            <h3 style={{ margin: 2 }}>For the sweet tooth</h3>

            <GBox
              direction="row"
              style={{
                width: "fit-content",
                padding: 0,
              }}
            >
              <Chip
                onClick={(value: any) => quickSearch(value.target.outerText)}
                color="primary"
                disabled={loadingResults}
                style={{ margin: 2, fontSize: 20, width: "fit-content" }}
                label="Cake"
              />
              <Chip
                onClick={(value: any) => quickSearch(value.target.outerText)}
                color="primary"
                disabled={loadingResults}
                style={{ margin: 2, fontSize: 20, width: "fit-content" }}
                label="Pudding"
              />
            </GBox>
          </GBox>
        </GBox>
      )}
      <Modal
        open={showModal}
        onClose={() => handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
        disableEnforceFocus={true}
        disableRestoreFocus={true}
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
                left: 128,
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
