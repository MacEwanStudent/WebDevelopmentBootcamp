import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";


dotenv.config();

const app = express();
const port = parseInt(process.env.APP_LISTEN) || 3000;
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // path to layout.ejs
console.log(port);

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

db.connect();

// Load all quiz questions once
let quiz = [];

db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: 'rimuru-secret-slime-core',
  resave: false,
  saveUninitialized: true,
}));

// Helper function: pick a random country
function nextQuestion() {
  return quiz[Math.floor(Math.random() * quiz.length)];
}

// GET: Start screen to choose lives
app.get("/", (req, res) => {
  res.render("start.ejs"); // We'll create this file too
});

// POST: Setup game with lives
app.post("/start", (req, res) => {
  const lives = parseInt(req.body.lives);
  req.session.lives = lives;
  req.session.score = 0;
  req.session.helperMode = req.body.helperMode === 'on';
  req.session.question = nextQuestion();
  res.redirect("/quiz");
});

// GET: Show quiz
app.get("/quiz", (req, res) => {
  if (req.session.lives <= 0) {
    return res.render("gameover.ejs", {
      score: req.session.score
    });
  }

  res.render("index.ejs", {
    question: req.session.question,
    totalScore: req.session.score,
    helperMode: req.session.helperMode,
    currentLives: req.session.lives
  });
});

 //Handles The Game Over
 app.get("/gameover", (req, res) => {
  res.render("gameover.ejs", {
    score: req.session.score || 0
  });
});

// POST: Handle answer
app.post("/submit", (req, res) => {
  const userAnswer = req.body.answer.trim().toLowerCase();
  const correctAnswer = req.session.question.capital.toLowerCase();

  let isCorrect = false;

  if (userAnswer === correctAnswer) {
    req.session.score++;
    isCorrect = true;
  } else {
    req.session.lives--;
    if (req.session.lives <= 0) {
      return res.redirect("/gameover");
    }
  }
 
  

  req.session.helperMode = req.body.helperMode === "on";
  req.session.question = nextQuestion();

  res.render("index.ejs", {
    question: req.session.question,
    wasCorrect: isCorrect,
    totalScore: req.session.score,
    helperMode: req.session.helperMode,
    currentLives: req.session.lives
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
