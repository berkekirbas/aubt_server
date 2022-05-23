const App = require("./app.js");
const ModuleRoute = require("./routes/module.routes.js");
const AuthRoute = require("./routes/auth.routes.js");

const app = new App([new ModuleRoute(), new AuthRoute()]);
async function start() {
  // await app.connectToDB();
  await app.listen();
}
start();
module.exports = app;
