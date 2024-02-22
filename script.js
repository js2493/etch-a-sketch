const CELL_MARGIN = "0.25px";
let numCells = 50
const COLOR_SIZE = "25px";
const SELECTED_COLOR_SIZE = "30px";
const colors = ["red", "blue", "green", "orange", "yellow", "purple", "saddlebrown", "black"];
const lighterColors = {"red":"LightCoral", "blue":"LightBlue", "green":"OliveDrab", "orange":"NavajoWhite", "yellow":"PaleGoldenRod", "purple":"Plum", "black":"Gray", "saddlebrown":"Tan"}

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
    colorCell.style.width = COLOR_SIZE;
    colorCell.style.height = COLOR_SIZE;
    colorCell.style.margin = `${CELL_MARGIN} 0`;
    colorCell.style.backgroundColor = color;
    colorBox.appendChild(colorCell);
}
lastSelectedColor = document.getElementById("black");
lastSelectedColor.style.width = SELECTED_COLOR_SIZE;
lastSelectedColor.style.height = SELECTED_COLOR_SIZE;

colorBox.addEventListener("click", (event) => {
    lastSelectedColor.style.width = COLOR_SIZE;
    lastSelectedColor.style.height = COLOR_SIZE;
    lastSelectedColor = event.target
    lastSelectedColor.style.width = SELECTED_COLOR_SIZE;
    lastSelectedColor.style.height = SELECTED_COLOR_SIZE;
    event.stopPropagation();
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
        row.style.margin = `${CELL_MARGIN} 0`
        row.style.height = "100%"
        row.style.width = row.style.height
        for (let j = 0; j < numCells; j++) {
            let cell = document.createElement("div");
            row.appendChild(cell);
            cell.style.backgroundColor = "Gainsboro";
            cell.currentColor = "Gainsboro"
            cell.style.height = cellSize
            cell.style.width = cellSize
            cell.style.margin = `0 ${CELL_MARGIN}`

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
resetBtn.style.height = "3vh";
resetBtn.style.width = "8vh";
resetBtn.style.fontSize = "1vh"
rightBox.appendChild(resetBtn);
resetBtn.addEventListener("click", resetCells);

function resetCells(){
    let centerBox = document.getElementById("center-box");
    let rows = centerBox.childNodes;
    for (let row of rows) {
        let cells = row.childNodes;
        for (let cell of cells) {
            cell.style.backgroundColor = "Gainsboro";
            cell.currentColor = "Gainsboro"
        }
    }
}

let inputGridSize = document.createElement("button");
inputGridSize.style.height = "3vh";
inputGridSize.style.width = "8vh";
inputGridSize.textContent = "CHANGE GRID"
inputGridSize.style.fontSize = "1vh"
inputGridSize.addEventListener("click", (event) => {
    numCells = window.prompt("Enter new grid length: ");
    redrawCells();
    resetCells();
})
rightBox.appendChild(inputGridSize)
let inputValue = inputGridSize.value;
console.log(inputValue);


