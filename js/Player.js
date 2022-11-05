class Player {
    constructor() {
      this.index = null
      this.name = null
      this.positionX = 0
      this.positionY = 0
      this.rank = 0
      this.fuel = 180
      this.life = 180
      this.score = 0
    }
  
    getCount() {
      var playercountRef = database.ref("playerCount")
      playercountRef.on("value", (data) => {
        myPlayerCount = data.val()
      })
    }
  
    addplayers() {
      // this is the new node creating in database
      var playerindex = "players/player" + this.index
  
      if (this.index === 1) {
        this.positionX = width / 2 - 100
  
      }
      else {
        this.positionX = width / 2 + 100
      }
  
      database.ref(playerindex).set({
        name: this.name,
        index: this.index,
        positionX: this.positionX,
        positionY: this.positionY,
        rank: this.rank,
        life: this.life,
        score: this.score,
        fuel: this.fuel
      })
    }
  
    updateCount(countNumber) {
      database.ref("/").update({
        playerCount: countNumber
      })
    }
  
  
    // get x and y position of the players
    getDistance() {
      // playernode= "players/player"+this.index
      var playerDistanceRef = database.ref("players/player" + this.index)
      playerDistanceRef.on("value", (data) => {
        var distance = data.val()
        this.positionX = distance.positionX
        this.positionY = distance.positionY
      })
    }
  
    //  update x and y position of the players in firebase when we use arrow keys
    updatePlayers() {
      var playerRef = "players/player" + this.index
      database.ref(playerRef).update({
        name: this.name,
        positionX: this.positionX,
        positionY: this.positionY,
        index: this.index,
        rank: this.rank,
        life: this.life,
        score: this.score,
        fuel: this.fuel
      })
    }
  
  
    static getPlayersInfo() {
      // player1 and player2(name,index,posx,posy)
      var playerRef = database.ref("players")
      playerRef.on("value", (data) => {
        allPlayers = data.val()
      })
    }
  
    getCarsAtEnd(){
      database.ref("carsAtEnd").on("value", data =>{
        this.rank = data.val()
      })
    }
  
    static UpdateCarsAtEnd(rank){
      database.ref("/").update({
        carsAtEnd:rank
      })
    }
  }
  







// class Player {
//   constructor() {
//     this.index = null;
//     this.name = null;
//     this.positionX = 0;
//     this.positionY = 0;
//     this.rank = 0
//     this.fuel = 180
//     this.life = 180
//     this.score = 0
//   }

//   getCount() {
//     var playerCountRef = database.ref("playerCount");
//     playerCountRef.on("value", (data) => {
//       myplayerCount = data.val();
//     });
//   }

//   addplayers() {
//     var playerindex = "players/player" + this.index;
//     if (this.index === 1) {
//       this.positionX = width / 2 - 100;
//     } else {
//       this.positionX = width / 2 + 100;
//     }

//     database.ref(playerindex).set({
//       name: this.name,
//       index: this.index,
//       positionX: this.positionX,
//       positionY: this.positionY,
//       rank: this.rank,
//       life: this.life,
//       score: this.score,
//       fuel: this.fuel
//     });
//   }

//   updateCount(countNumber) {
//     database.ref("/").update({
//       playerCount: countNumber,
//     });
//   }

//   getDistance() {
//     var playerDistanceRef = database.ref("players/player" + this.index);
//     playerDistanceRef.on("value", (data) => {
//       var distance = data.val();
//       this.positionX = distance.positionX;
//       this.positionY = distance.positionY;
//     });
//   }

//   updatePlayers() {
//     var playerRef = "players/player" + this.index;
//     database.ref(playerRef).update({
//       name: this.name,
//       positionX: this.positionX,
//       positionY: this.positionY,
//       index: this.index,
//       rank: this.rank,
//       life: this.life,
//       score: this.score,
//       fuel: this.fuel
//     });
//   }

//   static getPlayersInfo() {
//     var playerRef = database.ref("players");
//     playerRef.on("value", (data) => {
//       allPlayers = data.val();
//     });
//   }
  
//   getCarsAtEnd(){
//     database.ref("carsAtEnd").on("value", data =>{
//       this.rank = data.val()
//     })
//   }

//   static UpdateCarsAtEnd(rank){
//     database.ref("/").update({
//       carsAtEnd:rank
//     })
//   }
// }
