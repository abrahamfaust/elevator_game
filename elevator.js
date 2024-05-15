// the elevator elemant 

export const elevator = (i) => {
    const elevator = document.createElement("div");
    elevator.className = "elevator";
    const elevatorImg = document.createElement("img");
    elevatorImg.src = "elv.png";
    elevator.appendChild(elevatorImg);
   
    return elevator
}