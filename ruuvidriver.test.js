/* eslint-env jest */
describe("ruuvidriver", () => {
  it("is importable", () => {
    const rd = require(".");
    if (process.env.CI) {
      return; // there's no bluetooth hardware here
    }
    rd.init();
    rd.stop();
  });
});
