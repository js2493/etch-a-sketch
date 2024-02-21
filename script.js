
let body = document.body;
for (let i = 0; i < 10; i++) {
    let row = document.createElement("div");
    row.classList.add("container");
    row.style.display = "flex";
    row.style.margin = "3px 0"
    for (let j = 0; j < 10; j++) {
        let cell = document.createElement("div");
        cell.style.backgroundColor = "blue";
        cell.style.color = "red"
        cell.style.width = "30px"
        cell.style.height = "30px"
        cell.style.margin = "0 3px"
        row.appendChild(cell);
    }
    body.appendChild(row);
}