const pool = require("../config/db");

const saveProfile = async (profile) => {
  const query = `
    INSERT INTO github_profiles
    (
      username,
      name,
      followers,
      following,
      public_repos,
      account_age_days,
      followers_per_repo,
      popularity_score,
      top_repo,
      top_repo_stars
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      followers = VALUES(followers),
      following = VALUES(following),
      public_repos = VALUES(public_repos),
      account_age_days = VALUES(account_age_days),
      followers_per_repo = VALUES(followers_per_repo),
      popularity_score = VALUES(popularity_score),
      top_repo = VALUES(top_repo),
      top_repo_stars = VALUES(top_repo_stars)
  `;

  await pool.query(query, [
    profile.username,
    profile.name,
    profile.followers,
    profile.following,
    profile.public_repos,
    profile.account_age_days,
    profile.followers_per_repo,
    profile.popularity_score,
    profile.top_repo,
    profile.top_repo_stars,
  ]);
};

const getAllProfiles = async () => {
  const [rows] = await pool.query("SELECT * FROM github_profiles");

  return rows;
};

const getProfileByUsername = async (username) => {
  const [rows] = await pool.query(
    "SELECT * FROM github_profiles WHERE username = ?",
    [username],
  );

  return rows[0];
};

module.exports = {
  saveProfile,
  getAllProfiles,
  getProfileByUsername,
};
