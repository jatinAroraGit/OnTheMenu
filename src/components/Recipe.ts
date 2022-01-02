export default class Recipe {
  id: string = "";
  title: string = "N/A";
  image: string = "../img/defaultRecipeImage.jpg";
  summary: string = "N/A";
  sourceName: string = "N/A";
  sourceUrl: string = "N/A";
  pricePerServing: string = "N/A";
  extendedIngredients: string[] = [];
  analyzedInstructions: string[] = [];
  cuisines: string[] = ["N/A"];
  diets: string[] = ["N/A"];
  dishTypes: string[] = ["N/A"];
  servings: string = "N/A";
  readyInMinutes: string = "N/A";
}
