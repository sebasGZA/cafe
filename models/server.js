const express = require("express");
const cors = require("cors");

//db
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.paths = {
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
      searh: "/api/search",
      user: "/api/user",
    };

    this.dbConnect();

    this.middlewares();

    this.routes();
  }

  async dbConnect() {
    await dbConnection();
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
    this.app.use(this.paths.auth, require("../routes/auth.route"));
    this.app.use(this.paths.category, require("../routes/category.route"));
    this.app.use(this.paths.product, require("../routes/product.route"));
    this.app.use(this.paths.searh, require("../routes/search.route"));
    this.app.use(this.paths.user, require("../routes/user.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Runing on port: ${this.port}`);
    });
  }
}

module.exports = Server;
