let numCells = 50
const DEFAULT_COLOR = "#e6e6e6";
const COLOR_CELL_TOTAL_SIZE = 35;
const colors = ["red", "blue", "green", "orange", "yellow", "purple", "saddlebrown", "black", "#e6e6e6"];
const lighterColors = {"red":"LightCoral", "blue":"LightBlue", "green":"OliveDrab", "orange":"NavajoWhite", "yellow":"PaleGoldenRod", "purple":"Plum", "black":"Gray", "saddlebrown":"Tan", "#e6e6e6":"ghostwhite"};

let container = document.createElement("div");
container.style.display = "flex";
container.style.justifyContent = "center";
container.style.alignItems = "center";
container.style.height = "100vh";

document.body.appendChild(container)

let mouseDown = false;
document.addEventListener("mousedown", () => {
    mouseDown = true;
});;

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

let lastSelectedColor;

// color changing
let colorBox = document.createElement("div");
colorBox.style.display = "flex";
colorBox.style.flex = "1";
colorBox.style.flexDirection = "column";
colorBox.style.justifyContent = "center";
colorBox.style.alignItems = "center";
colorBox.style.margin = `0 100px`;
container.appendChild(colorBox);
for (let color of colors) {
    let colorCell = document.createElement("div")
    colorCell.id = `${color}`;
    colorCell.style.width = `${COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
    colorCell.style.height = `${COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
    colorCell.style.margin = `1px 0`;
    colorCell.style.backgroundColor = color;
    colorBox.appendChild(colorCell);
}
lastSelectedColor = document.getElementById("black");
lastSelectedColor.style.width = `${1.25*COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
lastSelectedColor.style.height = `${1.25*COLOR_CELL_TOTAL_SIZE/colors.length}vh`;

colorBox.addEventListener("click", (event) => {
    if (colors.includes(event.target.id)) {
        lastSelectedColor.style.width = `${COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
        lastSelectedColor.style.height = `${COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
        lastSelectedColor = event.target
        lastSelectedColor.style.width = `${1.25*COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
        lastSelectedColor.style.height = `${1.25*COLOR_CELL_TOTAL_SIZE/colors.length}vh`;
        event.stopPropagation();
    }
})


// create cells
let box = document.createElement("div");
box.style.display = "flex";
box.style.flex = "2"
box.style.flexDirection = "column";
box.style.justifyContent = "center";
box.style.alignItems = "center";
box.style.height = "92vh"
box.style.width = "92vh"
box.style.width = box.style.height;
box.style.margin = `3vh 0`
box.id = "center-box";
container.appendChild(box);
redrawCells();

function redrawCells(){
    while (box.hasChildNodes()){
        box.firstChild.remove();
    }
    let cellSize = `${90/numCells}vh`
    for (let i = 0; i < numCells; i++) {
        let row = document.createElement("div");
        box.appendChild(row);
        row.classList.add("container");
        row.style.display = "flex";
        row.style.height = cellSize
        row.style.justifyContent = "center";
        row.style.alignItems = "center";
        row.style.width = "100vh"
        for (let j = 0; j < numCells; j++) {
            let cell = document.createElement("div");
            row.appendChild(cell);
            cell.style.backgroundColor = DEFAULT_COLOR;
            cell.currentColor = DEFAULT_COLOR
            cell.style.height = cellSize
            cell.style.width = cellSize


            cell.addEventListener("mouseenter", () => {
                if (mouseDown) {
                    cell.style.backgroundColor = lastSelectedColor.id;
                    cell.currentColor = lastSelectedColor.id
                }
                else {
                    cell.style.backgroundColor = lighterColors[lastSelectedColor.id];
                }
            })
            cell.addEventListener("mouseleave", () => {
                    setTimeout(() => {
                        cell.style.backgroundColor = cell.currentColor;
                    }, 40);
            })   
            cell.addEventListener("mousedown", () => {
                cell.style.backgroundColor = lastSelectedColor.id;
                cell.currentColor = lastSelectedColor.id
            })
        }
        
    }
}

// other options
let rightBox = document.createElement("div");
container.appendChild(rightBox);
rightBox.style.display = "flex";
rightBox.style.flex = "1";
rightBox.style.flexDirection = "column"
rightBox.style.justifyContent = "center";
rightBox.style.alignItems = "center";
rightBox.style.margin = `0 80px`;
rightBox.style.height = "100%"
rightBox.style.gap = "2vh"

let resetBtn = document.createElement("button")
resetBtn.textContent = "RESET";
resetBtn.style.height = "5vh";
resetBtn.style.width = "12vh";
resetBtn.style.fontSize = "1vh"
rightBox.appendChild(resetBtn);
resetBtn.addEventListener("click", resetCells);

function resetCells(){
    let centerBox = document.getElementById("center-box");
    let rows = centerBox.childNodes;
    for (let row of rows) {
        let cells = row.childNodes;
        for (let cell of cells) {
            cell.style.backgroundColor = DEFAULT_COLOR;
            cell.currentColor = DEFAULT_COLOR
        }
    }
}

let inputGridSize = document.createElement("button");
inputGridSize.style.height = "5vh";
inputGridSize.style.width = "12vh";
inputGridSize.textContent = "CHANGE GRID SIZE"
inputGridSize.style.fontSize = "1vh"
inputGridSize.addEventListener("click", (event) => {
    let input = window.prompt("Enter new grid size, up to 250: ");
    input = parseInt(input)
    if (!isNaN(input) && input < 251 && input > 0) {
        numCells = input;
        redrawCells();
        resetCells();
    }
})
rightBox.appendChild(inputGridSize)
let inputValue = inputGridSize.value;
console.log(inputValue);


