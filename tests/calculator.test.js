import test from "node:test";
import assert from "node:assert/strict";
import { addNumbers, formatResult } from "../src/calculator.js";

test("addNumbers adds two positive numbers", () => {
  assert.equal(addNumbers(2, 3), 5);
});

test("addNumbers converts numeric text before adding", () => {
  assert.equal(addNumbers("10", "15"), 25);
});

test("addNumbers supports decimal numbers", () => {
  assert.equal(addNumbers(1.5, 2.25), 3.75);
});

test("formatResult keeps integers clean", () => {
  assert.equal(formatResult(12), "12");
});

test("formatResult rounds decimal output to two digits", () => {
  assert.equal(formatResult(3.756), "3.76");
});
