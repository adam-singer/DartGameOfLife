class Cell {
  num col;
  num row;
  num neighbour=0;
  final HASHFACTOR = 5000; 
  Cell(this.col,this.row);
  
  bool equals(o){
    if (!(o is Cell)){
      return false;
    }
    
    return col==o.col && row==o.row;
  }
  
  hashCode() {
    return HASHFACTOR*row+col;
  }
  
  String toString() {
    return "Cell at ("+col+", "+row+") with "+neighbour+" neighbour"+(neighbour==1?"":"s");
  }
}
