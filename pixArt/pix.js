// References
let container = document.querySelector(".container");
let gridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorBtn = document.getElementById("color-input");
let paintBtn = document.getElementById("paint-btn");
let eraseBtn = document.getElementById("erase-btn");
let saveBtn = document.getElementById("save-btn");
let backgroundChoice = document.getElementById("background-choice");
let formatChoice = document.getElementById("format-choice");
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
        down: "touchstart",
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
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            col.addEventListener(events[deviceType].down, (e) => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent";
                } else {
                    col.style.backgroundColor = colorBtn.value;
                }
            });

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
        if (elementId === element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorBtn.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

// Save function
saveBtn.addEventListener("click", () => {
    const format = formatChoice.value;
    const background = backgroundChoice.value;
    const backgroundColor = background === "transparent" ? null : "#ffffff";

    html2canvas(container, { backgroundColor }).then(canvas => {
        if (format === "png") {
            const link = document.createElement("a");
            link.download = "pixel-art.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        } else if (format === "pdf") {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: [canvas.width, canvas.height]
            });
            const imgData = canvas.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
            pdf.save("pixel-art.pdf");
        }
    });
});

// Other event listeners
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
    gridHeight.value = 10;
    gridWidth.value = 10;
    widthVal.innerHTML = "10";
    heighthVal.innerHTML = "10";
};