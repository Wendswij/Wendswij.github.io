var colourPicker; // function scope
let strokeWeightSlider, opacitySlider;
var bgColourPicker;
var eraserMode = false // Change from pen to eraser

function setup(){
    createCanvas(720,300);
    colourPicker = createColorPicker('slateblue');

    strokeWeightSlider = createSlider(1,10,5,1);
    opacitySlider = createSlider(0,255,255,1); // Opacity Slider

    bgColourPicker = createColorPicker('#76D7C4'); 

    var bgColorButton = createButton('Refresh');
    bgColorButton.mousePressed(repaint);
    bgColourPicker.changed(repaint);

    var eraserButton = createButton('Eraser');
    eraserButton.mousePressed(toggleEraser);

    var saveButton = createButton('Save');
    saveButton.mousePressed(saveDrawing);

    var opacityLabel = createSpan('Opacity:');
    var opacityValue = createSpan(opacitySlider.value());
    opacitySlider.input(() => opacityValue.html(opacitySlider.value()));

    background( bgColourPicker.value() );

    createDiv().child(opacityLabel).child(opacitySlider).child(opacityValue); // fix ui placement of 'opacity' label
}

function draw(){
    let strokeCol;
    if (eraserMode){
        strokeCol = color(bgColourPicker.value()); // Make eraser colour the same as background colour
        strokeCol.setAlpha(255); // Make eraser full opacity
    }else{
        strokeCol = color(colourPicker.value());
        strokeCol.setAlpha(opacitySlider.value());
    }

    // ellipse(mouseX, mouseY, 10,10);
    strokeWeight( strokeWeightSlider.value() );
    stroke( strokeCol);

    // remixed from p5js.org/reference/mouseispressed/
    if(mouseIsPressed){
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    /// end remix
}

function repaint(){
    background( bgColourPicker.value() );
    console.log( bgColourPicker.value().setGreen(255) );
}

function saveDrawing(){
    saveCanvas('myDrawing', 'png'); // save the sketch
}

function toggleEraser(){
    eraserMode = !eraserMode; // eraser
}