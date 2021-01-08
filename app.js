// To Fetch the data from server
// https://api.publicapis.org/entries?category

findApi();

async function findApi() {
  loader();
  // used to trim the input "science and technology" to "science"

  const cors = `https://cors-anywhere.herokuapp.com/`;
  deleteRows();
  try {
    let url = await fetch(`https://api.publicapis.org/entries?category`);
    let jsonFile = await url.json();
    console.log(jsonFile);
    displayData(jsonFile.entries);
  } catch (error) {
    console.log(error);
    // alert("Too many requests,Please try later");
  }
}

// async function for categories

async function findApiCategory(input) {
  loader();
  deleteRows();
  // used to trim the input "science and technology" to "science"
  //const cors = `https://cors-anywhere.herokuapp.com/`;
  // console.log(encodeURIComponent(input));
  let inputValue = selectOption.value.split(" ")[0];
  try {
    let url = await fetch(
      `https://api.publicapis.org/entries?category=${input}`
    );
    let jsonFile = await url.json();
    console.log(jsonFile);
    displayData(jsonFile.entries);
  } catch (error) {
    console.log(error);
    // alert("Too many requests,Please try later");
  }
}

// Select event listener for dropdown selection
let selectOption = document.querySelector("select");

selectOption.addEventListener("change", () => {
  // let inputValue = selectOption.value.split(" ")[0];
  let inputValue = selectOption.value;
  if (inputValue == "All") {
    findApi();
  } else {
    findApiCategory(inputValue);
    // findApiCategory(encode(inputValue));
  }
});

// rendering html

const displayData = (data) => {
  removeLoader();
  data.forEach((element) => {
    let html = `
   
    <tr class="animate__animated animate__fadeIn">
          <td>${element.API}</td>
          <td>${element.Description}</td>
          <td>${checkAuth(element.Auth)}</td>
          <td>${element.HTTPS}</td>
          <td>${element.Cors}</td>

          <td><a href="${
            element.Link
          }" target="_blank"><img src="./images/icons8-link.svg"</a></td>
        </tr>
   `;

    document.querySelector(".all-data").insertAdjacentHTML("beforeend", html);
  });
};

// replacing empty auth with "none"
function checkAuth(auth) {
  if (auth === "") {
    return "None";
  } else {
    return auth;
  }
}

// to delete rows before printing new
function deleteRows() {
  let tableLength = document.querySelector(".result-table").rows.length;
  // console.log(tableLength);
  for (var i = tableLength - 1; i > 0; i--) {
    document.querySelector(".result-table").deleteRow(i);
  }
}

// Custom encoude function to encode url parameter with special character &
function encode(input) {
  return input.split(" ").join("+").replace("&", "%26");
}

function loader() {
  html = `
  <div class="roller">
  <img src ="./images/rolling.gif">
  </div>`;
  document.querySelector(".tbod").insertAdjacentHTML("afterbegin", html);
}

function removeLoader() {
  document.querySelector(".roller").remove();
}
