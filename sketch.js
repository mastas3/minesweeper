var grid;
var cols;
var rows;
var w = 20;
var totalMines = 80;
var mineOptions = [];
var mines = [];
var flagImg;

function preload() {
  flagImg = loadImage('https://i.imgur.com/A0y5C3L.png');
}

function setup () {
  createCanvas(501, 501);
  cols = floor(width / w);
  rows = floor(height / w);
  console.log(flagImg);
  grid = create2DArray(cols, rows);  
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }  

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      mineOptions.push([i, j]);
    }
  }

  for(let i = 0; i < totalMines; i++) {
    let r = random(mineOptions);
    let x = r[0];
    let y = r[1];
    grid[x][y].mine = true;
  }

  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].neighbours();
    }
  }  
}

function draw() {
  background(255);
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function mousePressed() {
  if(mouseButton === 'right') {
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        let cell = grid[i][j];
        if(cell.contains(mouseX, mouseY)) {
          cell.toggleFlag();       
        }
      }    
    }
  } else {
    for(let i = 0; i < cols; i++) {
      for(let j = 0; j < rows; j++) {
        let cell = grid[i][j];
        if(cell.contains(mouseX, mouseY)) {
          if(cell.isMine()) {
            gameOver();
          } else {
            cell.reveal();
          }        
        }
      }    
    }
  }
}

function gameOver() {
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].reveal();
    }
  }  
}

function create2DArray(cols, rows) {
  var arr = new Array(cols);
  for(var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
