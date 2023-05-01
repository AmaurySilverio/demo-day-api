let trash = document.getElementsByClassName("fa-trash");
let input = document.querySelector(".input");
let button = document.querySelector(".button");
// let liveTranslation = document.querySelector(".liveLink");

input.addEventListener("input", function () {
  if (input.value.length > 1) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});
// function searchLetters() {
//   let input = document.querySelector('.input').value;
//   input = input.replace(/\s/g, "")

// if (input === "") {
//   alert("Empty String. Try Again.");
// }

//   let url = `/letters/${input}`
//     fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       data.forEach((arr) => {
//         if (arr[0] == `${capitalizedState}`) {
//           stateName.innerText = arr[0];
//           population.innerText = arr[1];
//           checker = true;
//           return;
//         }
//       });
//       if (!checker) {
//         alert("Invalid State, Try Again.");
//       }
//     })
//     .catch((err) => {
//       console.log(`error ${err}`);
//     });
// }
// liveTranslation.addEventListener("click", () => {
//   fetch("liveTranslation", {
//     method: "get",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({}),
//   }).then(function (response) {
//     window.location.reload();
//   });
// });

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
