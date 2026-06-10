const axios = require("axios");

const fetchGithubProfile = async (username) => {
  const userResponse = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const repoResponse = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  const user = userResponse.data;
  const repos = repoResponse.data;

  const accountAgeDays = Math.floor(
    (Date.now() - new Date(user.created_at)) /
      (1000 * 60 * 60 * 24)
  );

  const followersPerRepo =
    user.public_repos > 0
      ? (user.followers / user.public_repos).toFixed(2)
      : 0;

  let topRepo = null;
  let maxStars = 0;

  repos.forEach((repo) => {
    if (repo.stargazers_count > maxStars) {
      maxStars = repo.stargazers_count;
      topRepo = repo.name;
    }
  });

  const popularityScore =
    user.followers * 2 + user.public_repos;

  return {
    username: user.login,
    name: user.name,
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    account_age_days: accountAgeDays,
    followers_per_repo: followersPerRepo,
    popularity_score: popularityScore,
    top_repo: topRepo,
    top_repo_stars: maxStars,
  };
};

module.exports = {
  fetchGithubProfile,
};