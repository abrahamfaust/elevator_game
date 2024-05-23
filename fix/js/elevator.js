// the elevator elemant 

export const elevator = (i) => {
    const elevator = document.createElement("div");
    elevator.className = "elevator";
    const elevatorImg = document.createElement("img");
    elevatorImg.src = "./images/elv.png";
    elevator.appendChild(elevatorImg);
    return elevator
}