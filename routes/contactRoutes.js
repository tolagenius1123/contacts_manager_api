const express = require("express");
const router = express.Router();
const {
	getContacts,
	getAContact,
	createContact,
	updateContact,
	deleteContact,
} = require("../controller/contactController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getContacts);

router.get("/:id", protect, getAContact);

router.post("/", protect, createContact);

router.put("/:id", protect, updateContact);

router.delete("/:id", protect, deleteContact);

module.exports = router;
