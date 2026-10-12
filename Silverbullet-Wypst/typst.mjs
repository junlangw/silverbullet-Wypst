import { initialize, renderToString as render } from "./wypst.js";

// Load the wasm once, on first use, however many formulas render at the same time
let ready;

export async function renderToString(expression, options) {
  ready ??= initialize(new URL("./wypst.wasm", import.meta.url)).catch((error) => {
    ready = undefined;
    throw error;
  });
  await ready;
  return render(expression, options);
}
