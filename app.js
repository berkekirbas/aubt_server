const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const { NODE_ENV, PORT } = require("./config/index.js");

const mongoose = require("mongoose");

class App {
  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || "production";
    this.port = PORT || 8080;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    //this.initializeErrorHandling();
  }

  async listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(
          `Uygulama  ${this.env === "production" ? "Yayımda" : "Geliştirmede"}`
        );
        console.log(`Uygulama ${this.port} portta çalışıyor`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async connectToDB() {
    await mongoose
      .connect(
        "mongodb+srv://berke:berke07@aubt.o7lzu.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,

          // remove poolSize or set according to your need
          // read docs before setting poolSize
          // default to 5
        }
      )
      .then(() => {
        console.log("MongoDB ye bağlantı kuruldu");
      })
      .catch((error) => {
        console.log(error);
      });
    await this.listen();
  }

  initializeMiddlewares() {
    //this.app.use("trust proxy");
    this.app.use(
      cors({
        origin: "localhost:3000",
        credentials: true,
        origin: true,
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.disable("x-powered-by");
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Credentials", true);
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
      );
      next();
    });
  }

  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });

    // 404 route
    this.app.use("*", (_request, response) => {
      response.status(404).json({ message: "Not Found" });
    });
  }

  /* initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }*/
}

module.exports = App;
