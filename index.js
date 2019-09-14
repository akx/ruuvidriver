const tagDatas = {};
let initialized = false;
const ruuvi = require("node-ruuvitag");

function init() {
  if (initialized) {
    return false;
  }
  ruuvi.on("found", tag => {
    console.log(`Found tag ${tag.id}`);
    tag.on("updated", data => {
      tagDatas[tag.id] = { ...data, ts: +new Date() };
    });
  });
  return true;
}

function getRuuvi() {
  return ruuvi;
}

function stop() {
  if (ruuvi) {
    ruuvi = null;
    initialized = false;
  }
}

function createApp() {
  const express = require("express");
  const app = express();
  app.get("/tags", (req, res) => res.json(tagDatas));
  app.get("/tag/:id", (req, res) => res.json(tagDatas[req.params.id]));
  return app;
}

module.exports.init = init;
module.exports.stop = stop;
module.exports.tagDatas = tagDatas;
module.exports.createApp = createApp;
module.exports.getRuuvi = getRuuvi;

// Being run from the command line?
if (module.parent === null) {
  require("dotenv").config();
  const port = parseInt(process.env.RUUVI_PORT || "52020", 10);
  const app = createApp();
  init();
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}
