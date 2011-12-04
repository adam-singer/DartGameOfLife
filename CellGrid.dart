interface CellGrid {
  bool getCell(num col, num row);
  setCell(num col, num row, bool cell);
  Dimension getDimension();
  resize(num col, num row);
  Collection<Cell> getEnum();
  clear();
}
