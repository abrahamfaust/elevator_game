// the elevator elemant 

export const elevator = (i) => {
    const elevator = document.createElement("div");
    elevator.className = "elevator";
    const elevatorImg = document.createElement("img");
    elevatorImg.src = "./images/elv.png";
    elevator.appendChild(elevatorImg);
    const btnContainer = document.createElement('div')
    btnContainer.className = 'btn-container'
    btnContainer.appendChild(btn(i, 'disabled'))
    btnContainer.appendChild(btn(i, 'shabbos'))
    // elevator.appendChild(btnContainer)

    return elevator
}


const btn = (i, type) => {
    const res = document.createElement('div')
    res.className = 'switch-container'
    const p = document.createElement('p')
    p.className = 'switch-p'
    p.textContent = type

    const toggle = document.createElement('div')
    toggle.className = 'switch'
    
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.id = `toggle-${i}-${type}`
    input.className = 'toggle-checkbox'
    const label = document.createElement('label')
    label.htmlFor = `toggle-${i}-${type}`
    label.className = 'toggle-label'
    const span = document.createElement('span')
    span.className = 'toggle-switch'

    label.appendChild(span)
    toggle.appendChild(input)
    toggle.appendChild(label)
    res.appendChild(toggle)
    res.appendChild(p)




    return res

}