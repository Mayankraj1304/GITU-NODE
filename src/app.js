const express = require("express");
const githubRoutes = require("./routes/githubRoutes");

const app = express();

app.use(express.json());

app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API");
});

module.exports = app;