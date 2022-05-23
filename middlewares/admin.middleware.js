const jwt = require("jsonwebtoken");

const adminMiddleware = async (request, response, next) => {
  const token =
    request.cookies["token"] ||
    (request.header("token")
      ? request.header("token").split("Bearer ")[1]
      : null);

  if (token) {
    const secretKey =
      "ef12286fd8beba60bb1e25b5c42bbff2bc96f9cd29c454ff16613704cd48be10bd4ffe7e9c01728e04d9a70679f5eefee23936d2e1423339ea8ee4935834ce2b";
    const data = await jwt.verify(token, secretKey);

    if (data === "berke07") {
      return next();
    }
    return response.status(401).json({ message: "Not Authorised" });
  } else {
    return response.status(401).json({ message: "Not Authorised" });
  }
};

module.exports = adminMiddleware;
