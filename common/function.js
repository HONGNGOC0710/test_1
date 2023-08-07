/** @format */

const validSingleWord = (key) => {
	let tmp = key.trim().split(" ");
	return tmp.length == 1 ? true : false;
};

module.exports = {
	validSingleWord,
};
