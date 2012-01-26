#import('dart:dom');
#source('Cell.dart');
#source('CellGrid.dart');
#source('Dimension.dart');
#source('Shape.dart');
#source('ShapeCollection.dart');
#source('GameOfLifeGrid.dart');

class GameOfLife {
  var spacing = 10;
  var colSize = 50;
  var rowSize = 50;
  var iterations = 500;
  var drawSpeed = 110;
  var shapeName = "Small Exploder";
  
  HTMLCanvasElement canvasElement ;
  CanvasRenderingContext2D canvasRenderingContext2D;
  HTMLSelectElement selectButton;
  HTMLButtonElement stopStartButton;
  HTMLButtonElement nextButton;
  HTMLInputElement iterationsInput;
  HTMLInputElement drawSpeedInput;
  bool running;
  int intervalId;
  GameOfLifeGrid g;
  
  GameOfLife() {
    running = false; 
    
    // Wire up the drawSpeedInput 
    drawSpeedInput = document.getElementById('drawSpeedInput');
    drawSpeedInput.onchange = (Event e) {
      drawSpeed = drawSpeedInput.valueAsNumber;
    };
    
    // Get the iterationsInput and iterations value
    iterationsInput = document.getElementById('iterationsInput');
    iterations =  iterationsInput.valueAsNumber;
    
    // Load selectButton with options
    selectButton = document.getElementById('dropDownList');   
    ShapeCollection shapeCollection = new ShapeCollection();
    for(var s in shapeCollection.COLLECTION.getKeys()) {
      // place options into select drop down
      var o = document.createElement("option");
      o.innerHTML = s;
      o.value= s;
      selectButton.appendChild(o);
    }
   
    
    
    selectButton.onchange = (Event e) {
      shapeName = selectButton.options.item(selectButton.selectedIndex).textContent;
      loadShape(shapeName, g);
      printCanvas(canvasRenderingContext2D, g, spacing);
    };
   
    stopStartButton = document.getElementById("StopStart");
    stopStartButton.innerHTML = "Start";
    stopStartButton.onclick = (Event e) {
      if (running) {
        // Stop the generations
        window.clearInterval(intervalId);
        
        stopStartButton.innerHTML = "Start";
        nextButton.disabled = false;
        iterationsInput.disabled = false;
        drawSpeedInput.disabled = false;
        selectButton.disabled = false;
      } else {
        // Start the generations 
        stopStartButton.innerHTML = "Stop";
        nextButton.disabled = true;
        iterationsInput.disabled = true;
        drawSpeedInput.disabled = true; 
        selectButton.disabled = true;
        iterations = iterationsInput.valueAsNumber;
        
        intervalId = window.setInterval(f() {
          iterations--;
          iterationsInput.valueAsNumber = iterations;
          g.next();
          printCanvas(canvasRenderingContext2D, g, spacing);
          if (iterations <= 0){
            window.clearInterval(intervalId);
          }
        }, drawSpeed);
        
      } 
      
      running = !running;  
    };
    
    nextButton = document.getElementById("Next");
    nextButton.onclick = (Event e) {
      if (!running && iterations >= 0) {
        // Should prob put this into a single call. 
        iterations--;
        //iterationsInput.setAttribute("value", iterations.toString());
        iterationsInput.valueAsNumber = iterations;
        g.next();
        printCanvas(canvasRenderingContext2D, g, spacing);
      }
    };
    
  }
  
  void run() {
    canvasElement = document.getElementById('lifeCanvas');
    canvasRenderingContext2D = canvasElement.getContext('2d');
   
    g = new GameOfLifeGrid(colSize,rowSize);
    selectButton.selectedIndex = 1;
    loadShape(shapeName, g);
    printCanvas(canvasRenderingContext2D, g, spacing);
    
    /*
    window.setInterval(f() {
      iterations--;
      g.next();
      printCanvas(canvasRenderingContext2D, g, spacing);
      if (iterations == 0){
       window.stop(); 
      }
    }, drawSpeed);
    */
  }
  
  
  
  
  printCanvas(CanvasRenderingContext2D canvasRenderingContext2D, GameOfLifeGrid g, int spacing) {
    canvasRenderingContext2D.lineWidth = 1;
    canvasRenderingContext2D.lineCap = 'round';
    canvasRenderingContext2D.setStrokeColor('rgb(51, 255, 51)');
    canvasRenderingContext2D.fill();
    for ( num c=0; c<g.grid.length; c++) {
      //String ps = "";
      for ( num r=0; r<g.grid[c].length; r++ ) {
        Cell printCellLocation = g.grid[c][r];
        if (g.currentShape.containsKey(printCellLocation)) {
          //ps+="*[${c},${r}] ";
          //ps+="*";
          //canvasRenderingContext2D.setFillColor('rgba(187, 255, 255,0.5)');
          canvasRenderingContext2D.setFillColor('rgba(187, 255, 255,0.9)');
          //canvasRenderingContext2D.setStrokeColor('rgb(25, 255, 51)');
          //canvasRenderingContext2D.fill()
          canvasRenderingContext2D.fillRect(c*spacing,r*spacing,10-1,10-1);        
          } else {
          //ps+="-[${c},${r}] ";
          //ps+="-";
            //canvasRenderingContext2D.setFillColor('rgba(0, 0, 0, 0)');
            //canvasRenderingContext2D.setStrokeColor('rgba(255, 127, 0, 0.5)');
            //canvasRenderingContext2D.fillRect(c*spacing,r*spacing,10,10); 
            canvasRenderingContext2D.clearRect(c*spacing,r*spacing,10,10);
            canvasRenderingContext2D.strokeRect(c*spacing,r*spacing,10,10);
            
        }
      }
      //print(ps);
    }
    //canvasRenderingContext2D.stroke(); 
  }
}

void main() {
  new GameOfLife().run();
}

// Dead code. Remove
void Xmain() {
  var colSize=50;
  var rowSize=50;
  var iterations = 20;
  var shapeName = "Small Exploder";
  //new GameOfLife().run();
  GameOfLifeGrid g = new GameOfLifeGrid(colSize,rowSize);
  
  //print("h = "+g.getDimension().height);
  //print("w = "+g.getDimension().width);
  
  loadShape(shapeName, g);
  printConsoleGrid(g);
  
  for (int i=0; i<iterations; i++) {
    g.next();
    printConsoleGrid(g);
  }
  
}

printConsoleGrid(GameOfLifeGrid g) {
  print("printing console grid"); 
  for ( num c=0; c<g.grid.length; c++) {
    String ps = "";
    for ( num r=0; r<g.grid[c].length; r++ ) {
      Cell printCellLocation = g.grid[c][r];
      if (g.currentShape.containsKey(printCellLocation)) {
        //ps+="*[${c},${r}] ";
        ps+="*";
      } else {
        //ps+="-[${c},${r}] ";
        ps+="-";
      }
    }
    print(ps);
  }
}

// Load the shapes into the grid
loadShape(String name, GameOfLifeGrid g){
  Dimension dimShape;
  Dimension dimGrid;
  
  ShapeCollection shapeCollection = new ShapeCollection();
  
  // Clear the grid
  g.clear();
  
  // get the shape
  Shape shape = shapeCollection.getShapeByName(name);
  
  // Center the shape.
  dimShape =  shape.getDimension();
  dimGrid =  g.getDimension();
  num xOffset = ((dimGrid.width - dimShape.width) / 2).toInt();
  num yOffset = ((dimGrid.height - dimShape.height) / 2).toInt();
  
  for (List<num> s in shape.shape) {
    //print ("g.setCell(${xOffset}+${s[0]}, ${yOffset}+${s[1]}, true);");
    g.setCell(xOffset+s[0], yOffset+s[1], true);
  }
}
