# Sensors Documentation for Wonder Workshop Robots
This documents the sensors values for Wonder Workshop robots.

To fetch the sensor values, call `WonderJS.addEventListener("onsensor", ({id, sensors})  => //do something);
`;

Refer to [README.md](README.md#addeventlistener) for details of how to use the `addEventListener` command.

## How to use:
All the sensors follow the skeleton:

```javascript
import WonderJS from 'wonderjs';

WonderJS.addEventListener("onsensor", ({id, sensors}) => {
  // BUTTON_MAIN is the key, and s is the value. Replace the key and value with different values below.
  if (sensors.BUTTON_MAIN.s === 1) {
    alert("Main button pressed!);
  }
}
```

## Keys and Values

#### ACCELEROMETER
x | y | z
--| -- | --
A number | A number | A number

#### ANIMATION_PLAYING
flag |
--|
`0` or `1`. The value 0 represents animation not playing, whereas a value of 1 represents an animation currently playing.

#### BATTERY
chg | level | volt
--| -- | --
`0` or `1`. If the robot is charging, the value will be 1. Else, the value will be 0. | A number representing battery level. | A number representing the voltage level.

#### BODY_POSE
x | y | degree
--| -- | --
A number representing the x-coordinate. | A number representing the y-coordinate. | Angle of the robot in degree.

#### BUTTON_1
s |
--|
`0` or `1`. If Button1 is pressed, this value will be 1. When Button1 is released, this value returns back to 0.

#### BUTTON_2
s |
--|
`0` or `1`. If Button2 is pressed, this value will be 1. When Button2 is released, this value returns back to 0.

#### BUTTON_3
s |
--|
`0` or `1`. If Button3 is pressed, this value will be 1. When Button3 is released, this value returns back to 0.

#### BUTTON_MAIN
s |
--|
`0` or `1`. If ButtonMain is pressed, this value will be 1. When ButtonMain is released, this value returns back to 0.

#### DISTANCE_BACK
cm |
--|
The distance in cm that the back sensor senses something away.

#### DISTANCE_FRONT_LEFT_FACING
cm |
--|
The distance in cm that the front left sensor senses something away.

#### DISTANCE_FRONT_RIGHT_FACING
cm |
--|
The distance in cm that the front right sensor senses something away.

#### ENCODER_LEFT_WHEEL
cm |
--|
The amount of distance in cm that the left wheel has travelled.

#### ENCODER_RIGHT_WHEEL
cm |
--|
The amount of distance in cm that the right wheel has travelled.

#### GYROSCOPE
r | p | y
--| - | --
The roll | The pitch | The Yaw

#### HEAD_POSITION_PAN
degree |
--|
The angle in degree in which the robot's head has panned away from the front.

#### HEAD_POSITION_TILT
degree |
--|
The angle in degree in which the robot's head has tilted away from the default level.

#### SOUND_PLAYING
flag |
--|
`0` or `1`. If the robot is currently playing sound, this value will be 1. Else, this value will be 0.

