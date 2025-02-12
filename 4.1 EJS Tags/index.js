import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {

  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  console.log(`Current Time: ${hours}:${minutes}:${seconds}`);

  const data = {
    title: "EJS Tags",
    seconds: seconds,
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
