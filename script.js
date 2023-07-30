var img = document.querySelector("img");
const btns = document.querySelectorAll(".btn");
const timer = document.querySelector(".timer");
const score = document.querySelector(".score");

const fetchData = async () => {
	const res = await fetch(
		`https://www.superheroapi.com/api.php/316688747589621/${
			Math.floor(Math.random() * (600 - 1 + 1)) + 1
		}`
	);
	const data = await res.json();
	return data;
};

let Data = [];
let correct = "";
let interval;
localStorage.setItem("score", score.innerText);

const timerFunc = (t = 11) => {
	let time = t;
	interval = setInterval(() => {
		time--;
		timer.innerText = time;
		if (time === 0) {
			clearInterval(interval);
			window.location.href = "http://localhost:59018//Gameover.html";
		}
	}, 1000);
	return interval;
};

function generateRange(pCount, pMin, pMax) {
	const min = pMin < pMax ? pMin : pMax;
	const max = pMax > pMin ? pMax : pMin;
	const resultArr = [];
	while (pCount > 0) {
		const randNumber = Math.round(min + Math.random() * (max - min));
		if (resultArr.indexOf(randNumber) === -1) {
			resultArr.push(randNumber);
			pCount--;
		}
	}
	return resultArr;
}

timerFunc();

for (let i = 0; i < 4; i++) {
	Data[i] = fetchData();
}

let random = Math.round(0 + Math.random() * (3 - 0));
Data[random].then((data) => {
	correct = data.name;
	img.src = data.image.url;
	console.log(correct);

	// Update the buttons after fetching the correct answer
	updateOptions();
});

const updateOptions = () => {
	Data.forEach((data, i) => {
		data.then((data) => {
			btns[i].innerText = data.name;
		});
	});
};

// check answer
btns.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		if (e.target.innerText === correct) {
			console.log("correct");
			score.innerText = parseInt(score.innerText) + 1;
			e.target.classList.add("btn-success");
			console.log(e.target);

			// Reset timer
			clearInterval(interval);
			timerFunc();

			setTimeout(() => {
				e.target.classList.remove("btn-success");
				updateGame();
			}, 2000);
		} else {
			console.log("wrong");
			e.target.classList.add("btn-danger");

			// add class bg-success to the correct answer button
			btns.forEach((btn) => {
				if (btn.innerText === correct) {
					btn.classList.add("btn-success");
				}
			});

			setTimeout(() => {
				window.location.href = "http://localhost:59018//Gameover.html";
			}, 2000);
		}
		localStorage.setItem("score", score.innerText);
	});
});

const updateGame = () => {
	Data = [];

	for (let i = 0; i < 4; i++) {
		Data[i] = fetchData();
	}

	random = Math.round(0 + Math.random() * (3 - 0));
	Data[random].then((data) => {
		correct = data.name;
		img.src = data.image.url;
		console.log(correct);

		// Update the buttons after fetching the correct answer
		updateOptions();
	});
};
