export default function Ruffini() {
  let currentDiv, coefs, coefsCount, usedDivs, results, varInd, exit;

  const countDivs = function () {
    let i = 0;
    for (let d = 1; d <= varInd; d++) {
      if (varInd % d === 0) {
        i++;
      }
    }
    return i * 2;
  };
  const getDivs = function () {
    const divCount = countDivs();
    let divs = [];
    for (let d = 1; d <= divCount; d++) {
      if (varInd % d === 0) {
        divs.push(d);
        divs.push(-d);
      }
    }
    return divs;
  };
  const newCurrentDiv = function (divs, usedDivs) {
    const count = countDivs();
    for (let i = 0; i < count; i++) {
      if (divs[i] !== usedDivs[i]) {
        return divs[i];
      }
    }
    return 0;
  };
  const grill = function () {
    let sums = [];
    let prod = [0]; //always prod[0] === 0
    currentDiv = newCurrentDiv(getDivs(), usedDivs);
    //grill (ruffini) process
    for (let i = 0; i < coefsCount; i++) {
      //sum
      sums[i] = coefs[i] + prod[i];
      if (i < coefsCount - 1) {
        //multiplication
        prod[i + 1] = currentDiv * sums[i];
      }
    }
    checkGrill(sums, prod);
  };
  const checkGrill = function (sums, prod) {
    //if there aren't divs left
    if (currentDiv === 0 && !exit) {
      exit = 1;
    }
    //if a grill iteration was sucessfull
    if (sums[coefsCount - 1] === 0 && !exit) {
      saveResults(sums, prod);
      coefsCount--;
      if (coefsCount === 1) {
        exit = 2;
      }
      restart(sums);
      grill();
    }
    //if a grill iteration wasn't sucessful
    if (sums[coefsCount - 1] !== 0 && !exit) {
      usedDivs.push(currentDiv);
      grill();
    }
  };
  const saveResults = function (sums, prod) {
    if (results.length == 0) {
      //first result
      results.push({ coefs, prod, sums, coefsCount, currentDiv });
    } else {
      results.push({ prod, sums, coefsCount, currentDiv });
    }
  };
  const restart = function (sums) {
    usedDivs = [];
    coefs = [];
    coefs = [...sums];
  };
  const calculate = function (coefsArray) {
    coefs = Array.from(coefsArray);
    coefsCount = coefsArray.length;
    usedDivs = [];
    results = [];
    varInd =
      coefs[coefsCount - 1] > 0
        ? coefs[coefsCount - 1]
        : -coefs[coefsCount - 1];
    exit = currentDiv = undefined;
    grill();
    return results;
  };
  return {
    calculate,
  };
}
