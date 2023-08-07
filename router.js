/** @format */

const router = require("express").Router();
const { search, update, remove } = require("./controller");

router.route("/search").get(search).post(update).delete(remove);

module.exports = {
	router,
};
