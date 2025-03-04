import express from "express";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let recipes= null;
let init_buttons = {};
let data;
let choice;

// Function to load JSON data
const loadRecipes = () => {
  try {
    const json_data = fs.readFileSync("./public/recipe.json", "utf8");
    data = JSON.parse(json_data);
    console.log(data)

    if (!Array.isArray(data)) {
      throw new Error("Invalid format: recipes must be an array");
  }
  } catch (error) {
    console.error("Error loading recipes:", error);
    data =[];
  }
};

// Load recipes when the server starts
loadRecipes();


app.get("/", (req, res) => {
  res.render("index", { init_button : data, recipes : recipes  });
});

app.post("/recipe", (req, res) => {
  const choice= parseInt(req.body.choice);
  recipes= data[choice];
  console.log(data[choice]);
  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});