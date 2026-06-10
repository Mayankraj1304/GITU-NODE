const githubService = require("../services/githubService");
const profileModel = require("../models/profileModel");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await githubService.fetchGithubProfile(username);

    await profileModel.saveProfile(profile);

    // Return the saved profile directly to the client
    return res.status(200).json({
      success: true,
      message: "Profile analyzed and saved",
      data: profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.getAllProfiles();

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await profileModel.getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
};
