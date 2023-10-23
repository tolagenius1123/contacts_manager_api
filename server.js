const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const corsOptions = {
	origin: "http://localhost:3000", // Replace with your frontend's origin
};

app.use(express.json());
app.use(cors(corsOptions));
connectDB();

// MIDDLEWARE
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
