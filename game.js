var w_window = window.innerWidth;
var h_window = window.innerHeight;
var resolution = w_window < h_window ? w_window : h_window;
var proportion = 100;
var rows;
var cols;


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
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    return canvas, ctx;
}

function draw(ctx, matrix) {
    // Calculate the canvas size, relative to the window resolution
    canvas_dim = Math.floor(resolution/proportion) * proportion;

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
                ctx.fillRect(x, y, a-1, a-1);
            }
        }
    }
}



function main() {
    let canvas, ctx = prepareCanvas(resolution, resolution);
    // Setup number of rows and cols according to window resolution
    rows = Math.floor(resolution / proportion);
    cols = Math.floor(resolution / proportion);
    console.log("Resolution: " + resolution + "\n", "rows: " + rows + "\n", "cols: " + cols + "\n");
    let matrix = make2DArray(rows, cols);
    matrix = fill_random(matrix);
    draw(ctx, matrix);
}

document.addEventListener('DOMContentLoaded', main)
