const mongoose = require("mongoose");

const contactModel = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		fullname: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
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
