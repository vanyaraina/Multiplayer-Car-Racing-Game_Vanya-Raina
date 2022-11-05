class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetbutton = createButton("");
    this.leadersboard = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playermoving = false;
    this.leftkeyActive = false;
  }

  getState() {
    var gamestateRef = database.ref("gameState");
    gamestateRef.on("value", (data) => {
      myGameState = data.val();
    });
  }

  updateState(statenumber) {
    database.ref("/").update({
      gameState: statenumber,
    });
  }


  start() {
    myform = new Form();
    myform.display();

    myplayer = new Player();
    myplayer.getCount();

    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage("car1", car1Image);
    car1.addImage("blast", blastImage);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2Image);
    car2.addImage("blast", blastImage);
    car2.scale = 0.07;

    cars = [car1, car2];

    // creating groups
    fuleGroup = new Group();
    powerCoinsGroup = new Group();
    obstacle1 = new Group();
    obstacle2 = new Group();

    // calling addSprites function to display fuels
    this.addSprites(fuleGroup, 25, fuelImage, 0.02);
    this.addSprites(powerCoinsGroup, 20, powerCoinsImage, 0.1);

    this.addSprites(obstacle1, 20, obstacle1Image, 0.04);
    this.addSprites(obstacle2, 20, obstacle2Image, 0.04);

  }
  

  handleElements() {
    myform.title.position(40, 50);
    myform.title.class("resetTitle");

    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetbutton.class("resetButton");
    this.resetbutton.position(width / 2 + 230, 100);

    this.leadersboard.html("Leaderboard");
    this.leadersboard.class("resetText");
    this.leadersboard.position(width / 2 - 350, 40);

    //this.leader1.html("leader1");
    this.leader1.class("leadersText");
    this.leader1.position(width / 2 - 300, 80);

    //this.leader2.html("leader2");
    this.leader2.class("leadersText");
    this.leader2.position(width / 2 - 300, 120);
  }

  play() {
    myform.hide();
    this.handleElements();
    Player.getPlayersInfo();
    this.handleResetButton();

    // !== undefined means players are created
    if (allPlayers !== undefined) {
      // image(nameoftheimage,x,y,w,h)
      image(trackImage, 0, -height * 5, width, height * 6);
      this.showleader();
      this.showFuelBar();
      this.showLifeBar();

      //getting active player in current window
      var index = 0;
      // allplayes= player1 and player2
      for (var i in allPlayers) {
        // console.log("show what is i", i)
        index = index + 1;

        // getting x and y position of the car from database
        var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;

        // equating x and y value to current car postion based on index value
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        var currentLife = allPlayers[i].life
        if(currentLife<0){
          cars[index-1].changeImage("blast", blastImage)
          cars[index-1].scale = 0.3
        }

        if (index === myplayer.index) {
          stroke(10);
          strokeWeight("black");
          fill("red");
          ellipse(x, y, 70, 70);
          camera.position.y = cars[index - 1].position.y;
          // camera.position.x = cars[index - 1].position.x;

          this.handlefuel(index);
          this.handlepowerconis(index);
          this.handleObstacles(index);
        }
      }
    }

    this.moveCars();
    drawSprites();
    const finishline = height * 6 - 100;
    if (myplayer.positionY > finishline) {
      myGameState = 2;
      myplayer.rank += 1;
      Player.UpdateCarsAtEnd(myplayer.rank);
      //console.log("cars rank is", myplayer)
      this.ShowRank();
    }
  }

  end() {}

  addSprites(spriteGroup, numberofSprites, spriteImage, scale) {
    for (var i = 0; i < numberofSprites; i += 1) {
      var x, y;
      x = random(width / 2 + 250, width / 2 - 250);
      y = random(-height * 4.5, height - 200);

      var sprite = createSprite(x, y);
      sprite.addImage(spriteImage);
      sprite.scale = scale;

      spriteGroup.add(sprite);
    }
  }

  moveCars() {
    if (keyIsDown(UP_ARROW)) {
      myplayer.positionY += 10;
      this.playermoving = true;
      myplayer.updatePlayers();
    }
    if (keyIsDown(LEFT_ARROW) && myplayer.positionX > width / 3 - 50) {
      myplayer.positionX -= 10;
      this.leftkeyActive = true;
      myplayer.updatePlayers();
    }
    if (keyIsDown(RIGHT_ARROW) && myplayer.positionX < width / 2 + 310) {
      myplayer.positionX += 10;
      this.leftkeyActive = false;
      myplayer.updatePlayers();
    }
  }

  handlefuel(index) {
    // sprite.overlap()
    cars[index - 1].overlap(fuleGroup, function (collector, collected) {
      collected.remove();
      myplayer.fuel = 180;
    });

    if (myplayer.fuel > 0 && this.playermoving === true) {
      myplayer.fuel -= 0.3;
    }

    if (myplayer.fuel <= 0) {
      myGameState = 2;
      this.gameOver();
    }
    myplayer.updatePlayers();
  }
  handlepowerconis(index) {
    // sprite.overlap()
    cars[index - 1].overlap(powerCoinsGroup, function (collector, collected) {
      collected.remove();
      myplayer.score += 20;
    });

    myplayer.updatePlayers();
  }

  handleResetButton() {
    this.resetbutton.mousePressed(() => {
      database.ref("/").set({
        gameState: 0,
        playerCount: 0,
        carsAtEnd: 0,
        players: {},
      });
      window.location.reload();
    });
  }

  showleader() {
    var myleader1;
    var myleader2;

    var players = Object.values(allPlayers);
    //console.log(allPlayers)

    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      myleader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
      myleader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      myleader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
      myleader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(myleader1);
    this.leader2.html(myleader2);
  }

  ShowRank() {
    swal({
      title: `Awesome ${"\n"} Rank:${myplayer.rank} ${"\n"} Score: ${
        myplayer.score
      }`,
      text: `Well done! You did great`,
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Okay",
    });
  }

  showFuelBar() {
    push();
    image(
      fuelImage,
      width / 2 - 150,
      height - myplayer.positionY - 140,
      30,
      30
    );
    fill("white");
    rect(width / 2 - 100, height - myplayer.positionY - 140, 180, 20);

    fill("red");
    rect(width / 2 - 100, height - myplayer.positionY - 140, myplayer.fuel, 20);
    pop();
  }

  showLifeBar() {
    push();
    image(
      lifeImage,
      width / 2 - 150,
      height - myplayer.positionY - 180,
      30,
      30
    );
    fill("white");
    rect(width / 2 - 100, height - myplayer.positionY - 180, 180, 20);

    fill("gold");
    rect(width / 2 - 100, height - myplayer.positionY - 180, myplayer.life, 20);
    pop();
  }

  gameOver() {
    console.log("Game Ended");
    swal({
      title: `Gamer Over ${"\n"} ${myplayer.score}`,
      text: `Oops! You lost the game`,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks for playing",
    });
  }

  handleObstacles(index) {
    if (
      cars[index - 1].collide(obstacle1) ||
      cars[index - 1].collide(obstacle2)
    ) {
      myplayer.life = -180 / 4;

      if ((this.leftkeyActive = true)) {
        myplayer.positionX += 100;
      } else {
        myplayer.positionX -= 100;
      }

      if (myplayer.life > 0) {
        myplayer.life = -180 / 4;
      }
    }

    myplayer.updatePlayers();
  }
}













// class Game {
//   constructor() {

//     this.resetTitle = createElement("h2")
//     this.resetbutton = createButton("")
//     this.leadersboars = createElement("h2")
//     this.leader1 = createElement("h2")
//     this.leader2 = createElement("h2")
//   }

//   getState() {
//     var gamestateRef = database.ref("gameState");
//     gamestateRef.on("value", (data) => {
//       mygameState = data.val();
//     });
//   }

//   updateState(statenumber) {
//     database.ref("/").update({
//       gameState: statenumber,
//     });
//   }

//   start() {
//     myform = new Form();
//     myform.display();

//     myplayer = new Player();
//     myplayer.getCount();

//     car1 = createSprite(width / 2 - 100, height - 100);
//     car1.addImage("car1", car1Image);
//     car1.scale = 0.07;

//     car2 = createSprite(width / 2 + 100, height - 100);
//     car2.addImage("car2", car2Image);
//     car2.scale = 0.07;

//     cars = [car1, car2];

//     fuelImageGroup = new Group();
//     powerCoinsGroup = new Group();

//     this.addSprites(fuelImageGroup, 25, fuelImage, 0.02);
//     this.addSprites(powerCoinsGroup, 15, powerCoinsImage, 0.1);
//   }

//   handleElements() {
//     myform.title.position(40, 60);
//     myform.title.class("resetTitle");

//     this.resetTitle.html("Reset Game")
//     this.resetTitle.class("resetText")
//     this.resetTitle.position(width / 2 + 200, 40)

//     this.resetbutton.class("resetButton")
//     this.resetbutton.position(width / 2 + 230, 100)

//     this.leadersboard.html("leaderboard");
//     this.leadersboard.class("resetText");
//     this.leadersboard.position(width / 2 - 350, 40);

//     this.leader1.html("leader1");
//     this.leader1.class("leadersText");
//     this.leader1.position(width / 2 - 300, 80);

//     this.leader2.html("leader2");
//     this.leader2.class("leadersText");
//     this.leader2.position(width / 2 - 300, 120);
//   }

//   play() {
//     myform.hide();
//     this.handleElements();
//     Player.getPlayersInfo();
//     this.handleResetButton();

//     if (allPlayers !== undefined) {
//       image(TrackImage, 0, -height * 5, width, height * 6);
//     }

//     var index = 0;

//     for (var i in allPlayers) {
//       //console.log("show what is i", i)
//       index = index + 1;

//       //getting x and y position from the database
//       var x = allPlayers[i].positionX;
//       var y = height - allPlayers[i].positionY;

//       //equating x and y value to current car position based on index value
//       cars[index - 1].position.x = x;
//       cars[index - 1].position.y = y;

//       if (index === myplayer.index) {
//         stroke(10);
//         strokeWeight("black");
//         fill("red");
//         ellipse(x, y, 70, 70);
//         camera.position.y = cars[index-1].position.y;
//         camera.position.x = cars[index-1].position.x;

//         this.handlefuels(index)
//         this.handlepowerconis(index)
//       }
//     }
//     this.moveCars();
//     drawSprites();
//   }

//   end() {}

//   addSprites(spriteGroup, numberofSprites, spriteImage, scale) {
//     for (var i = 0; i < numberofSprites; i += 1) {
//       var x, y;
//       x = random(width / 2 + 350, width / 2 - 350);
//       y = random(-height * 4.5, height - 200);

//       var sprite = createSprite(x, y);
//       sprite.addImage(spriteImage);
//       sprite.scale = scale;

//       spriteGroup.add(sprite);
//     }
//   }

//   moveCars() {
//     if (keyIsDown(UP_ARROW)) {
//       myplayer.positionY += 10
//       myplayer.updatePlayers()
//     }
//     if (keyIsDown(LEFT_ARROW)) {
//       myplayer.positionX -= 10
//       myplayer.updatePlayers()
//     }
//     if (keyIsDown(RIGHT_ARROW)) {
//       myplayer.positionX += 10
//       myplayer.updatePlayers()
//     }
//   }

//   handlefuel(index) {
//     // sprite.overlap()
//     cars[index - 1].overlap(fuleGroup, function (collector, collected) {
//       collected.remove()
//     })
//   }
//   handlepowerconis(index) {
//     // sprite.overlap()
//     cars[index - 1].overlap(powerCoinsGroup, function (collector, collected) {
//       collected.remove()
//     })
//   }

//   handleResetButton() {
//     this.resetbutton.mousePressed(() => {
//       database.ref("/").set({
//         gameState: 0,
//         playerCount: 0,
//         carsAtEnd: 0,
//         players: {}
//       })
//       window.location.reload()
//     })
//   }

//     showleader(){
//       var myleader1;
//       var myleader2;

//        var players = Object.values(allPlayers)
//        //console.log(allPlayers)

//        if(players[0].rank === 0 && players[1].rank === 0 || (players[0].rank === 1)){
//         myleader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
//         myleader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
//        }

//        if(players[1].rank === 1){
//         myleader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
//         myleader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
//        }

//        this.leader1.html(myleader1)
//        this.leader2.html(myleader2)
//     }
// }
