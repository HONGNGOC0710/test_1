/** @format */

const fs = require("fs");
const path = require("path");

let pathname = path.join(process.cwd(), "corpus", "hemingway.txt");

class Corpus {
	dictionary = {};
	words = [];
	cache = {};

	constructor(pathname) {
		let content = fs.readFileSync(pathname).toString();
		content = content.replace(/[0-9,"*:._\r\n()?/\]/\[]/g, " ");

		let tmp = content
			.split(" ")
			.map((item) => item.trim())
			.filter((item) => item != "");

		this.words = [...new Set(tmp)];

		this.load();
		console.log("Load Done");
	}

	load() {
		let tmp = this.words;
		this.dictionary = {};
		tmp.forEach((word, index) => {
			let l = word.length;
			let fistChar = word[0].toLowerCase();
			let endChar = word[word.length - 1].toLowerCase();

			let label = `${l}${fistChar}${endChar}`;

			if (Array.isArray(this.dictionary[`${label}`])) {
				this.dictionary[`${label}`].push(word);
			} else {
				this.dictionary[`${label}`] = [word];
			}
		});
	}

	search(word) {
		//query in cache
		let query = this.queryCache(word);

		if (query) return query;

		let result = [];

		let l = word.length;
		let fistChar = word[0].toLowerCase();
		let endChar = word[word.length - 1].toLowerCase();

		let keys = Object.keys(this.dictionary);

		let label = `${l}${fistChar}${endChar}`;

		//search full key
		if (Array.isArray(this.dictionary[`${label}`])) {
			result = result.concat(this.dictionary[`${label}`]);
		}

		if (result.length >= 3) {
			this.setCache(word, result.slice(0, 3));
			return result.slice(0, 3);
		}

		//search by length & first char
		label = `${l}${fistChar}`;

		let tmpKeys = keys.filter((item) => item.indexOf(label) != -1);

		for (let i = 0; i < tmpKeys.length; i++) {
			if (Array.isArray(this.dictionary[`${tmpKeys[i]}`])) {
				result = result.concat(this.dictionary[`${tmpKeys[i]}`]);
				if (result.length >= 3) {
					this.setCache(word, result.slice(0, 3));
					return result.slice(0, 3);
				}
			}
		}

		if (result.length >= 3) return result.slice(0, 3);

		//search by have same child string
		for (let i = word.length; i >= 1; i--) {
			let key = word.slice(0, i);
			let tmp = this.words.filter((item) => item.indexOf(key) != -1);
			result = result.concat(tmp);
			if (result.length >= 3) {
				this.setCache(word, result.slice(0, 3));
				return result.slice(0, 3);
			}
		}

		return [];
	}

	remove(word) {
		let remove = "";
		//remove the most similar word in words
		for (let i = word.length; i >= 1; i--) {
			let key = word.slice(0, i);
			for (let j = 0; j < this.words.length; j++) {
				if (this.words[j].indexOf(key) != -1) {
					remove = this.words[j];
					this.words = this.words.filter((item) => item != remove);
					this.load();
					this.cleanCache();
					return remove;
				}
			}
		}

		return remove;
	}

	update(word) {
		this.words.push(word);
		this.load();
		this.cleanCache();
	}

	cleanCache() {
		this.cache = {};
	}

	setCache(word, result) {
		this.cache[`${word}`] = result;
	}

	queryCache(word) {
		if (Array.isArray(this.cache[`${word}`])) {
			return this.cache[`${word}`];
		}

		return false;
	}
}

let corpus = new Corpus(pathname);

module.exports = { corpus };
