function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i*w;
  this.y = j*w;
  this.w = w;
  this.h = w;
  this.mine = false;
  this.revealed = false;
  this.totalnNeighbours = 0;
  this.flag = false;

  this.reveal = function() {
    this.revealed = true;
  }

  this.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
  }

  this.toggleFlag = function() {
    this.flag = this.flag ? false : true;
  }

  this.isMine = function(x, y) {
    return this.mine;
  }

  this.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    if(this.revealed) {
      if(this.mine) {
        fill(100);
        ellipse(this.x+w/2, this.y+w/2, this.w/2, this.h/2);
      } else if(this.totalnNeighbours > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.totalnNeighbours, this.x + this.w * 0.5, this.y + this.w - 6);
      } else {
        fill(200);
        rect(this.x, this.y, this.w, this.h);        
      }      
    } else if(this.flag) {
        image(flagImg, this.x, this.y);
    } 
  }

  this.neighbours = function() {
    if(this.mine) {
      this.totalnNeighbours = -1;
      return;
    }

    var total = 0;
    
    for(var xoff = -1; xoff <= 1; xoff++) {
      var i = xoff + this.i;
      if(i < 0 || i>= cols) {
        continue;
      }

      for(var yoff = -1; yoff <= 1; yoff++) {
        var j = yoff + this.j;
        if(j < 0 || j >= rows) {
          continue;
        }

        let neighbour = grid[i][j];
        if(neighbour.mine) {
          total++;
        }
      }
    }
    this.totalnNeighbours = total;
  }
}