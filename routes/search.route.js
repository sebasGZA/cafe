const { Router } = require("express");

//Controllers
const { search } = require("../controllers");

const router = Router();

//Methods
router.get("/:collection/:term", search);

module.exports = router;
