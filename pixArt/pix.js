// References
let container = document.querySelector(".container"); // Fixed to use class selector
let gridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorBtn = document.getElementById("color-input");
let paintBtn = document.getElementById("paint-btn");
let eraseBtn = document.getElementById("erase-btn");
let widthVal = document.getElementById("width-value");
let heighthVal = document.getElementById("height-value");

// Event object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchstart", // Fixed from "touchdown"
        move: "touchmove",
        up: "touchend",
    },
};
let deviceType = "";
let draw = false;
let erase = false;

// Detect touch device
const isTouchDevice = () => {
    deviceType = window.ontouchstart !== undefined ? "touch" : "mouse";
    return deviceType === "touch";
};

isTouchDevice();

// Create grid
gridBtn.addEventListener("click", () => {
    container.innerHTML = ""; // Clear old grids
    let count = 0;
    // Loop to create rows
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        // Create columns
        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            // Mouse/touch down event
            col.addEventListener(events[deviceType].down, (e) => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorBtn.value;
                }
            });

            // Mouse/touch move event for continuous drawing
            col.addEventListener(events[deviceType].move, (e) => {
                if (draw) {
                    let element = document.elementFromPoint(
                        deviceType === "mouse" ? e.clientX : e.touches[0].clientX,
                        deviceType === "mouse" ? e.clientY : e.touches[0].clientY
                    );
                    if (element && element.classList.contains("gridCol")) {
                        checker(element.id);
                    }
                }
            });

            // Stop drawing on mouse/touch up
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }
});

// Checker function
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId === element.id) { // Fixed element.Id to element.id
            if (draw && !erase) {
                element.style.backgroundColor = colorBtn.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent"; // Fixed assignment
            }
        }
    });
}

// Event listeners (moved outside gridBtn click handler)
clearGridBtn.addEventListener("click", () => {
    container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthVal.innerHTML = gridWidth.value < 10 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
    heighthVal.innerHTML = gridHeight.value < 10 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};