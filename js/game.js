var w_window = window.innerWidth;
var h_window = window.innerHeight;
var resolution = w_window < h_window ? w_window : h_window;
var proportion = 50; // Size of one square
var canvas_dim = Math.floor(resolution/proportion) * proportion; // canvas size, relative to the window resolution
var matrix;
var rows;
var cols;
const SPEED = 100;


// Returns an integer n, such that: 0 <= n < max
function getRandomInt(max){
    return Math.floor(Math.random() * max);
  }
  
// Creates a matrix with dimensions of (rows x cols)
function make2DArray(rows, cols){
    let matrix = new Array(rows);
    for(let i = 0; i < rows; i++){
        matrix[i] = new Array(cols);
    }
    return matrix;
}

// Fills the matrix with an initial random state
// 0 - dead
// 1 - alive
function fill_random(matrix) {
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            matrix[i][j] = getRandomInt(2);
        }
    }
    return matrix;
}


function prepareCanvas(width, height){
    let canvas = document.createElement("canvas");
    canvas.id = "canv";
    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "none";
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    return canvas, ctx;
}
var canvas, ctx;


function draw(ctx, matrix) {
    // Fill the whole canvas black
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas_dim, canvas_dim);

    let a = proportion;
    // Go through the matrix and set the alive cells to white
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            // Calculate the x, y coordinates of a specific field
            let x = i * proportion;
            let y = j * proportion;
            // If the field is supposed to be alive, fill it with white
            if(matrix[i][j] == 1){
                ctx.fillStyle = "#FFFFFF";
                ctx.stroke();
                ctx.fillRect(x+6, y+6, a-7, a-7);
            }
        }
    } 
}

// Counts alive neighbouring cells to the (x, y) cell
function countNeigbours(matrix, x, y) {
    let sum = 0;
    // Bound to edges
    // for(let i = -1; i < 2 && x+i < rows && x+i > -1; i++){
    //     for(let j = -1; j < 2 && y+j < cols && y+j > -1; j++){
    //         sum += matrix[x+i][y+j];
    //     }
    // }

    // Wrap around
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            let row = (x + i + rows) % rows;
            let col = (y + j + cols) % cols;
            sum += matrix[row][col];
        }
    }
    sum -= matrix[x][y];
    return sum;
}


// TODO: Fix the O(n^4)
function updateMatrix(matrix) {
    let next = make2DArray(rows, cols);

    // Caluclate next based on current matrix
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){

            // Count live neighbours
            let neighbours = countNeigbours(matrix, i, j);

            let state = matrix[i][j];
            // Rule 1:
            if(state == 0 && neighbours == 3)
                next[i][j] = 1;
            // Rule 2:
                else if (state == 1 && (neighbours < 2 || neighbours > 3))
                next[i][j] = 0;
            // Rule 3:
            else
                next[i][j] = state;
        }
    }
    return next;
}

function updateGame() {
    // Draw current canvas, and update it 
    draw(ctx, matrix);
    matrix = updateMatrix(matrix);

    // Update the texture on the torus
    updateMaterialFromCanvas(document.getElementById("canv"));
}


function main() {
    canvas, ctx = prepareCanvas(resolution, resolution);
    // Setup number of rows and cols according to window resolution
    rows = Math.floor(resolution / proportion);
    cols = Math.floor(resolution / proportion);
    console.log("Resolution: " + resolution + "\n", "rows: " + rows + "\n", "cols: " + cols + "\n");

    // Draw cooresponding torus
    drawTorus(rows, cols);
    
    // Initialze the begining state
    matrix = make2DArray(rows, cols);
    matrix = fill_random(matrix);
    
    // Start the main loop
    // updateGame();
    setInterval(updateGame, SPEED);

}

document.addEventListener('DOMContentLoaded', main)
