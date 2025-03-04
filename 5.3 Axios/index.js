import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let result =[];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  try {
    const { category, questions } = req.body; // Extract user inputs

    // Construct the API request URL
    let apiUrl = "";
    if (category===''){
      apiUrl = `https://opentdb.com/api.php?amount=${questions}&type=boolean`;
    }
    else{
      apiUrl = `https://opentdb.com/api.php?amount=${questions}&category=${category}&type=boolean`;
    }
    // Make the API request with Axios
    const response = await axios.get(apiUrl);
    result = response.data;

    // Log the fetched data
    console.log("Fetched Trivia Questions:", result);

    // Send the data back to the frontend (optional)
    res.render("index.ejs", { data: result.results }); 
  } catch (error) {
    console.error("Failed to fetch trivia questions:", error.message);
    res.render("index.ejs", { error: error.message });
    console.log(error.message);
  }
});

app.post("/answer", (req, res) => {
  const { questionIndex, selectedAnswer } = req.body; // Get user answer
  console.log("Correct answer", result);
  console.log("Selected ANswer", selectedAnswer);
  const correctAnswer = result.results[Number(questionIndex)].correct_answer; // Get correct answer
  
  let message;
  if (selectedAnswer === correctAnswer) {
    message = "Correct! 🎉";
  } else {
    message = `Wrong! ❌ The correct answer was: ${correctAnswer}`;
  }
  console.log(message);
  // Redirect back to home with feedback
  res.render("index.ejs", { data: result.results, message: message });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

