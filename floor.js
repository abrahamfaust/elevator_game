// the floor elemant

/**
 every floor has an onClick function 
 the function is located in the script.js page   
**/

import { floorHeight } from "./setting.js";

export const floor = (i, fnc) => {
    // container
    const res = document.createElement('div')

    // top border
    const blackline = document.createElement("div");
    blackline.className = "blackline";
    res.appendChild(blackline);

    // floor body
    const floor = document.createElement("div");
    floor.className = "floor";
    floor.style.height = floorHeight

    // floor botton 
    const floorMetal = document.createElement("botton");
    floorMetal.className = "metal linear";
    floorMetal.addEventListener('click', () => fnc(i))

    // floor number
    const floorP = document.createElement("p");
    floorP.textContent = i;
    floorP.style.pointerEvents = "none";
    floorMetal.appendChild(floorP);

    // floor timer for elevator
    const timer = document.createElement('p')
    timer.textContent = '00:00'
    timer.className = 'timer'
    
    floor.appendChild(floorMetal);
    floor.appendChild(timer)

    res.appendChild(floor);
       
    return res
}