import Ruffini from "./Ruffini.js";

let calculator = Ruffini();

test("Ex-1", () => {
  expect(calculator.calculate([1, -1, -14, 24])).toStrictEqual([
    {
      coefs: [1, -1, -14, 24],
      coefsCount: 4,
      currentDiv: 2,
      prod: [0, 2, 2, -24],
      sums: [1, 1, -12, 0],
    },
    { coefsCount: 3, currentDiv: 3, prod: [0, 3, 12], sums: [1, 4, 0] },
    { coefsCount: 2, currentDiv: -4, prod: [0, -4], sums: [1, 0] },
  ]);
});
test("Ex-2", () => {
  expect(calculator.calculate([1, 4, 5, 2])).toStrictEqual([
    {
      coefs: [1, 4, 5, 2],
      coefsCount: 4,
      currentDiv: -1,
      prod: [0, -1, -3, -2],
      sums: [1, 3, 2, 0],
    },
    { coefsCount: 3, currentDiv: -1, prod: [0, -1, -2], sums: [1, 2, 0] },
    { coefsCount: 2, currentDiv: -2, prod: [0, -2], sums: [1, 0] },
  ]);
});
test("Ex-3", () => {
  expect(calculator.calculate([1, -1, -7, 1, 6])).toStrictEqual([
    {
      coefs: [1, -1, -7, 1, 6],
      coefsCount: 5,
      currentDiv: 1,
      prod: [0, 1, 0, -7, -6],
      sums: [1, 0, -7, -6, 0],
    },
    {
      coefsCount: 4,
      currentDiv: -1,
      prod: [0, -1, 1, 6],
      sums: [1, -1, -6, 0],
    },
    { coefsCount: 3, currentDiv: -2, prod: [0, -2, 6], sums: [1, -3, 0] },
    { coefsCount: 2, currentDiv: 3, prod: [0, 3], sums: [1, 0] },
  ]);
});
test("Ex-4", () => {
  expect(calculator.calculate([1, 0, -3, -2])).toStrictEqual([
    {
      coefs: [1, 0, -3, -2],
      coefsCount: 4,
      currentDiv: -1,
      prod: [0, -1, 1, 2],
      sums: [1, -1, -2, 0],
    },
    { coefsCount: 3, currentDiv: -1, prod: [0, -1, 2], sums: [1, -2, 0] },
    { coefsCount: 2, currentDiv: 2, prod: [0, 2], sums: [1, 0] },
  ]);
});
test("Ex-5", () => {
  expect(calculator.calculate([1, 0, 0, -1])).toStrictEqual([
    {
      coefs: [1, 0, 0, -1],
      coefsCount: 4,
      currentDiv: 1,
      prod: [0, 1, 1, 1],
      sums: [1, 1, 1, 0],
    },
  ]);
});
