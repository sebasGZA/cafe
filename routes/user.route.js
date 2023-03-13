const { Router } = require("express");
const {
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);

router.post("/", postUser);

router.put("/:id", putUser);

router.patch("/:id", patchUser);

router.delete("/:id", deleteUser);

module.exports = router;
