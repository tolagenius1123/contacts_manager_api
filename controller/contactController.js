const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
	const contacts = await Contact.find();

	res.status(200).json(contacts);
});

const getAContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact does not exist");
	}

	res.status(200).json(contact);
});

const createContact = asyncHandler(async (req, res) => {
	const { fullname, phoneNumber, address } = req.body;

	if (!fullname || !phoneNumber || !address) {
		res.status(400);
		throw new Error("All fields are required");
	}

	const newContact = await Contact.create({ fullname, phoneNumber, address });
	res.status(200).json(newContact);
});

const updateContact = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findById(id);

	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
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
