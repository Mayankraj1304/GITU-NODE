const express = require("express");
const router = express.Router();

const githubController = require(
  "../controllers/githubController"
);

router.post(
  "/analyze/:username",
  githubController.analyzeProfile
);

router.get(
  "/profiles",
  githubController.getAllProfiles
);

router.get(
  "/profiles/:username",
  githubController.getSingleProfile
);

module.exports = router;