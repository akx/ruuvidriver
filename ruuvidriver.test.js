describe("ruuvidriver", () => {
  it("is initializable", () => {
    const rd = require(".");
    rd.init();
    rd.stop();
  });
});
