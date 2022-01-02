import React, { useState, useEffect } from "react";
import "../App.css";
import Zoom from "@mui/material/Zoom";
import { Box as GBox } from "grommet";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Select as MaterialSelect, ThemeContext } from "grommet";
import { cuisineList, dietList } from "./Lists";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
let mockList = [
  { name: "apple" },
  { name: "apricot" },
  { name: "apple sauce" },
  { name: "corn" },
  { name: "cod" },
  { name: "cornstarch" },
];

const sk = process.env.REACT_APP_ALPHANUMERIC_CODE;
const baseURL = process.env.BASE_URL;
export default function FiltersForm(props: any) {
  let [ingredientsList, setIngredientsList] = useState<any>([]);
  let [value, setValue] = useState("");
  let [errorText, setErrorText] = useState<string>("");
  let [filterIngredients, setFilterIngredients] = useState<any>(
    props.filters.excludeIngredients ? props.filters.excludeIngredients : []
  );
  // let [showSection, setShowSection] = useState(true);
  let [cuisineType, setCuisineType] = useState(props.filters.cuisine);
  let [dietType, setDietType] = useState(props.filters.diet);
  let [showSnack, setShowSnack] = useState(false);
  let ssValue: string = "";
  console.log(props);
  let cuisines: string[] = cuisineList;
  let appliedFilters = {
    excludeIngredients: [],
    cuisine: "",
    diet: "",
  };
  let diets: string[] = dietList;
  if (props.filters) {
    console.log("Applyin Pre Exisiting Filters");
    appliedFilters = {
      excludeIngredients: props.filters.excludeIngredients,
      cuisine: props.filters.cuisine,
      diet: props.filters.dietType,
    };
    if (props.filters.excludeIngredients) console.log("not empty");
  } else {
    appliedFilters = {
      excludeIngredients: filterIngredients,
      cuisine: cuisineType,
      diet: dietType,
    };
  }

  const { handleSubmit, control, reset } = useForm();

  let getIngredient = (query: any) => {
    console.log("Getting Ingrdients for " + query);
    query = query.trim();
    if (query != "") {
      setValue(query);

      axios
        .get(
          "https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=" +
            sk +
            "&query=" +
            query +
            "&number=10"
        )
        .then(function(response) {
          if (response.data) setIngredientsList(response.data);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          console.log("DONE");
        });
      /**/
    } else {
      console.log("Empty Query");
    }
  };

  let updateIngredientFilters = (data: any) => {
    data = data.trim();

    if (data != "") {
      data = data.toLowerCase();
      let isItemDuplicate = filterIngredients.includes(data);
      console.log(
        "Adding " + data + " to list. Is it a duplicate: " + isItemDuplicate
      );

      if (!isItemDuplicate) {
        filterIngredients.push(data);
      } else {
        console.log("Already added !");
        setErrorText("Already Added");
        setShowSnack(true);
      }

      setValue("");
      // setShowSection(true);
    } else {
      setValue("");
      console.log("Error. Empty Value");
    }
  };

  let deleteIngredientFilter = (index: number) => {
    let arr = filterIngredients;
    arr.splice(index, 1);
    console.log(arr);
    setFilterIngredients([...arr]);
  };

  let updateCusisineType = (data: string) => {
    if (data) {
      data = data.trim();
      console.log("Cuisine Type : " + data);
      setCuisineType(data);
    }
  };

  let updateDietType = (data: string) => {
    if (data) {
      data = data.trim();
      console.log("Diet Type : " + data);
      setDietType(data);
    }
  };
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("REACT HOOK FORM SUBMITTING");
    /*
    let query = "";
    if (filterIngredients.length > 0) {
      appliedFilters.excludeIngredients = filterIngredients;
    } else if (filterIngredients.length == 0) {
      appliedFilters.excludeIngredients = [];
    }
    if (cuisineType != "") {
      appliedFilters.cuisineType = cuisineType;
    }
    if (dietType != "") {
      appliedFilters.dietType = dietType;
    }
    console.log("Applied Filters OBJ = ");
    console.log(appliedFilters);
    props.getFilterQuery(appliedFilters);
    */
  };
  const clearFilters = () => {
    appliedFilters.excludeIngredients = [];
    appliedFilters.cuisine = "";
    appliedFilters.diet = "";
    props.getFilterQuery(appliedFilters);
  };
  const submitFilters = () => {
    let query = "";
    if (filterIngredients.length > 0) {
      appliedFilters.excludeIngredients = filterIngredients;
    } else if (filterIngredients.length == 0) {
      appliedFilters.excludeIngredients = [];
    }
    //if (cuisineType != "")
    appliedFilters.cuisine = cuisineType;

    //if (dietType != "")
    appliedFilters.diet = dietType;

    props.getFilterQuery(appliedFilters);
  };

  return (
    <GBox direction="column">
      <h3 style={{ textAlign: "center", marginTop: 2 }}>FILTERS</h3>
      <GBox style={{ margin: 5 }} direction="column">
        <p style={{ margin: 1 }}>Exclude Ingredients</p>
        <Box style={{ maxWidth: 300, position: "relative" }}>
          {filterIngredients.length > 0 ? (
            filterIngredients.map((item: any, index: number) => {
              return (
                <Zoom key={index} in={true}>
                  <Chip
                    key={index}
                    style={{
                      margin: 1,

                      background: "#E53935",
                      color: "#FFFFFF",
                    }}
                    variant="outlined"
                    onDelete={() => deleteIngredientFilter(index)}
                    label={item}
                  />
                </Zoom>
              );
            })
          ) : (
            <Box style={{ marginBottom: 1 }}></Box>
          )}
        </Box>

        <Autocomplete
          style={{ padding: 0, margin: 0, marginTop: 4 }}
          size="small"
          clearOnBlur={false}
          popupIcon={false}
          inputMode="text"
          inputValue={value}
          noOptionsText="Hit enter to add"
          // options={ingredientsList.map((ingredient: any) => ingredient.name)}
          options={ingredientsList.map((ingredient: any) => ingredient.name)}
          renderInput={(params) => (
            <TextField
              multiline={false}
              color="info"
              style={{ width: 300 }}
              {...params}
              placeholder="Enter ingredient"
              onKeyPress={(event) => {
                console.log("**** ENTER EVENT *******");
                console.log(event);
                if (event.key == "Enter") {
                  console.log("Adding on enter");
                  updateIngredientFilters(value);
                  setValue("");
                }
              }}
            />
          )}
          onInputChange={(event: any, formValue: string, reason: any) => {
            if (reason == "input") {
              getIngredient(formValue);
            } else if (reason == "reset" && value != "") {
              console.log("auto adding");
              updateIngredientFilters(formValue);
            }
          }}
        />
      </GBox>

      <GBox direction="column">
        <p style={{ marginBottom: 2, marginLeft: 5 }}>Cuisine</p>
        <GBox direction="row" style={{ marginLeft: 5 }}>
          <ThemeContext.Extend
            value={{
              select: { icons: { color: "#546E7A" } },
              global: {
                drop: { zIndex: "2400" },
              },
            }}
          >
            <MaterialSelect
              style={{
                color: "#000000",
                height: 40,
                width: 265,
                fontWeight: "normal",
              }}
              options={cuisines}
              placeholder="Select Cuisine"
              value={cuisineType}
              onChange={(val) => updateCusisineType(val.option)}
            />
            <IconButton
              onClick={() => setCuisineType("")}
              size="small"
              color="secondary"
              style={{ margin: 5, marginRight: 0, marginLeft: 10, padding: 5 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </ThemeContext.Extend>
        </GBox>
      </GBox>
      <GBox direction="column" style={{ zIndex: 2105 }}>
        <p style={{ marginBottom: 2, marginLeft: 5 }}>Diet Type</p>
        <GBox direction="row" style={{ marginLeft: 5 }}>
          <ThemeContext.Extend
            value={{
              select: {
                icons: { color: "#546E7A" },
              },
              global: {
                drop: { zIndex: "2400" },
                hover: { background: "#C94C30" },
              },
            }}
          >
            <MaterialSelect
              //    {...register("diet")}
              style={{
                color: "#000000",
                height: 40,
                width: 265,
                fontWeight: "normal",
              }}
              options={diets}
              value={dietType}
              placeholder="Select a Diet"
              onChange={(val) => updateDietType(val.option)}
            />
            <IconButton
              onClick={() => setDietType("")}
              size="small"
              color="secondary"
              style={{ margin: 5, marginRight: 0, marginLeft: 10, padding: 5 }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </ThemeContext.Extend>
        </GBox>
      </GBox>

      <Snackbar
        open={showSnack}
        autoHideDuration={2000}
        message={errorText}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setShowSnack(false)}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
        className="row"
      >
        <Button
          style={{ margin: 10 }}
          variant="outlined"
          onClick={() => submitFilters()}
        >
          Apply
        </Button>
        <Button
          style={{ margin: 10 }}
          variant="outlined"
          color="secondary"
          onClick={() => clearFilters()}
        >
          Clear
        </Button>
      </div>
    </GBox>
  );
}
