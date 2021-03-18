const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/home_page");

router.get("/", homePageController.renderHomePage);
router.post("/", homePageController.sendData);

module.exports = router