class Form {
  constructor() {
    this.input = createInput(" ").attribute("placeholder", "Enter your name");
    this.button = createButton("Play");
    this.greeting = createElement("h2");
    this.title = createImg("./assets/title.png");
  }

  setPosition() {
    this.title.position(width / 2 - 780, height / 2 - 250);
    this.input.position(width / 2 - 100, height / 2);
    this.button.position(width / 2 - 85, height / 2 + 70);
    this.greeting.position(width / 2 - 330, height / 2);
  }

  setStyle() {
    this.title.class("gameTitle");
    this.input.class("customInput");
    this.button.class("customButton");
    this.greeting.class("greeting");
  }

  handleButtonPressed() {
    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();

      // writting a  greeting message
      var message = `Hello ${this.input.value()}
      <br/> wait for another player to join...!`;
      this.greeting.html(message);
      myPlayerCount += 1;
      myplayer.index = myPlayerCount;
      myplayer.name = this.input.value();
      myplayer.updateCount(myPlayerCount);
      myplayer.addplayers();
      myplayer.getDistance();
    });
  }

  display() {
    this.setPosition();
    this.setStyle();
    this.handleButtonPressed();
  }

  hide() {
    this.greeting.hide();
    this.input.hide();
    this.button.hide();
  }
}







// class Form {
//   constructor() {
//     this.input= createInput (" ").attribute("placeholder"," Enter your name ")
//     this.button = createButton("Play")
//     this.greeting = createElement("h2")
//     this.title = createImg("./assets/title.png")

//   }

// setPosition(){
//   this.title.position(width/2 - 780, height/2 - 250)
//   this.input.position(width/2 - 100, height/2)
//   this.button.position(width/2 - 85, height/2 + 70)
//   this.greeting.position(width/2 - 450, height/2)

// }

//   setStyle(){
//     this.title.class ("gameTitle")
//     this.input.class ("customInput")
//     this.button.class ("customButton")
//     this.greeting.class ("greeting")

//   }

//   handleButtonPressed(){
//     this.button.mousePressed(()=>{
//       this.button.hide()
//       this.input.hide()

//       var message = `Hello ${this.input.value()}
//       <br/> Please wait for the other player to join the game...`
//       this.greeting.html(message)
//       myplayerCount+=1
//       myplayer.updateCount(myplayerCount)
//       myplayer.index = myplayerCount
//       myplayer.name = this.input.value()
//       myplayer.addplayers()
//       myplayer.getDistance()
//     })

//   }

//   display(){
//     this.setPosition()
//     this.setStyle()
//     this.handleButtonPressed()
//   }

//   hide(){
//     this.input.hide()
//     this.greeting.hide()
//     this.button.hide()
//   }
// }
