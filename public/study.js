// main.js copy
let trash = document.getElementsByClassName("fa-trash-can");
let deckInput = document.querySelector(".deckInput");
let input = document.querySelector(".input");
let button = document.querySelector(".button");
let deckButton = document.querySelector(".deckButton");
let deckCreation = document.getElementById("deckCreation");
let cardAddition = document.getElementById("cardAddition");
let createDeckModal = document.getElementById("myModal");
let addCardsModal = document.getElementById("myModalTwo");
let btn = document.getElementById("myBtn");
let x = document.getElementsByClassName("close")[0];
let deck = document.querySelector(".deck");

input.addEventListener("input", function () {
  if (input.value.length > 1) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    let letter =
      this.parentNode.parentNode.childNodes[1].childNodes[3].innerText;
    letter = letter.trim();
    //let newLetter = word.replace(/\s/g, ""); // gets rid of extra space in span, so we just get the innerText
    console.log(letter);
    fetch("deletePost", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        letter: letter,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});

// deckButton.addEventListener("click", function () {
//   cardAddition.style.display = "block";
// });
deck.addEventListener("click", function () {
  cardAddition.style.display = "block";
});
deck.addEventListener("click", function () {
  addCardsModal.style.display = "block";
});

btn.addEventListener("click", function () {
  createDeckModal.style.display = "block";
});
x.addEventListener("click", function () {
  createDeckModal.style.display = "none";
});
