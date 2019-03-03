const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const app = express();
const ORIGIN = "https://fragdenstaat.de";

const parseWebsite = website => {
  const $ = cheerio.load(website);
  const shortUrl = $(".copy-text").val();
  if (shortUrl == null) return null;
  const lastIndex = shortUrl.lastIndexOf("/");
  return parseInt(shortUrl.substring(lastIndex + 1));
};

app.use("/", (req, res) => {
  request(ORIGIN + req.path, (error, response, body) => {
    if (error) res.sendStatus(400);
    const id = parseWebsite(body);
    if (id === null) res.sendStatus(400);
    else res.status(200).json(id);
  });
});

const server = app.listen(5000);

module.exports = server;
