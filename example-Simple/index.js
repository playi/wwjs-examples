import WonderJS from 'wonderjs';

let robot;
let connectBtn = document.getElementById("connect");
let illuminateEyeBtn = document.getElementById("illuminateEye");

// When robot is connected, initialize the robot variable.
WonderJS.addEventListener("onconnect", rbt => {
	robot = rbt;
	illuminateEyeBtn.disabled = false;
});

// Find surrounding robot and prompts the user to connect.
connectBtn.addEventListener("click", () => {
	WonderJS.connect();
});

// Randomly illuminate the eye ring with full brightness (1.0).
illuminateEyeBtn.addEventListener("click", () => {
	robot.command.eyering([zeroOrOne(), zeroOrOne(), zeroOrOne(),
		zeroOrOne(), zeroOrOne(), zeroOrOne(), zeroOrOne(),
		zeroOrOne(), zeroOrOne(), zeroOrOne(), zeroOrOne(), zeroOrOne()],
		1.0);
});

// Returns either integer 0 or 1.
function zeroOrOne() {
	return Math.round(Math.random());
}