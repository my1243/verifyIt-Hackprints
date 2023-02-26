const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", true);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log(`db connection successfully...`);
	})
	.catch((err) => {
		console.log(err);
	});
