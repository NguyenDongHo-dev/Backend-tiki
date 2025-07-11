const jwt = require("jsonwebtoken");

const ganneralAccessToken = async (payloat) => {
  const accessToken = jwt.sign(
    {
      ...payloat,
    },
    process.env.key_access_token,
    { expiresIn: "30m" }
  );
  return accessToken;
};

const ganneralRefreshToken = async (payloat) => {
  const refresh_token = jwt.sign(
    {
      ...payloat,
    },
   process.env.key_refresh_token,
    { expiresIn: "365d" }
  );
  return refresh_token;
};
module.exports = {
  ganneralAccessToken,
  ganneralRefreshToken,
};
