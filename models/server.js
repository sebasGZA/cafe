const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.usersPath = "/api/user";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parse body with JSON
    this.app.use(express.json());

    //Public Dir
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Runing on port: ${this.port}`);
    });
  }
}

module.exports = Server;
