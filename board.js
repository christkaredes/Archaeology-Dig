function GameBoard()
{
	
 this.ruins = [

  { 
    name: "Palace",
    size: 5,
    successes: 0
  },

  { 
    name: "Temple",
    size: 4,
    successes: 0
  },

  { 
    name: "Forum",
    size: 4,
    successes: 0
  },

  { 
    name: "House",
    size: 3,
    successes: 0
  },

  { 
    name: "Hut",
    size: 2,
    successes: 0
  }

  ];
  
  this.rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
  this.columns = ["1", "2", "3", "4", "5", "6", "7", "8"];
  this.cellMarker = 'X';
}


GameBoard.prototype.setBoard = function ()
{
  var i, j, boardTags;
  
  boardTags = "";
    
  // build the first row of column labels
  boardTags += "<tr><th>&nbsp</th>";
  for (j = 0; j < this.columns.length; j++) {
    boardTags += "<th>" + this.columns[j] + "</th>";
  }
  boardTags += "</tr>";

  // build the table with HTML tags
  for (i = 0; i < this.rows.length; i++) {
    boardTags += "<tr>";
    boardTags += "<th>" + this.rows[i] + "</th>";  // row labels

    for (j = 0; j < this.columns.length; j++) {
      boardTags += "<td class='square' id='cell" + 
        this.rows[i] + this.columns[j] + "'>" + this.cellMarker + "</ td>";
    }
    boardTags += "</tr>";
  }
  $("#board").html(boardTags);
  
  
  for (i = 0; i < this.ruins.length; i++) {
    this.setRuin(this.ruins[i]);
  }
}

GameBoard.prototype.dig = function(square, processResult)
{
  var target, targetObj;
  target = $("#cell"+square).attr('ruin');
  if (target) {
    targetObj = this.getRuin(target);
    if (! $("#cell"+square).attr('dug')) {
       $("#cell"+square).attr('dug', 'yes');
       targetObj.successes++;
    }
    return targetObj;
  }
  else {
    return undefined;
  }
  
}

GameBoard.prototype.getRuin = function(ruinName)
{
  for (var i = 0; i < this.ruins.length; i++) {
    if (ruinName === this.ruins[i].name) {
      return this.ruins[i];
    }
  }
  return undefined;
}

GameBoard.prototype.randomSquare = function()
{
   var colIndex = Math.floor(Math.random() * this.columns.length);
   var rowIndex = Math.floor(Math.random() * this.rows.length);
   return this.rows[rowIndex] + this.columns[colIndex];
}


GameBoard.prototype.setRuin = function(ruin)
{ 
  // keeps randomly trying to place a ruin until it fits on the board
  var candidateSquare = this.randomSquare();
  var across = Math.random() < 0.5;
  var success = this.tryPlacement(ruin, candidateSquare, across, ruin.size);
  while (! success) {
    candidateSquare = this.randomSquare();
    across = Math.random() < 0.5;
    success = this.tryPlacement(ruin, candidateSquare, across, ruin.size); 
  }
}

GameBoard.prototype.tryPlacement = function(ruin, square, across, size) {
  var nextSquare;
  
  if (size === 0) {
    // ruin fits!
    return true;
  }
  else if (! square) {
    // invalid square
    return false;
  }
  
  if (! $("#cell" + square).attr('ruin')) {
    $("#cell" + square).attr('ruin', ruin.name);

    // see if the rest of the ruin fits
    if (this.tryPlacement(ruin, this.increment(square, across), across, size - 1)) {
      // ruin fits!
      return true;
    }
    else {
      // ruin didn't fit --- undo occupied square and return false
      $("#cell" + square).removeAttr('ruin');
      return false
    }
  }
}

GameBoard.prototype.increment = function(square, across)
{
  if (across) {
    // need to increment the column dimension if possible
    var colIndex = this.columns.indexOf(square.charAt(1));
    colIndex++;
    if (colIndex === this.columns.length) {
      return undefined;
    }
    else {
      return square.charAt(0) + this.columns[colIndex];
    }
  }
  else {
    // need to increment the row dimension if possible
    var rowIndex = this.rows.indexOf(square.charAt(0));
    rowIndex++;
    if (rowIndex === this.rows.length) {
      return undefined;
    }
    else {
      return this.rows[rowIndex] + square.charAt(1);
    }
  }
}

