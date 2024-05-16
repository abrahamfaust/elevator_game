// the elevator elemant

const timers = document.getElementsByClassName(["timer"]);
const floors = document.getElementsByClassName(["metal linear"]);

export const elevator = (i) => {
  const elevator = document.createElement("div");
  elevator.className = "elevator";
  const elevatorImg = document.createElement("img");
  elevatorImg.src = "./images/elv.png";
  elevator.appendChild(elevatorImg);

  return elevator;
};





