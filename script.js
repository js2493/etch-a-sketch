const CELL_SIZE = "15px";
const CELL_MARGIN = "0.25px";
const NUM_CELLS = 50

let container = document.createElement("div")
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.justifyContent = "center"
container.style.alignItems = "center"
container.style.height = "100vh"
document.body.appendChild(container);

let mouseDown = false;
document.addEventListener("mousedown", () => {
    mouseDown = true;
});;

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

// create cells
for (let i = 0; i < NUM_CELLS; i++) {
    let row = document.createElement("div");
    row.classList.add("container");
    row.style.display = "flex";
    row.style.margin = `${CELL_MARGIN} 0`
    for (let j = 0; j < NUM_CELLS; j++) {
        let cell = document.createElement("div");
        cell.clicked = false;
        cell.style.backgroundColor = "Gainsboro";
        cell.style.width = CELL_SIZE
        cell.style.height = CELL_SIZE
        cell.style.margin = `0 ${CELL_MARGIN}`
        cell.addEventListener("mouseenter", () => {
            if (mouseDown) {
                cell.style.backgroundColor = "red";
                cell.clicked = true;
            }
            else if (!cell.clicked) { 
                cell.style.backgroundColor = "black"; 
            }
        })
        cell.addEventListener("mouseleave", () => {
            if (!cell.clicked) {
                setTimeout(() => {
                    cell.style.backgroundColor = "Gainsboro";
                }, 40);
            }   
        })
        cell.addEventListener("mousedown", () => {
            cell.style.backgroundColor = "red";
            cell.clicked = true;
        })
        

        row.appendChild(cell);
    }
    container.appendChild(row);
}

