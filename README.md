# Wonder Workshop API
A documentation of javascript API functions available for Wonder Workshop's Dash, Dot, and Cue robots.

## Installation
1. Create and navigate to a new folder. If you do not already have a `package.json` file, run `npm init -y`
2. Run `npm install wonderjs` to download the Wonder Workshop API.
3. To import the API library, call `import WonderJS from 'wonderjs';` in your `.js` file.
4. Use a module bundler such as webpack to bundle your `js` files and `wonderjs` together.
5. Include the bundle file in your HTML file.
6. Navigate into `node_modules` folder and locate `wonderjs` folder. 
7. Copy `HALasm.js.mem` into public folder or the folder where you run your index.html

See the example folder for an example using React.

## List of all functions
* [connect()](#connect)
* [disconnect()](#disconnect)
* [addEventListener(string, function)](#addeventlistener)
* [eyering(bits, brightness)](#eyering)
* [rgbAll(r, g, b)](#rgball)
* [rgbEye(r, g, b)](#rgbeye)
* [rgbLeftEar(r, g, b)](#rgbleftear)
* [rgbRightEar(r, g, b)](#rgbrightear)
* [rgbChest(r, g, b)](#rgbchest)
* [rgbButtonMain(r, g, b)](#rgbbuttonmain)
* [sound(fileName, volume)](#sound)
* [headPan(degrees)](#headpan)
* [headTilt(degrees)](#headtilt)
* [linearAngular(cmPerSecond, degreesPerSecond)](#linearangular)
* [pose(x, y, angle, time)](#pose)
* [wheelSpeeds(leftWheelSpeed, rightWheelSpeed)](#wheelspeeds)

# Functions documentations
To use the WonderJS API, call:
```javascript
import WonderJS from 'wonderjs';
```

The following section will document the functions available in this library.
## `connect()`
Scans for surrounding Dash, Dot or Cue robot and prompts available robot to connect to.

E.g. 
```javascript
WonderJS.connect();
```

## `disconnect()`
Disconnect any connected robot.

E.g. 
```javascript
WonderJS.disconnect();
```
## `addEventListener(string, function)` <a name="addeventlistener">
Add a function that will be executed when a certain event triggers.

Event | `string` | `function`
-------------- | ----- | -------
Triggers the function when a robot is connected | `onconnect` | `(robot) => {//do something}` <br> The function takes in as argument the robot object that was just connected. A robot object has the following keys: `name`, `id`, `type`, `command`.
Triggers the function when a connected robot is disconnected | `ondisconnect` | `(robotId) => {//do something}` <br> The function takes in as argument the ID of the robot that was just disconnected.
Triggers the function when the robot's sensor value changes. This is likely to be triggered often as sensors such as accelerometer is constantly updating. | `onsensor` | `(robotId, sensors) => {//do something}` <br> The function takes in as argument the ID of the robot whose sensor values has changed, and the type of sensor that was changed. Refer to [sensors.md](sensors.md) for more details about sensors.

E.g. 
```javascript
let robot = null;
function updateSensors(id, sensors) {// do something}

WonderJS.addEventListener("onconnect", rbt => {robot = rbt;});
WonderJS.addEventListener("ondisconnect", {robot = null;});
WonderJS.addEventListener("onsensor", ({id, sensors})  => updateSensors(id, sensors));
```

## `Send Commands`
Sends a command to a connected robot for execution. 

All commands will follow the following skeleton format:
```javascript
let robot;
WonderJS.addEventListener("onconnect", rbt => {robot = rbt;});

// Send a command
robot.command.command_name(command specific parameters)
```

* ### `eyering(bits, brightness)` <a name="eyering">
Sends a command to illuminate the eye ring of the robot

bits | brightness
-----| -----
An array of 12 digits containing either 0 or 1, where 0 represents not targetting the section of the eye ring, and 1 represents targetting the section of the eye ring. Each index corresponds to a position in the eye ring. <br> E.g. `[1,1,1,1,1,1,1,1,1,1,0,1]` where 11 parts of the eye rings are targetted. | A float from 0-1, where 0 represents complete darkness, and 1.0 represents full brightness.

E.g.
```javascript
robot.command.eyering([0,1,1,0,1,1,1,1,1,1,0,1], 0.5);
```

* ### `rgbAll(r, g, b)` <a name="rgball" />
Sends a command to turn the light of the robot's left ear, right ear, chest light, main button and eye color (Dot only) to a specific color.

Note: The perceived colors from the robot's LEDs and a typical computer and mobile screens are often different. The robot's LED has a smaller color space.

r | g | b
--| - | -
The red value from 0-255. | The green value from 0-255. | The blue value from 0-255.

E.g.

```javascript
robot.command.rgbAll(130, 250, 30);
```

* ### `rgbEye(r, g, b)` <a name="rgbeye" />
Sends a command to turn the light of the robot's eye to a specific color. This only works on Dot robot.

r | g | b
--| - | -
The red value from 0-255. | The green value from 0-255. | The blue value from 0-255.

E.g.

```javascript
robot.command.rgbEye(130, 250, 30);
```

* ### `rgbLeftEar(r, g, b)` <a name="rgbleftear" />
Sends a command to turn the light of the robot's left ear to a specific color.

r | g | b
--| - | -
The red value from 0-255. | The green value from 0-255. | The blue value from 0-255.

E.g.

```javascript
robot.command.rgbLeftEar(120, 30, 40);
```

* ### `rgbRightEar(r, g, b)` <a name="rgbrightear" />
Sends a command to turn the light of the robot's right ear to a specific color.

r | g | b
--| - | -
The red value from 0-255. | The green value from 0-255. | The blue value from 0-255.

E.g.

```javascript
robot.command.rgbRightEar(0, 255, 255);
```

* ### `rgbChest(r, g, b)` <a name="rgbchest" />
Sends a command to turn the light of the robot's chest to a specific color.

r | g | b
--| - | -
The red value from 0-255. | The green value from 0-255. | The blue value from 0-255.

E.g.

```javascript
robot.command.rgbChest(40, 40, 40);
```

* ### `rgbButtonMain(r, g, b)` <a name="rgbbuttonmain" />
Sends a command to turn the light of the robot's main button to a specific color.

r | g | b
--| - | -
The red value from 0-255. | The green value from 0-255. | The blue value from 0-255.

E.g.

```javascript
robot.command.rgbButtonMain(40, 80, 255);
```

* ### `sound(fileName, volume)` <a name="sound" />
Sends a command for the robot to play a sound file at a particular volume.

fileName | volume
-------- | ------
A string representing the file to be played | A number from 0 to 1 representing the loudness of the volume.

Note: Dash, Dot, and Cue robot each comes loaded with different default sound files. For a full list of default sounds to be played, check out [sounds.md](sounds.md)

E.g.

```javascript
robot.command.sound("SYSTAREAWESOME", 0.8); // Dash sound
robot.command.sound("SYSTBIRTHDAY", 0.2); // Dot sound
robot.command.sound("SNPEAFAEXI", 1.0); // Cue sound
```

* ### `headPan(degrees)` <a name="headpan" />
Sends a command to pan the head left or right by a certain degree.

degrees |
-----|
A number that represents the degree of turning. By default, the robot has a degree of `0` when it is looking forward. A positive number will pan the head towards the left, whereas a negative number will pan the head towards the right.

Cue: -133 to 133

Dash: -120 to 120

E.g.
```javascript
robot.command.headPan(80);
robot.command.headPan(-105);
```

* ### `headTilt(degrees)` <a name="headtilt" />
Sends a command to tilt the robot head up or down by a certain degree.

degrees |
-----|
A number that represents the degree of tilting. By default, the robot has a degree of `0` when it is looking forward (untilted). A positive number will tilt the head downwards, whereas a negative number will tilt the head upwards.

Cue: -24 to 13

Dash: -22.5 to 7

E.g.
```javascript
robot.command.headTilt(6);
robot.command.headTilt(-10);
```

* ### `linearAngular(cmPerSecond, degreesPerSecond)` <a name="linearangular" />
Sends a command to move the robot.

Note: Make sure that the robot is not plugged in, otherwise this command will be ignored.

cmPerSecond | degreesPerSecond
-----| ----
A number that represents the speed to move the robot linearly. A positive number will move the robot forward, whereas a negative number will move the robot backward. | A number that turns the robot by a certain degree each second. A positive number will turn the robot to the left, whereas a negative number will turn the robot to the right.

E.g.
```javascript
robot.command.linearAngular(10, 0); // Move the robot linearly forward
robot.command.linearAngular(0, -60); // Turn the robot on the spot
robot.command.linearAngular(20, 30); // Move and turn the robot
robot.command.linearAngular(0, 0); // Halt the robot
```

* ### `pose(x, y, angle, time)` <a name="pose" />
Sends a command to move the robot to a specific location. Pose is a concept of moving the robot to a specific (x, y) coordinate rather than to specify how to move the robot. In Pose, we tell the robot the final destination, instead of guiding the robot towards the final destination.

Note: Make sure that the robot is not plugged in, otherwise this command will be ignored.

Coordinate Frame:

Forward           = +X

Left              = +Y

Counter-Clockwise = +Angle

```
        +X  (Forward)
         ^
         |         <-
         |            \
+Y <--- Robot  +Angle |
(Left)                /
```

x | y | angle | time
--| - | ----- | -----
A number. Positive x represents forward, wheareas negative x represents backward. | A number. Positive y represents left, whereas negative y represents right. | A number. Positive angle represents counter-clockwise, whereas negative number represents clockwise. | A number. Represents the duration of the pose command.

E.g.

```javascript
robot.command.pose(10, -20, 0, 3.5);
robot.command.pose(4, 30, -33, 8);

```

* ### `wheelSpeeds(leftWheelSpeed, rightWheelSpeed)` <a name="wheelspeeds" />
Sends a command to move the Robot's wheels at a particular speed.

Note: Make sure the Robot is not plugged in.

leftWheelSpeed | rightWheelSpeed
-------- | ------
A number to move the left wheel at a certain cm/s speed| A number to move the right wheel at a certain cm/s speed.

E.g.

```javascript
robot.command.wheelSpeeds(30, 0); // Move the left wheel at 30cm/s
robot.command.wheelSpeeds(0, 8); // Move the right wheel at 8cm/s
robot.command.wheelSpeeds(10, 12); // Move the left wheel at 10cm/s and the right wheel at 12cm/s
robot.command.wheelSpeeds(0, 0); // Stop both the left and right wheel
```

## Chain commmands
When you call 2 commands one after another, such as the following:

```javascript
// Attempt to turn the robot head 90 degrees and turn back to 0 degrees.
robot.command.headPan(90);
robot.command.headPan(0);
```
The net result will be that the robot will not turn its head at all since both commands get sent to the robot instantaneously.

To execute one command after another, you can consider 2 approaches.
1. Set a timer and execute one command after another.
2. Chaining commands using the like of Promise.

### Using a timer
One simple approach to execute one command after another would be to delay function call using a timer.

```javascript
// Turns the robot's head by 90 degrees
robot.command.headPan(90);
// After 500ms, turns the robot's head back to 0 degrees
setTimeout(() => robot.command.headPan(0), 500);
```
Some commands such as `pose` and `sound` allow you to know exactly when the command has ended through capturing sensors data. For eaxmple, when a `pose` command executes, the `BODY_POSE.watermark` value will be 0-254, and when the `pose` command finishes, this value will change to 255, thereby allowing you to determine exactly when a `pose` command finishes. 

Similar idea applies to other commands that set a flag to `true` or `false` when certain action is executed. For example, when Button_Main is pressed, the value `BUTTON_MAIN.s` will be set to 1, and on release, back to 0. By listening to these sensor values change, you can determine the exact time when certain event occur rather than relying on an arbitrary timeout value in `setTimeout`. Therefore, you can execute the next command after these events occur.

### Using Promise
Another way to execute one command after another would be to use the like of Promise.

```javascript
// Wrap commands in a Promise
function execute(command) {
        return new Promise(function (resolve, reject) {
		// execute the command
		command();

		if (command.toString().includes("pose")) {
			// pose command, TODO: rely on sensor change value to determine next command
		} else {
			// other commands, arbitrarily determine the command to finish in 500ms
			setTimeout(() => resolve(), 500);
		}
	});
}

execute(() => robot.command.headPan(90)) // First, turn the head by 90 degrees
	.then(() => execute(() => robot.command.headPan(0))) // Then, turn the head back to 0 degree
	.then(() => execute(() => robot.command.headPan(-90))) // Then, turn the head by -90 degrees
	.then(() => execute(() => robot.command.headTilt(20))) // Then, tilt the head by 20 degrees
	.then(() => execute(() => robot.command.headPan(0))) // Then, turn the head back to 0 degrees
	.then(() => execute(() => robot.command.headTilt(0))); // Finally, tilt the head back to 0 degree
```

By wrapping commands in a Promise, you can chain one command after another, and you are in full control for the arbitrary timeout value.

E.g. to determine when a pose has finished:
```javascript
let poseStarted = false;
let _resolve;
WonderJS.addEventListener("onsensor", ({id, sensors}) => {
        if (sensors.BODY_POSE != null && sensors.BODY_POSE.hasOwnProperty('watermark')) {
		if (sensors.BODY_POSE.watermark !== 255) {
			poseStarted = true;
                }
                // pose() was called before, and if the sensor reports 255 again, this means pose has stopped
                if (poseStarted && sensors.BODY_POSE.watermark === 255 && _resolve != null) {
        	        _resolve();
          	        _resolve = null;
          	        poseStarted = false;
                }
        }
});

function execute(command) {
	return new Promise(function (resolve, reject) {
		// execute the command
		command();

		if (command.toString().includes("pose")) {
			// pose command, rely on sensor change value to determine next command
			_resolve = resolve;
		} else {
			// other commands, arbitrarily determine the command to finish in 500ms
			setTimeout(() => resolve(), 500);
		}
	});
}

execute(() => robot.command.pose(20, 0, 0, 1)) // First, move the robot forward by 20cm in 1 sec.
	.then(() => execute(() => robot.command.pose(0, 0, 90, 0.5))) // Then, turn the robot by 90 degrees in 0.5 sec
	.then(() => execute(() => robot.command.pose(30, 0, 0, 0.6))) // Then, move the robot forward by 30cm in 0.6 sec
	.then(() => execute(() => robot.command.headPan(90))) // Then, turn the robot's head by 90 degrees
	.then(() => execute(() => robot.command.headPan(0))); // Finally, turn the robot's head back to 0 degrees
```

By capturing the sensors values and resolving `Promise`, you are able to chain commands to execute one after another. The same logic applies to determine other value changes such as Button pressed, or Sound playing and stopping.

There are other ways you could chain one command after another, and using `setTimeout` or `Promise` are just some ways you can achieve executing multiple commmands one after another.
