const mongoose = require("mongoose");

const contactModel = mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Contact", contactModel);
