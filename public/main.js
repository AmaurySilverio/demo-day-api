let trash = document.getElementsByClassName("fa-trash-can");
let input = document.querySelector(".input");
let button = document.querySelector(".button");

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
