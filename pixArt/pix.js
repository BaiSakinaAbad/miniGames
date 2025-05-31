//references
let container = document.getElementById(".container");
let gridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorBtn = document.getElementById("color-input");
let paintBtn = document.getElementById("paint-btn");
let eraseBtn = document.getElementById("erase-btn");
let widthVal = document.getElementById("width-value");
let heighthVal = document.getElementById("height-value");

//event obj

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },
    touch: {
        down: "touchdown",
        move: "touchmove",
        up: "touchend",
    },
};
let deviceType = "";

let draw = false;
let erase = false;

// detect touch device
const isTouchDevice = () => {
    try {
        document.createElement(TouchEvent);
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

//create grid
gridBtn.addEventListener("click", () => {
    container.innerHTML = ""; //clear old grids
    let count = 0;
    // loop to create rows
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        //create row div
        let div = document.createElement("div");
        div.classList.add("gridRow");
        // create col
        for (let i = 0; i < gridWidth.value; i++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorBtn.value;
                }
            });
            col.addEventListener(events[deviceType].down, () => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id; // returns element at x,y position of mouse
                checker(elementId);
            });
            //stop drawing
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            // append columns
            div.appendChild(col);
        }
        //append grid to container
        container.appendChild(div);
        }
    });

    //checker function
    function checker(elementId){
        let gridColumns = document.querySelectorAll(".gridCol");
        //loop all the boxes
        gridColumns.forEach((element)=> {
            // if == match ? color
            if(elementId == element.Id){
                if(draw && !erase){
                    element.style.backgroundColor = colorBtn.value;
                } else if (draw && erase){
                    element.style.backgroundColor == "transparent";
                }
            }
        });
    }

    // clear grid

    // erase btn

    // paint btn

    // display grid
    