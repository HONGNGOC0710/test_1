/** @format */

const express = require("express");
const http = require("http");
const { router } = require("./router");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(express.static("public"));

app.use(express.json());

app.use("/api", router);

app.use((req, res, next) => {
	res.status(404).json({
		status: false,
		message: "Not found",
	});
});

const server = http.createServer(app);

server.listen(3000, () => {
	console.log("Server listening port 3000");
});
