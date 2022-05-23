const jwt = require("jsonwebtoken");

class AuthController {
  async login(request, response) {
    try {
      const { username, password } = request.body;
      if (username !== "admin" || password !== "berke07") {
        return response
          .status(400)
          .json({ message: "Kullanıcı adı ya da şifre yanlış." });
      }

      const token = jwt.sign(
        "berke07",
        "ef12286fd8beba60bb1e25b5c42bbff2bc96f9cd29c454ff16613704cd48be10bd4ffe7e9c01728e04d9a70679f5eefee23936d2e1423339ea8ee4935834ce2b"
      );

      response.cookie("token", token, {
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });

      return response.status(200).json({ message: "Başarıyla giriş yapıldı" });
    } catch (error) {
      return response.status(500).json({ message: "Birşeyler ters gitti." });
    }
  }

  async logout(request, response) {
    try {
      await response.clearCookie("token");
      return response.status(200).json({ message: "Başarıyla çıkış yapıldı." });
    } catch (error) {
      return response.status(500).json({ message: "Birşeyler ters gitti" });
    }
  }

  async checkAuth(request, response) {
    try {
      const token = request.cookies["token"];

      if (token) {
        const secretKey =
          ef12286fd8beba60bb1e25b5c42bbff2bc96f9cd29c454ff16613704cd48be10bd4ffe7e9c01728e04d9a70679f5eefee23936d2e1423339ea8ee4935834ce2b;
        const data = await jwt.verify(token, secretKey);

        if (data === "berke07") {
          return response.status(200).json({ message: true });
        }
        return response.status(401).json({ message: false });
      } else {
        return response.status(401).json({ message: false });
      }
    } catch (error) {
      return response.status(500).json({ message: "Birşeyler ters gitti." });
    }
  }
}
module.exports = AuthController;
