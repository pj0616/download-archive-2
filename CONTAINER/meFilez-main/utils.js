const jwt = require("jsonwebtoken");
const key = require("./config/keys");

const createToken = (user) => {
  const _id = user._id;
  const expiresIn = 259200 * 1000;
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, key.secretOrKey, {
    expiresIn,
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
};

module.exports.createToken = createToken;
