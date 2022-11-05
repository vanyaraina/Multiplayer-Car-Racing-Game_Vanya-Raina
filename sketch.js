var canvas;
var backgroundImage;
var bgImg;
var database;
var myform, myplayer, mygame;

var myPlayerCount, myGameState
var car1,car2,car1Image,car2Image, trackImage
var cars=[]

var fuelImage,fuleGroup
var powerCoinsImage,powerCoinsGroup
var lifeImage

var obstacle1, obstacle2
var obstacle1Image, obstacle2Image

var blastImage


// its stores all the players info(1,2--->information)
var allPlayers

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  trackImage=loadImage("./assets/track.jpg")
  car1Image=loadImage("./assets/car1.png")
  car2Image=loadImage("./assets/car2.png")
  fuelImage=loadImage("./assets/fuel.png")
  powerCoinsImage=loadImage("./assets/goldCoin.png")
  lifeImage = loadImage("./assets/life.png")
  obstacle1Image = loadImage("./assets/obstacle1.png")
  obstacle2Image = loadImage("./assets/obstacle2.png")
  blastImage = loadImage("./assets/blast.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();

  mygame = new Game()
  mygame.start()
  mygame.getState()



}

function draw() {
  background(backgroundImage);
  if (myPlayerCount === 2) {
    mygame.updateState(1)
  }

  if(myGameState === 1){
    mygame.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}








// var canvas;
// var backgroundImage;
// var bgImg;
// var database;
// var myform, myplayer, mygame;
// var myplayerCount, mygameState;
// var car1, car2, car1Image, car2Image, TrackImage;
// var fuelImage, fuelImageGroup;
// var powerCoinsImage, powerCoinsGroup;
// var cars = [];
// var allPlayers

// function preload() {
//   backgroundImage = loadImage("./assets/background.png");
//   car1Image = loadImage("./assets/car1.png");
//   car2Image = loadImage("./assets/car2.png");
//   TrackImage = loadImage("./assets/track.jpg");
//   powerCoinsImage = loadImage("./assets/goldCoin.png");
//   fuelImage = loadImage("/assets/fuel.png")
// }

// function setup() {
//   canvas = createCanvas(windowWidth, windowHeight);
//   database = firebase.database();
//   mygame = new Game();
//   mygame.start();
//   mygame.getState();
// }

// function draw() {
//   background(backgroundImage);
//   if (myplayerCount === 2) {
//     mygame.updateState(1);
//   }

//   if (mygameState === 1) {
//     mygame.play();
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
