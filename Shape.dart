class Shape {
  String name;
  List<List<num>> shape;
  
  Shape(this.name,this.shape);
  
  Dimension getDimension() {
    var shapeWidth = 0;
    var shapeHeight = 0;
    for (int cell = 0; cell < shape.length; cell++) {
      if (shape[cell][0] > shapeWidth)
        shapeWidth = shape[cell][0];
      if (shape[cell][1] > shapeHeight)
        shapeHeight = shape[cell][1];
    }
    shapeWidth++;
    shapeHeight++;
    return new Dimension( shapeWidth, shapeHeight );
  }
  
  String getName() {
    return name;
  }
  
  List<List<num>> getCells() {
    return this.shape;
  }
  
  String toString() {
    return name+" ("+shape.length+" cell"+(shape.length==1?"":"s")+")";
  }
}
