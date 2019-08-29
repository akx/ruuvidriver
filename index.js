const Ruuvi = require("./node-ruuvitag");
const tagDatas = {};
let ruuvi = null;

function init() {
  if (ruuvi) {
    return false;
  }
  ruuvi = new Ruuvi();
  ruuvi.on("found", tag => {
    console.log(`Found tag ${tag.id}`);
    tag.on("updated", data => {
      tagDatas[tag.id] = { ...data, ts: +new Date() };
    });
  });
  return true;
}

function stop() {
  if (ruuvi) {
    ruuvi.stop();
    ruuvi = null;
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
