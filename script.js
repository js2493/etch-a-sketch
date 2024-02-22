let numCells = 50
let cells = [];
const DEFAULT_COLOR = "#e6e6e6";
const COLOR_CELL_TOTAL_SIZE = 35;
const colors = ["red", "blue", "green", "orange", "yellow", "purple", "saddlebrown", "black"];
const lighterColors = {"red":"LightCoral", "blue":"LightBlue", "green":"OliveDrab", "orange":"NavajoWhite", "yellow":"PaleGoldenRod", "purple":"Plum", "black":"Gray", "saddlebrown":"Tan"};

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

let currentSetting;
let lastSelectedColor;

// color changing
let colorContainer = document.createElement("div");
colorContainer.style.display = "flex";
colorContainer.style.flex = "1"
colorContainer.style.justifyContent = "center";
colorContainer.style.alignItems = "center";
colorContainer.style.margin = `0 100px`;
colorContainer.style.gap = "10px"
container.appendChild(colorContainer);

let optionsBox = document.createElement("div");
optionsBox.style.display = "flex";
optionsBox.style.flexDirection = "column";
optionsBox.style.justifyContent = "center";
optionsBox.style.alignItems = "center";
optionsBox.style.gap = "10px"
colorContainer.appendChild(optionsBox);
let optionsButtons = ["DRAW", "FILL", "ERASE"];
optionsButtons.forEach(option => {
    let button = document.createElement("button");
    button.id = option;
    button.textContent = option;
    button.style.height = "3vh"
    button.style.width = "7vh"
    button.style.fontSize = "1.2vh"
    button.style.backgroundColor = "#D3D3D3"
    optionsBox.appendChild(button);
})
currentSetting = document.getElementById("DRAW");
currentSetting.style.backgroundColor = "#A8A8A8"

optionsBox.addEventListener("click", (event) => {
    currentSetting.style.backgroundColor = "#D3D3D3"
    event.target.style.backgroundColor = "#A8A8A8"
    currentSetting = event.target;
});

let colorBox = document.createElement("div");
colorBox.style.display = "flex";
colorBox.style.flexDirection = "column";
colorBox.style.justifyContent = "center";
colorBox.style.alignItems = "center";
colorContainer.appendChild(colorBox);
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
const BOX_LENGTH = 94;

let box = document.createElement("div");
box.style.display = "flex";
box.style.flex = "2"
box.style.flexDirection = "column";
box.style.justifyContent = "center";
box.style.alignItems = "center";
box.style.height = `${BOX_LENGTH}vh`
box.style.width = `${BOX_LENGTH}vh`
box.style.width = box.style.height;
box.style.margin = `3vh 0`
box.id = "center-box";
container.appendChild(box);
redrawCells();

function redrawCells(){
    cells = [];
    while (box.hasChildNodes()){
        box.firstChild.remove();
    }
    let cellSize = `${BOX_LENGTH/numCells}vh`
    for (let i = 0; i < numCells; i++) {
        let currRow = []
        let row = document.createElement("div");
        box.appendChild(row);
        row.classList.add("container");
        row.style.display = "flex";
        row.style.height = cellSize
        row.style.justifyContent = "center";
        row.style.alignItems = "center";
        row.style.width = `${BOX_LENGTH}vh`
        for (let j = 0; j < numCells; j++) {
            let cell = document.createElement("div");
            cell.coord = [i, j];
            currRow.push(cell);
            row.appendChild(cell);
            cell.style.backgroundColor = DEFAULT_COLOR;
            cell.currentColor = DEFAULT_COLOR
            cell.style.height = cellSize
            cell.style.width = cellSize

            cell.addEventListener("mouseenter", () => {
                
                if (currentSetting.id == "ERASE") {
                    cell.style.backgroundColor = DEFAULT_COLOR;
                    if (mouseDown) {
                        cell.currentColor = DEFAULT_COLOR;
                    }
                }
                else {
                    if (mouseDown && currentSetting.id == "DRAW") {
                        cell.style.backgroundColor = lastSelectedColor.id;
                        cell.currentColor = lastSelectedColor.id
                    }
                    else {
                        cell.style.backgroundColor = lighterColors[lastSelectedColor.id];
                    }
                }
                        
            })
            cell.addEventListener("mouseleave", () => {
                    setTimeout(() => {
                        cell.style.backgroundColor = cell.currentColor;
                    }, 40);
            })   
            
            cell.addEventListener("mousedown", () => {
                
                if (currentSetting.id == "DRAW") {
                    cell.style.backgroundColor = lastSelectedColor.id;
                    cell.currentColor = lastSelectedColor.id;
                }
                else if (currentSetting.id == "ERASE") {
                    cell.style.backgroundColor = DEFAULT_COLOR;
                    cell.currentColor = DEFAULT_COLOR;
                }   
                else {
                    function fill(cell, fillColor) {
                        let originalColor = cell.currentColor;
                        let stack = [cell]
                        let visited = []
                        for (let i = 0; i < numCells; i++) {
                            let currRow = []
                            for (let j = 0; j < numCells; j++) {
                                currRow.push(false)
                            }
                            visited.push(currRow)
                        }
                        while (stack.length > 0){
                            let len = stack.length
                            console.log(len)
                            for (let i = 0; i < len; i++) {
                                let currentCell = stack.shift();
                                currentCell.style.backgroundColor = fillColor;
                                currentCell.currentColor = fillColor;  
                                let [y, x] = currentCell.coord
                                if (y > 0 && !visited[y - 1][x]) {
                                    visited[y - 1][x] = true
                                    let upNeighbor = cells[y - 1][x];
                                    if (upNeighbor.currentColor == originalColor) {
                                        stack.push(upNeighbor);
                                    }
                                }
                                if (x > 0 && !visited[y][x - 1]) {
                                    visited[y][x - 1] = true
                                    let leftNeighbor = cells[y][x - 1];
                                    if (leftNeighbor.currentColor == originalColor) {
                                        stack.push(leftNeighbor);
                                    }
                                }
                                if (y < numCells - 1 && !visited[y + 1][x]) {
                                    visited[y + 1][x] = true
                                    let downNeighbor = cells[y + 1][x];
                                    if (downNeighbor.currentColor == originalColor) {
                                        stack.push(downNeighbor);
                                    }
                                }
                                if (x < numCells - 1 && !visited[y][x + 1]) {
                                    visited[y][x + 1] = true
                                    let rightNeighbor = cells[y][x + 1];
                                    if (rightNeighbor.currentColor == originalColor) {
                                        stack.push(rightNeighbor);
                                    }
                                }
                            }
                        }
    
                    }
                    fill(cell, lastSelectedColor.id);
                }
            })

        }
        cells.push(currRow);
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
resetBtn.style.fontSize = "1.2vh"
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
inputGridSize.style.fontSize = "1.2vh"
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


