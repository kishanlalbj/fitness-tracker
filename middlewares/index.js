const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user, refresh = false) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      refresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET,
      { expiresIn: refresh ? "1y" : "1h", audience: new String(user.id) },
      (err, token) => {
        if (err) {
          if (err.name === "JsonWebTokenError")
            reject(createHttpError.Unauthorized());
          else reject(createHttpError.InternalServerError());
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateAccessToken
};
