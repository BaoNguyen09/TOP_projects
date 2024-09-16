const container = document.querySelector(".canvas");
const canvasSize = document.querySelector(".canvasSize");
let size;
let innerContainer;
drawCanvas(16);
canvasSize.addEventListener("click", () => {
    size = Number(prompt("Enter the size (<= 100) of the canvas (AxA): ", "16"));
    // size = parseInt(size);
    drawCanvas(size);
    
});

function drawCanvas(size) {
    if (innerContainer) {
        container.removeChild(innerContainer);
    }
    if (size > 100) {
        size = 100;
    }
    innerContainer = document.createElement("div");
    container.appendChild(innerContainer);
    innerContainer.style.cssText = "display: flex; flex-direction: row; align-items: stretch; justify-content: center; flex-grow: 1"
    for (let i = 0; i < size; i++) {
        const name = "row " + i;
        const child = document.createElement("div");
        // child.textContent = name;
        child.style.cssText = "border: 1px solid red; display: flex; flex-direction: column; justify-content:space-evenly; flex-grow: 1";
        
        innerContainer.appendChild(child);
        for (let j = 0; j < size; j++) {
            const grandName = "cell " + (i+j);
            const grandChild = document.createElement("div");
            // grandChild.textContent = grandName;
            grandChild.style.cssText = "border: 1px dotted blue; flex-grow: 1; cursor: pointer;"
            grandChild.addEventListener("mouseenter", () => {
                // console.log(grandName);
                grandChild.style.background = "red";
            });
            child.appendChild(grandChild);
        }
    }
}

