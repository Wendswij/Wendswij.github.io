    var jellyfish; // jellyfish video
    var dogImg, catImg; // cat and dog image
    var meow, woof; // audio
    var currentImage = null; // selected image
    var currentAnimal = ''; // to track

    // preload images using p5.js
    function preload() {
      dogImg = loadImage('Assets/Coton de Tulear 2.jpg'); // dog
      catImg = loadImage('Assets/tranmautritam.jpg'); // cat
    }

    // canvas setup
    function setup() {
      createCanvas(windowWidth, windowHeight);
      imageMode(CENTER);

      // video
      jellyfish = createVideo('Assets/jellyfish.mp4');
      jellyfish.hide(); // hide the controls [play, pause, bar, etc]
      jellyfish.loop(); // to loop video
      jellyfish.volume(0); // mute any audio from image

      // audio
      meow = createAudio('Assets/kitty.mp3');
      woof = createAudio('Assets/woof.mp3');
      meow.hide();
      woof.hide();
    }

    function draw() {
      background(2, 8, 7); // background colour matches the video
      image(jellyfish, width / 2, height / 2, 720, 405);

      // make selected image spinning woooo
      if (currentImage) {
        push();
        translate(mouseX, mouseY);
        rotate(frameCount / 50); // rotation
        image(currentImage, 0, 0, 200, 200); // current image
        pop();
      }
    }

    // stop sounds if played so they don't overlap each other
    function stopAllSounds() {
      meow.elt.pause(); // pause meow
      meow.elt.currentTime = 0; // reset
      woof.elt.pause(); // pause woof
      woof.elt.currentTime = 0; // reset
    }

    // "see dog" button function
    function showDog() {
      currentImage = dogImg;
      currentAnimal = 'dog';
      stopAllSounds();
      woof.elt.play();
    }

    // "see cat" button function
    function showCat() {
      currentImage = catImg;
      currentAnimal = 'cat';
      stopAllSounds();
      meow.elt.play();
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }