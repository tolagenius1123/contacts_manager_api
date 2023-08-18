const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

const router = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

app.use(express.json());
app.use(errorHandler);
connectDB();

// MIDDLEWARE
app.use("/api/contacts", router);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// app.get("/api/contacts", (req, res) => {
// 	res.status(200).json({ message: "GET contacts" });
// });
