const express = require("express");
const {
	registerUser,
	loginUser,
	getUserData,
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUserData);

module.exports = router;
