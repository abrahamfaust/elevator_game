// main scrip page

import { elevator } from "./elevator.js";
import { floor } from "./floor.js";
import {
  numberOfElevators,
  numberOfFloors,
  floorHeightInt,
} from "./setting.js";

const elevatorsArr = [];

const audio = document.getElementById("ding");

// floors container
const buildingFloors = document.getElementById("floors");
// elevators container
const floorsElevators = document.getElementById("elevators");
// list of all floors
const floors = document.getElementsByClassName(["metal linear"]);
// list of all floors timer
const timers = document.getElementsByClassName(["timer"]);
// tynamic elwvator container height based on amount of floors
floorsElevators.style.height = `${(7 + floorHeightInt) * numberOfFloors}px`;

document.addEventListener("DOMContentLoaded", () => {
  // add  floors
  for (let i = numberOfFloors - 1; i >= 0; i--) {
    buildingFloors.appendChild(floor(i, addToQueue));
  }

  // add elevators
  for (let i = 0; i < numberOfElevators; i++) {
    const newElevator = elevator(i);
    floorsElevators.appendChild(newElevator);

    const elevatorObject = {
      floor: 0, // elevator currnt floor
      queue: [], // elevator queue of floors
      time: 0.0, // elevator timer to end queue
      isMoving: false, // if elevator currnet moving or not
      object: newElevator.getElementsByTagName("img")[0],
    };

    // on end of elevator * animation move to the next floor in elevator * queue
    elevatorObject.object.addEventListener("transitionend", () =>
      moveFloor(elevatorObject)
    );

    elevatorsArr.push(elevatorObject);
  }
});

/** 
    since the floors are build from buttom to top the list of floors and timers or backwords
    num variable handles that
**/

const moveFloor = (elevator) => {
  // on arrivel to floor play sound
  audio.play();
  audio.playbackRate = 7.0;
  // new current floor
  const floor = elevator.queue[0];

  const num = floors.length - floor - 1;
  // change floor button back to gray
  floors[num].classList.remove("active");
  // hide floor timer
  timers[num].classList.remove("active");

  // add 2 seconds of stay after arrival
  setTimeout(() => {
    elevator.isMoving = false;
    elevator.queue.shift();

    if (elevator.queue.length > 0) {
      goToFloor(elevator);
    }
  }, 2000);
};

const addToQueue = (floor) => {
  const num = floors.length - floor - 1;
  // can not call a floor again while it's called already
  if (floors[num].classList.contains("active")) return;

  // can not call an elevator if theres current one on the same floor
  for (let i = 0; i < elevatorsArr.length; i++) {
    if (floor == elevatorsArr[i].floor) {
      // change floor button to red for 0.5 seconds
      floors[num].classList.add("error");
      setTimeout(() => {
          floors[num].classList.remove("error");
      }, 500);
      return;
    }
  }
  // change floor button to green to show activity
  floors[num].classList.add("active");

  /**
    get the best elevator to come to this floor in the shorteds time 
    based on the time will take to go through all floors in queue of each elevator 
    including 2 seconds stop on each floor
    + the time it will take to come from the last floor in the queue to this floor
  **/

  let elevatorNum = 0;
  let lastFloor;
  let myQueue = elevatorsArr[0].queue;

  if (myQueue.length > 0) lastFloor = myQueue[myQueue.length - 1];
  else lastFloor = elevatorsArr[0].floor;
  
  let time = elevatorsArr[0].time + 0.5 * Math.abs(lastFloor - floor);

  for (let i = 0; i < elevatorsArr.length; i++) {
    myQueue = elevatorsArr[i].queue;
    if (myQueue.length > 0) lastFloor = myQueue[myQueue.length - 1];
    else lastFloor = elevatorsArr[i].floor;

    if (elevatorsArr[i].time + 0.5 * Math.abs(lastFloor - floor) < time) {
      elevatorNum = i;
      time = elevatorsArr[i].time + 0.5 * Math.abs(lastFloor - floor);
    }
  }

  // use time for the floor timer until the elevator arrival in mm:ss format
  time = Math.floor(time);
  
  // get time format (mm:ss)
  const timeFormat = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  // change floor timer to the time until elevator arrival
  timers[num].textContent = timeFormat(time);
  // show floor timer
  timers[num].classList.add("active");

  // change floor timer every second until arrival
  const timer = setInterval(() => {
    if (time >= 1) {
      time--;
    }
    timers[num].textContent = timeFormat(time);

    if (time <= 0) {
      clearInterval(timer);
    }
  }, 1000);

  const elevator = elevatorsArr[elevatorNum];
  // add elevator time to end of queue
  if (elevator.queue.length == 0) {
    elevator.time += 0.5 * Math.abs(elevator.floor - floor) + 2;
  } else {
    const num = elevator.queue[elevator.queue.length - 1];
    elevator.time += 0.5 * Math.abs(num - floor) + 2;
  }

  // add floor to queue
  elevator.queue.push(floor);

  // go to elevator first stop
  if (!elevator.isMoving && elevator.queue.length == 1) {
    goToFloor(elevator);
  }
};

// move from floor to floor with animation
const goToFloor = (elevator) => {
  elevator.isMoving = true;

  elevator.object.style.transition = `transform ${
    0.5 * Math.abs(elevator.floor - elevator.queue[0])
  }s ease-in-out`;
  elevator.object.style.transform = `translateY(${
    elevator.queue[0] * (-floorHeightInt - 7)
  }px)`;

  // change elevator current floor and time to end of queue every 0.5 seconds
  for (let i = 0; i < 4 + Math.abs(elevator.floor - elevator.queue[0]); i++) {
    setTimeout(
      () => {
        elevator.time -= 0.5;
        elevator.floor = elevator.queue[0];
      },
      500 * i,
      i
    );
  }
};
