export function addNumbers(a, b) {
  return Number(a) + Number(b);
}

export function formatResult(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
