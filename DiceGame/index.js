
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
  }

document.addEventListener("DOMContentLoaded", () => {

  var player1 = getRandomInt(1,7);
  var player2 = getRandomInt(1,7);

  document.querySelector(".img1").setAttribute("src", "images/dice" + player1 + ".png");
  document.querySelector(".img2").setAttribute("src", "images/dice" + player2 + ".png");

  const heading = document.querySelector("h1"); // Select the first <h1> element
  var outcome= "Its a tie!"
  if (player1 > player2){
    outcome= "Player 1 wins"
  }
  else if (player1< player2){
    outcome= "Player 2 wins"
  }
  heading.textContent = outcome; // Change the text content of the <h1>
});