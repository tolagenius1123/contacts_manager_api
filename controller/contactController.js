const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");

const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find({ user: req.user.id });

	res.status(200).json(contacts);
});

const getAContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findById(id);

	const user = await User.findById(req.user.id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact does not exist");
	}

	// Check for user
	if (!user.id) {
		res.status(401);
		throw new Error("User not found");
	}

	// make sure the logged in user matches the goal user
	if (contact.user.toString() !== user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
	const { fullname, phoneNumber, address } = req.body;

	if (!fullname || !phoneNumber || !address) {
		res.status(400);
		throw new Error("All fields are required");
	}

	const newContact = await Contact.create({
		fullname,
		phoneNumber,
		address,
		user: req.user.id,
	});
	res.status(200).json(newContact);
});

const updateContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}

	const user = await User.findById(req.user.id);

	// Check for user
	if (!user.id) {
		res.status(401);
		throw new Error("User not found");
	}

	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}

	const user = await User.findById(req.user.id);

	// Check for user
	if (!user.id) {
		res.status(401);
		throw new Error("User not found");
	}

	// make sure the logged in user matches the goal user
	if (contact.user.toString() !== user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	await contact.deleteOne({ _id: id });
	res.status(200).json({ id: id });
});

module.exports = {
	getContacts,
	getAContact,
	createContact,
	updateContact,
	deleteContact,
};
