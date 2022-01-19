import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import defaultRecipeImage from "../img/defaultRecipeImage.jpg";
import "../styles/forms.css";
import { Avatar, Box as GBox } from "grommet";
import Zoom from "@mui/material/Zoom";
import BounceLoader from "react-spinners/BounceLoader";
import { mockRecipe } from "../miscCode/mockRecipeData";
import ErrorIcon from "@mui/icons-material/Error";
const sk = process.env.REACT_APP_ALPHANUMERIC_CODE;
import Recipe from "./Recipe";
import stripTags from "striptags";
import { Stats } from "fs";

const styles = {
  recipeCardStyle: {
    background: "#FFFFFF",
    borderRadius: 20,
    margin: 0,
    padding: 7,
    paddingRight: 0,
    marginTop: 26,
    width: window.screen.width < 700 ? window.screen.width - 30 : 500,

    height: 160,
  },
  recipeImageStyle: {
    flexShrink: 0,
    borderWidth: 8,
    borderColor: "#c94c30",
    borderStyle: "solid",
    padding: 2,
    borderRadius: 100,
    margin: 10,
    marginTop: 3,
    marginRight: 0,
    width: 180,
    height: 180,
  },
  listItemStyle: {
    padding: 2,
    margin: 0,
    width: 150,
  },
  recipeStatsStyle: {
    padding: 0,
    margin: 0,
    justifyContent: "right",
  },
  ingredientsGridStyle: {
    padding: 0,
    margin: 0,
    justifyContent: "right",
    marginTop: 5,
    textAlign: "left",
  },
  boldParagraph: {
    margin: 0,
    color: "#000000",
    fontWeight: "500",
    fontSize: 14,
  },
  statsHeading: {
    margin: 0,
    marginTop: 4,
    fontWeight: "500",
    fontSize: 14,
    color: "#c94c30",
  },
  statsInfo: {
    margin: 1,
    marginLeft: 0,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 12,
  },
};

export default function ViewRecipe(props: any) {
  let path = window.location.pathname.split("/");
  let pathId = path[path.length - 1];
  let [recipeId, setRecipeId] = useState(
    pathId != "" ? pathId.toString() : props.recipeId
  );
  let [recipe, setRecipe] = useState(new Recipe());
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");

  let getRecipeDetails = async (id: string) => {
    let apiCall = true;
    let recipeDetail: any = new Recipe();
    if (!apiCall) {
      let testRecipe: any = new Recipe();
      testRecipe = mockRecipe;
      Object.keys(mockRecipe)
        .filter((key) => key in recipeDetail)
        .forEach((key) => {
          recipeDetail[key] = testRecipe[key];
        });

      recipeDetail.summary = stripTags(recipeDetail.summary);
      setRecipe(recipeDetail);
    }
    if (apiCall) {
      axios
        .get(
          "https://api.spoonacular.com/recipes/" +
            recipeId +
            "/information?apiKey=" +
            "3c2844b903bd4934ab1bd52863fdfbc6"
        )
        .then(function(response) {
          if (response.data) {
            let recipeDetail: any = new Recipe();

            Object.keys(response.data)
              .filter((key) => key in recipeDetail)
              .forEach((key) => {
                recipeDetail[key] = response.data[key];
              });
            recipeDetail.summary = stripTags(recipeDetail.summary);
            setRecipe(recipeDetail);
            return response.data;
          } else {
            setError(
              "There was an error getting the recipe details. Try reloading the page."
            );
            return 1;
          }
        })
        .catch(function(error) {
          setError(
            "We could not find any infromation for the Recipe you requested. Make sure you are connected to the internet or try refreshing."
          );
          return 2;
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (recipeId != "") {
      const fetchData = async () => {
        await getRecipeDetails(recipeId).then((data) => {
          setLoading(false);
        });
      };
      fetchData();
    }
  }, []);

  return (
    <GBox>
      <GBox
        style={{
          margin: 5,
          display: "flex",
          alignItems: "center",
          padding: 10,
        }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <BounceLoader color="#faba2c" size={85} />
          </div>
        )}
        {error != "" && !loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              variant="elevation"
              style={{ background: "#c94c30", borderRadius: 20, padding: 20 }}
            >
              <CardContent>
                <GBox direction="row">
                  <ErrorIcon fontSize="large" />
                  <h4 style={{ margin: 6 }}>Oops!</h4>
                </GBox>
                <p style={{ width: 300, fontWeight: "bold", fontSize: 16 }}>
                  {error}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {error == "" && !loading && recipe.id != "" && (
          <GBox
            elevation={"small"}
            direction="column"
            style={{
              background: "#FFFFFF",
              alignItems: "center",
              padding: 10,
              marginTop: 10,
              borderRadius: 20,
            }}
          >
            <GBox
              direction="row-responsive"
              align="center"
              style={{ alignItems: "center" }}
            >
              <img
                style={{
                  flexShrink: 0,
                  borderWidth: 8,
                  borderColor: "#c94c30",
                  borderStyle: "solid",
                  padding: 2,
                  borderRadius: 100,
                  margin: 10,
                  marginTop: 3,
                  marginRight: 0,
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                }}
                src={recipe.image}
              />
              <div
                style={{
                  textAlign: "center",
                  alignContent: "center",
                  padding: 0,
                  margin: 0,
                  marginTop: 0,
                }}
              >
                <h3
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 300,
                    color: "#c94c30",
                  }}
                >
                  {recipe.title}
                </h3>
                <p style={{ margin: 0, padding: 0 }}>
                  {recipe.sourceName != "" && (
                    <>
                      By{" "}
                      <a
                        target="_blank"
                        style={{ color: "#000000" }}
                        href={recipe.sourceUrl}
                      >
                        {recipe.sourceName}
                      </a>
                    </>
                  )}
                </p>
              </div>
            </GBox>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 6, sm: 6, md: 26, lg: 12 }}
              style={{
                padding: 10,
                margin: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                style={styles.recipeStatsStyle}
                container
                direction="column"
                item
                xs={2}
                sm={4}
                md={4}
              >
                <p style={styles.statsHeading}>Dish Type</p>
                <p style={styles.statsInfo}>
                  {recipe.dishTypes.length > 0 ? recipe.dishTypes[0] : "N/A"}
                </p>
              </Grid>

              <Grid
                style={styles.recipeStatsStyle}
                container
                direction="column"
                item
                xs={2}
                sm={4}
                md={4}
              >
                <p style={styles.statsHeading}>Cuisine</p>
                <p style={styles.statsInfo}>
                  {recipe.cuisines.length > 0 ? recipe.cuisines[0] : "N/A"}
                </p>
              </Grid>

              <Grid
                style={styles.recipeStatsStyle}
                direction="column"
                container
                item
                xs={2}
                sm={4}
                md={4}
              >
                <p style={styles.statsHeading}>Ready in minutes</p>
                <p style={styles.statsInfo}>
                  {recipe.readyInMinutes != "" ? recipe.readyInMinutes : "N/A"}
                </p>
              </Grid>
              <Grid
                style={styles.recipeStatsStyle}
                container
                direction="column"
                item
                xs={2}
                sm={4}
                md={4}
              >
                <p style={styles.statsHeading}>Servings</p>
                <p style={styles.statsInfo}>
                  {recipe.servings != "" ? recipe.servings : "N/A"}
                </p>
              </Grid>
              <Grid
                style={styles.recipeStatsStyle}
                direction="column"
                container
                item
                xs={2}
                sm={4}
                md={4}
              >
                <p style={styles.statsHeading}>Diet Type</p>
                <p style={styles.statsInfo}>
                  {recipe.diets.length > 0 ? recipe.diets[0] : "N/A"}
                </p>
              </Grid>
              <Grid
                style={styles.recipeStatsStyle}
                container
                direction="column"
                item
                xs={2}
                sm={4}
                md={4}
              >
                <p style={styles.statsHeading}>Per Serving Price</p>
                <p
                  style={{
                    margin: 1,
                    marginLeft: 0,
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  {recipe.pricePerServing != ""
                    ? recipe.pricePerServing
                    : "N/A"}
                </p>
              </Grid>
            </Grid>
            <div style={{ marginTop: 5, padding: 15 }}>
              <h4 style={{ textAlign: "center" }}>About The Recipe</h4>
              <p>{recipe.summary}</p>
            </div>

            <h3 style={{ marginBottom: 4 }}>Ingredients Needed</h3>
            <GBox direction="row-responsive" style={{ textAlign: "center" }}>
              <Grid
                container
                direction="row"
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 1, sm: 24, md: 24, lg: 12 }}
                style={{
                  padding: 10,
                  margin: 0,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {recipe.extendedIngredients.map((item: any) => {
                  return (
                    <Grid
                      style={{
                        padding: 0,
                        margin: 0,
                        justifyContent: "left",
                        marginTop: 5,
                        textAlign: "left",
                        display: "flex",
                      }}
                      item
                      xs={2}
                      sm={12}
                      md={6}
                      key={item.id}
                    >
                      <p style={styles.boldParagraph}>
                        {item.name} {"  "}
                        {Math.round(item.measures.metric.amount * 100) / 100}
                        {"  "} {item.measures.metric.unitShort}
                      </p>
                    </Grid>
                  );
                })}
              </Grid>
            </GBox>

            <GBox direction="column" style={{ textAlign: "left", padding: 5 }}>
              <h3 style={{ margin: 10, textAlign: "center" }}>
                Steps to follow
              </h3>
              {recipe.analyzedInstructions.map((item: any) => {
                return (
                  <>
                    <h4 style={{ margin: 1, padding: 1 }}>{item.name}</h4>
                    {item.steps.map((subItem: any) => {
                      return (
                        <p>
                          {subItem.number}
                          {". "} {subItem.step}
                        </p>
                      );
                    })}
                  </>
                );
              })}
            </GBox>
          </GBox>
        )}
      </GBox>
    </GBox>
  );
}
