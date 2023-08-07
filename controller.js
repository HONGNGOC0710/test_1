/** @format */

const { validSingleWord } = require("./common/function");
const { corpus } = require("./corpus/load");

const search = (req, res, next) => {
	try {
		let { key } = req.query;

		let check = validSingleWord(key);

		if (!check)
			return res.status(400).json({
				status: false,
				message: "Key just single word",
			});

		let find = corpus.search(key);

		console.log(find);

		return res.send({
			status: true,
			data: find,
		});
	} catch (e) {
		return res.status(400).json({
			status: false,
			message: e.message,
		});
	}
};

const update = (req, res, next) => {
	try {
		let { key } = req.query;

		let check = validSingleWord(key);

		if (!check)
			return res.status(400).json({
				status: false,
				message: "Key just single word",
			});

		corpus.update(key);

		return res.send({
			status: true,
		});
	} catch (e) {
		return res.status(400).json({
			status: false,
			message: e.message,
		});
	}
};

const remove = (req, res, next) => {
	try {
		let { key } = req.query;

		let check = validSingleWord(key);

		if (!check)
			return res.status(400).json({
				status: false,
				message: "Key just single word",
			});

		const remove = corpus.remove(key);

		return res.send({
			status: true,
			data: remove,
		});
	} catch (e) {
		return res.status(400).json({
			status: false,
			message: e.message,
		});
	}
};

module.exports = {
	search,
	update,
	remove,
};
