const jwt = require("jsonwebtoken");

// NEED TO ADD .ENV FILE WITH SECRET AT SOME POINT
const secret = "Will-be-changed-to-env-variable";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
