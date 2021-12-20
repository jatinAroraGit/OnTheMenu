import React, { useState } from "react";
import "../App.css";
import Zoom from "@mui/material/Zoom";
import autocomplete from "autocompleter";
import { Box as GBox } from "grommet";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Padding } from "@mui/icons-material";
type Inputs = {
  example: string;
  exampleRequired: string;
  ingredient: string;
};
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
export default function FiltersForm() {
  let [ingredientsList, setIngredientsList] = useState<any>([]);
  let [value, setValue] = useState("");
  let [errorText, setErrorText] = useState<string>("");
  let [filterIngredients, setFilterIngredients] = useState<any>([]);
  let [showSection, setShowSection] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  /*Get Request with body prams for getting ingrdeients for autocomplete options
  Example URL : https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=[key]&query=appl&number=5
  */
  let getIngredient = (query: any) => {
    console.log("Getting Ingrdients for " + query);
    query = query.trim();
    if (query != "") {
      setValue(query);
      /**/

      axios
        .get(
          "https://apii.spoonacular.com/food/ingredients/autocomplete?apiKey=" +
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
    console.log(data);

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
      }

      setValue("");
      setShowSection(true);
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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <GBox direction="column">
      <form style={{ padding: 2 }} onSubmit={handleSubmit(onSubmit)}>
        <Box style={{ maxWidth: 300 }}>
          {filterIngredients.length > 0 && showSection ? (
            filterIngredients.map((item: any, index: number) => {
              return (
                <Zoom in={showSection}>
                  <Chip
                    key={item}
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
            <Box style={{ marginBottom: 40 }}></Box>
          )}
        </Box>

        <GBox style={{ margin: 5 }} direction="row">
          <Autocomplete
            style={{ padding: 0 }}
            size="small"
            clearOnBlur={false}
            inputMode="text"
            inputValue={value}
            noOptionsText="Hit enter to add"
            // options={ingredientsList.map((ingredient: any) => ingredient.name)}
            options={mockList.map((ingredient: any) => ingredient.name)}
            renderInput={(params) => (
              <TextField
                multiline={false}
                color="secondary"
                style={{ width: 300, height: 5 }}
                {...params}
                placeholder="Enter ingredient"
                onKeyPress={(event) => {
                  if (event.key == "Enter") {
                    console.log("Adding on enter");
                    updateIngredientFilters(value);
                    setValue("");
                  }
                }}
              />
            )}
            onInputChange={(event: any, formValue: string, reason: any) => {
              setErrorText("");
              if (reason == "input") {
                getIngredient(formValue);
              } else if (reason == "reset" && value != "") {
                console.log("auto adding");
                updateIngredientFilters(formValue);
              }
            }}
          />
        </GBox>
        <div style={{ margin: 4, marginBottom: 16 }}>
          <p
            style={{
              position: "absolute",
              color: "#D32F2F",
              fontWeight: "bold",
            }}
          >
            {errorText}
          </p>
        </div>
        <FormGroup>
          <FormControlLabel control={<Checkbox name="vegan" />} label="Vegan" />
        </FormGroup>
        <GBox direction="row">
          <input
            style={{ width: "fit-content", marginTop: 6 }}
            type="checkbox"
            placeholder="Is in country"
          />
          <p style={{ padding: 0, margin: 0 }}>Gluten Free</p>
        </GBox>
        <GBox direction="row">
          <input
            style={{ width: "fit-content", marginTop: 6 }}
            type="checkbox"
            placeholder="Is in country"
          />
          <p style={{ padding: 0, margin: 0 }}>Vegetarian</p>
        </GBox>
        <GBox direction="row">
          <input
            style={{ width: "fit-content", marginTop: 6 }}
            type="checkbox"
            placeholder="Is in country"
          />
          <p style={{ padding: 0, margin: 0 }}>Keto</p>
        </GBox>
        <Snackbar
          open={false}
          autoHideDuration={2000}
          message="Note archived"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        <Button type="submit">Apply filters</Button>
      </form>
    </GBox>
  );
}
