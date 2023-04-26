import "./styles/styles.css";
import Ruffini from "./components/Ruffini.js";

//accesibility nodes
const textInput = document.querySelector(".data_bar");
const searchButton = document.querySelector(".search_button");
const mainContent = document.querySelector(".content_wrapper");
const popupTrigger = document.querySelector(".popup_button");
const popupHeader = document.querySelector(".popup_header");
const popupText = document.querySelector(".popup_content");
const grid = document.querySelector(".grid");

//important functions and variables

function togglePopup(e) {
  popupHeader.textContent = e.name;
  popupText.textContent = e.message;
  popupTrigger.click();
}
function applyRuffini(e) {
  e.preventDefault();

  let coefs = [];
  let myCalc = Ruffini();
  let myResults;

  try {
    //get user coefs
    coefs = textInput.value
      .split(",")
      .filter((x) => x.trim().length && !isNaN(x))
      .map(Number);
    if (coefs.length < 1)
      throw new SyntaxError(
        "No se pudieron procesar adecuadamente los coeficientes, asegurese de ingresar números enteros separados por comas"
      );
    //calculate result
    myResults = myCalc.calculate(coefs);
    if (myResults.length === 0)
      throw new Error(
        "No se puede resolver aplicando Ruffini, se usaron todos los divisores sin alcanzar un resultado"
      );
    //show results
    startGrid();
    showResults(myResults);
  } catch (error) {
    togglePopup(error);
  }
}
function startGrid() {
  let nodeList = grid.querySelectorAll(".row");
  nodeList.forEach((node) => {
    node.remove();
  });
  mainContent.classList.remove("invisible"); //show maincontent
}
function showResults(data) {
  let colLength = data[0].coefs.length,
    rowLength = data.length * 2 + 1;
  grid.setAttribute("style", `grid-template-rows: repeat(${rowLength}, 1fr);`);
  for (let i = 0; i < data.length; i++) {
    //add coefs
    if (data[i].coefs) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute(
        "style",
        `grid-template-columns: repeat(${colLength}, 1fr);`
      );
      for (let j = 0; j < colLength; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = data[i].coefs[j];
        row.append(cell);
      }
      grid.append(row);
    }
    //add products
    if (data[i].prod) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute(
        "style",
        `grid-template-columns: repeat(${colLength}, 1fr);
        background-color: lightgray;`
      );
      for (let j = 0; j < colLength; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        if (data[i].prod[j]) {
          cell.textContent = data[i].prod[j];
        } else {
          //fill blanks spaces with zeros
          if (j === 0) cell.textContent = ` (${data[i].currentDiv}) 0`;
          else cell.textContent = 0;
        }
        row.append(cell);
      }
      grid.append(row);
    }
    //add sums
    if (data[i].sums) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute(
        "style",
        `grid-template-columns: repeat(${colLength}, 1fr);`
      );
      for (let j = 0; j < colLength; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        if (data[i].sums[j]) {
          cell.textContent = data[i].sums[j];
        } else {
          //fill blanks spaces with zeros
          cell.textContent = 0;
        }
        row.append(cell);
      }
      grid.append(row);
    }
  }
}
searchButton.addEventListener("click", applyRuffini);
