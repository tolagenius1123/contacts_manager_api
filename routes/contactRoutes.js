const express = require("express");
const router = express.Router();
const {
	getContacts,
	getAContact,
	createContact,
	updateContact,
	deleteContact,
} = require("../controller/contactController");

router.get("/", getContacts);

router.get("/:id", getAContact);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

module.exports = router;
