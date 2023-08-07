/** @format */

const input = document.getElementById("floatingInput");
const result = document.getElementById("result");
const hostname = "http://localhost:3000";

const search = async () => {
	let word = input.value;
	let url = hostname + `/api/search?key=${word}`;
	await fetch(url)
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				result.replaceChildren([]);
				res.data.map((item) => {
					result.insertAdjacentHTML("beforeend", `<li class="list-group-item">${item}</li>`);
				});
			} else {
				alert(`Find word error with: ${res.message}`);
			}
		})
		.catch((e) => {
			alert(`Find word error with: ${e.message}`);
		});
};

const update = async () => {
	let word = input.value;
	let url = hostname + `/api/search?key=${word}`;
	await fetch(url, {
		method: "POST",
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				alert(`Update word success`);
			} else {
				alert(`Update word error with: ${res.message}`);
			}
		})
		.catch((e) => {
			alert(`Update word error with: ${e.message}`);
		});
};

const remove = async () => {
	let word = input.value;
	let url = hostname + `/api/search?key=${word}`;
	await fetch(url, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				alert(`Remove word success with word:${res.data}`);
			} else {
				alert(`Remove word error with: ${res.message}`);
			}
		})
		.catch((e) => {
			alert(`Remove word error with: ${e.message}`);
		});
};
