class ShapeCollection {

  Shape CLEAR;
  Shape GLIDER;
  Shape SMALLEXPL;
  Shape EXPLODER;
  Shape CELL10;
  Shape FISH;
  Shape PUMP;
  Shape SHOOTER;
  Map<String, Shape> COLLECTION;
  
  ShapeCollection() {
    CLEAR = new Shape("Clear", new List<List<num>>());
    GLIDER = new Shape("Glider", [[1,0], [2,1], [2,2], [1,2], [0,2]]);
    SMALLEXPL = new Shape("Small Exploder", [[0,1], [0,2], [1,0], [1,1], [1,3], [2,1], [2,2]]);
    EXPLODER = new Shape("Exploder", [[0,0], [0,1], [0,2], [0,3], [0,4], [2,0], [2,4], [4,0], [4,1], [4,2], [4,3], [4,4]]);
    CELL10 = new Shape("10 Cell Row", [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0], [9,0]]);
    FISH = new Shape("Lightweight spaceship", [[0,1], [0,3], [1,0], [2,0], [3,0], [3,3], [4,0], [4,1], [4,2]]);
    PUMP = new Shape("Tumbler", [[0,3], [0,4], [0,5], [1,0], [1,1], [1,5], [2,0], [2,1], [2,2], [2,3], [2,4], [4,0], [4,1], [4,2], [4,3], [4,4], [5,0], [5,1], [5,5], [6,3], [6,4], [6,5]]);
    SHOOTER = new Shape("Gosper Glider Gun", [[0,2], [0,3], [1,2], [1,3], [8,3], [8,4], [9,2], [9,4], [10,2], [10,3], [16,4], [16,5], [16,6], [17,4], [18,5], [22,1], [22,2], [23,0], [23,2], [24,0], [24,1], [24,12], [24,13], [25,12], [25,14], [26,12], [34,0], [34,1], [35,0], [35,1], [35,7], [35,8], [35,9], [36,7], [37,8]]);
    COLLECTION = { 
                   "Glider":GLIDER,
                   "Small Exploder":SMALLEXPL,
                   "Exploder":EXPLODER,
                   "10 Cell Row":CELL10,
                   "Lightweight spaceship":FISH,
                   "Tumbler":PUMP,
                   "Gosper Glider Gun":SHOOTER,
                   "Clear":CLEAR
                   };
  }
  
  Map<String, Shape> getShapes() {
    return COLLECTION;
  }
  
  Shape getShapeByName(String name) {
    return COLLECTION[name];
  }
}
