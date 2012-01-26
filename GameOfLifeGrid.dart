class GameOfLifeGrid implements CellGrid {
  num cellRows=0;
  num cellCols=0;
  num generations=0;
  List<Shape> shapes;
  
  Map<Cell,Cell> currentShape;
  Map<Cell,Cell> nextShape;
  
  List<List<Cell>> grid;
      
  GameOfLifeGrid(this.cellCols, this.cellRows) {
    // Create new shape maps
    currentShape = new Map<Cell,Cell>();
    nextShape = new Map<Cell,Cell>();

    // Create new grid array
    grid = new List<List<Cell>>(cellCols);
    for(num i=0; i<grid.length; i++) {
        grid[i] = new List<Cell>(cellRows);
    }
    
    // Create default cells for grid
    for ( num c=0; c<cellCols; c++) {
      for ( num r=0; r<cellRows; r++ ) {
        grid[c][r] = new Cell(c,r);
      }
    }
  }
  
  // check if cell is in the currentShap map
  bool getCell(num col, num row) { 
    try {
      return currentShape.containsKey(grid[col][row]);
    } catch (Exception e) {
      // ignore
    }
    return false;

  }
  
  // add or remote cell from currentShape map
  setCell(num col, num row, bool c) {
    try {
      Cell cell = grid[col][row];
      if ( c ) {
        currentShape[cell] = cell;
      } else {
        currentShape.remove(cell);
      }
    } catch (Exception e) {
      // ignore
    }
  }
  
  // get generation
  getGenerations() {
    return generations;
  }
  
  // get  dimension
  Dimension getDimension() { 
    return new Dimension( cellCols, cellRows );
  }
  
  // get list of current shapes
  getEnum() {
    return currentShape.getKeys();
  }
  
  // clear currentShape, nextShape and generations 
  clear() { 
    generations = 0;
    currentShape.clear();
    nextShape.clear();
  }
  
  // resize the map
  resize(num cellColsNew, num cellRowsNew) {
    if ( cellCols==cellColsNew && cellRows==cellRowsNew )
      return; // Not really a resize
    
    // Create a new grid, reusing existing Cell's
    List<List<Cell>> gridNew = new List<List<Cell>>(cellColsNew);
    for(List<Cell> i in grid) {
      i = new List<Cell>(cellRowsNew);
    }
    
    for ( num c=0; c<cellColsNew; c++){
      for ( num r=0; r<cellRowsNew; r++ ) {
        if ( c < cellCols && r < cellRows ) {
          gridNew[c][r] = grid[c][r];
        } else {
          gridNew[c][r] = new Cell( c, r );
        }
      }
    }
    
    // Copy existing shape to center of new shape
    num colOffset = (cellColsNew-cellCols)/2;
    num rowOffset = (cellRowsNew-cellRows)/2;
    Cell cell;
    List<Cell> enum;
    nextShape.clear();
    enum = currentShape.getKeys();

    for(Cell cell in enum) {
      num colNew = cell.col + colOffset;
      num rowNew = cell.row + rowOffset;
      try {
        nextShape[gridNew[colNew][rowNew]] = gridNew[colNew][rowNew] ;
      } catch (Exception e) {
        // ignore
      }
      
    }
    
    // Copy new grid and hashtable to working grid/hashtable
    grid = gridNew;
    currentShape.clear();
    enum = nextShape.getKeys();
    for(Cell cell in enum) {
      currentShape[cell] = cell;
    }
    
    cellCols = cellColsNew;
    cellRows = cellRowsNew;
       
  }
  
  // add a neighbour to cell location  
  addNeighbour(num col, num row) {
    try {
      Cell cell = nextShape[grid[col][row]]; 
      if ( cell == null ) {
        // Cell is not in map, then add it
        Cell c = grid[col][row];
        c.neighbour = 1;
        nextShape[c] = c;
      } else {
        // else increments neighbour count
        cell.neighbour++;
      }
    } catch (Exception e) {
      // ignore
    }
  }
  
  // move to next generation from current generation
  next() {
    Collection<Cell> tmpCells;
    
    generations++;
    nextShape.clear();
    
    // Reset cells
    tmpCells = currentShape.getKeys();
    for(Cell c in tmpCells) {
      c.neighbour = 0;
    }
    
    // Add neighbours
    tmpCells = currentShape.getKeys();
    for(Cell cell in tmpCells) {
      num col = cell.col;
      num row = cell.row;
      addNeighbour( col-1, row-1 );
      addNeighbour( col, row-1 );
      addNeighbour( col+1, row-1 );
      addNeighbour( col-1, row );
      addNeighbour( col+1, row );
      addNeighbour( col-1, row+1 );
      addNeighbour( col, row+1 );
      addNeighbour( col+1, row+1 );
    }
       
    // Bury the dead
    tmpCells = currentShape.getKeys();
    for(Cell cell in tmpCells) {
      if (cell.neighbour != 3 && cell.neighbour != 2) {
        currentShape.remove(cell);
      }
    }
    
    // Bring out the new borns
    tmpCells = nextShape.getKeys();
    for(Cell cell in tmpCells) {
      if (cell.neighbour == 3) {
        setCell(cell.col, cell.row, true);
      }
    }
  }
}
