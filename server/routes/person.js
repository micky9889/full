const express = require("express");
const router = express.Router();

//import controllers
const { create, list, update, read, remove } = require("../controllers/person");

//import middleware
const { auth } = require("../middleware/auth");
const { upload } = require("../middleware/uploadFile");

// localhost:8000/api/create
router.get("/person", auth, list);
router.get("/person/:id", auth, read);
router.post("/person", auth,upload, create);
router.put("/person/:id", auth, update);
router.delete("/person/:id", auth, remove);

module.exports = router;
