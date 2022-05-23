const { Router } = require("express");

const ModuleController = require("../controllers/module.controller.js");

const adminMiddleware = require("../middlewares/admin.middleware.js");

class ModuleRoute {
  constructor() {
    this.path = "/modules";
    this.router = Router();
    this.init();
  }
  moduleController = new ModuleController();

  init() {
    this.router.get(`${this.path}/`, this.moduleController.getSites);
    this.router.post(
      `${this.path}/create`,
      adminMiddleware,
      this.moduleController.create
    );
    this.router.get(`${this.path}/:moduleId`, this.moduleController.getSite);
    this.router.patch(
      `${this.path}/update/:moduleId`,
      adminMiddleware,
      this.moduleController.update
    );
    this.router.delete(
      `${this.path}/delete/:moduleId`,
      adminMiddleware,
      this.moduleController.delete
    );
  }
}

module.exports = ModuleRoute;
