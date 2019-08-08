require("dotenv").config();
const express = require("express");
const ruuvi = require("./node-ruuvitag");
const app = express();

const tagDatas = {};

ruuvi.on("found", tag => {
  console.log(`Found tag ${tag.id}`);
  tag.on("updated", data => {
    tagDatas[tag.id] = { ...data, ts: +new Date() };
  });
});

app.get("/tags", (req, res) => res.json(tagDatas));
app.get("/tag/:id", (req, res) => res.json(tagDatas[req.params.id]));

const port = parseInt(process.env.RUUVI_PORT || "52020", 10);
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
