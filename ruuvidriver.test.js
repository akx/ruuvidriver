describe("ruuvidriver", () => {
  it("is importable", () => {
    const rd = require(".");
    if (process.env.CIRCLECI) {
      return;  // there's no bluetooth hardware here
    }
    rd.init();
    rd.stop();
  });
});
