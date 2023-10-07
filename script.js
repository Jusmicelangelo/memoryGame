

document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("game");

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }
  let allUp = 0
  let count = 0
  let score = 0
  let fCard = null
  let sCardColor = null
  let fCardColor = null
  let sCard = null
  let lowestScore = localStorage.getItem("lowestScore")


  function scoreKeeping () {
    let scoreKeeper = document.querySelector("h2")
    scoreKeeper.innerText = `Score: ${score} Lowest Score: ${lowestScore}`
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    // secures that only 2 cards at one time can be seen
    if (count === 2) return;
    // uncovers the div 
    let currentCard = event.target
    currentCard.style.backgroundColor = currentCard.classList[0]
    currentCard.classList.add(".flipped")

    if (currentCard.classList.contains(".flipped")) {
      count += 1
      allUp += 1
      score += 1
      scoreKeeping()
      
    }
    // saves the event Object for the first Card unveil
    if (count === 1) {
      fCard = currentCard
      fCardColor = fCard.classList[0]
    }
    // saves the event Object for the second Card unveil
    if (count === 2) {
      sCard = currentCard
      sCardColor = sCard.classList[0]
    }
    // secures that if you click the unveiled cards again, you do not get a match and be sure to always unveil 2
    // at the same time
    if (sCard === fCard) {
      count = 1
      return
    }

    if (count === 2 && fCardColor === sCardColor && fCard !== sCard) {
      console.log("We have a match")
      sCard.removeEventListener("click", handleCardClick);
      fCard.removeEventListener("click", handleCardClick);
      count = 0
    } 
    else if (count === 2 && fCardColor !== sCardColor) {
      setTimeout(function() {
        console.log("We do NOT have a match")
        sCard.style.backgroundColor = ""
        fCard.style.backgroundColor = "" 
        sCard.classList.remove(".flipped")
        fCard.classList.remove(".flipped") 
        count = 0
        allUp -=2
      }, 1000)    
    } 
  if (allUp === COLORS.length) {
    alert("Game is Over!")
    if (score < lowestScore) {
      localStorage.setItem("lowestScore", score)
    }
    location.reload()
  }
  }  
  // when the DOM loads
  // if button "start" is pressed the function below is executed
  let btn = document.querySelector("button")
  btn.addEventListener("click", function() {
    createDivsForColors(shuffledColors)
  btn.disabled = true;  
  }) 
})
