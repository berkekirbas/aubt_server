const { Router } = require("express");

const AuthController = require("../controllers/auth.controller.js");

const adminMiddleware = require("../middlewares/admin.middleware.js");

class AuthRoute {
  authController = new AuthController();
  constructor() {
    this.path = "/auth";
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post(`${this.path}/login`, this.authController.login);
    this.router.post(
      `${this.path}/logout`,
      adminMiddleware,
      this.authController.logout
    );
    this.router.get(`${this.path}/check`, this.authController.checkAuth);
  }
}

module.exports = AuthRoute;
