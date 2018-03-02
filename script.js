var app = new Vue({
  el: '#app',
  data: {
    difficulty: 0,
    numofMines: 8,
    numSquares: 0,
    squares:[],
    mines: [],
    flagged: [],
    message: "Don't Step on a Mine!"
  },
  created: function() {
    this.loadGame();
  },
  methods: {
    handle: function(e, square){
      if(e.shiftKey){
        this.flagSquare(square);
      }else{
        this.clickedSquare(square);
      }
    },
    randomNumber : function(){
      return Math.floor(Math.random() *this.numSquares);
    },
    size: function(number){
      this.difficulty = number;
      this.loadGame();
      this.loadSquares();
    },
    inMines: function(number) {
      for(i = 0; i < this.mines.length; i++){
        if(this.mines[i] === number){
          return true;
        }
      }
      return false;
    },
    removeFlag: function(number) {
      var i;
      for(i = 0; i < this.flagged.length; i++){
        if(this.flagged[i] === number){
           break;
        }
      }
      if(i !== undefined){
        this.flagged.splice(i, 1);
      }
    },
    loadGame: function(){
      this.squares = [];
      this.mines= [];
      this.flagged = [];
   },
   getSize(){
     if (this.difficulty === 0){
       this.numSquares = 42;
     } else if(this.difficulty === 1){
        this.numSquares = 110;
     } else{
       this.numSquares = 224;
     }
   },
    loadSquares: function() {
      this.getSize();
      if(this.numofMines > this.numSquares){
        this.numofMines = this.numSquares;
      }
      if(this.numofMines < 1){
        this.numofMines = 1;
      }
      for(i = 0; i < this.numSquares; i++){
       this.squares.push({class:true, id: i, value: ""});
     }
     for(i = 0; i < this.numofMines; i++){
       var rand = this.randomNumber();
       while(this.inMines(rand)){
         rand = this.randomNumber();
       }
       this.mines.push(this.randomNumber());
       this.flagged.push(this.randomNumber());
     }
    },
    endGame: function() {
      this.message = "Play Again!";
      this.loadGame();
    },
    flagSquare: function(square) {
      this.squares[square].value = "#";
      this.squares[square].class = false;
      this.flagged = this.flagged.filter(function(item) {
        var equal = item === square;
        return !equal;
      });ß
      if(this.flagged.length === 0){
        alert("You're the Winner!");
        this.endGame();
      }
    },
    clickedSquare: function(square) {
      if(this.squares[square].value === "#"){
        this.squares[square].value = "";
        this.squares[square].class = true;
        if(this.inMines(square)){
          this.flagged.push(square);
        }
        return;
      }
      this.squares[square].class = false;
      var num = this.numberBombs(square);
      if(num > 0){
        this.squares[square].value = num;
      }
      if(this.inMines(square)){
        this.squares[square].value = "*";
        alert("KAPLOW! You lose!");
        this.endGame();
      }
    },
    numberBombs: function(square){
      var num = 0;
      if(this.inMines(square-1)){
        num++;
      }
      if(this.inMines(square+1)){
        num++;
      }
      if(this.inMines(square+16)){
        num++;
      }
      if(this.inMines(square-16)){
        num++;
      }
      if(this.inMines(square-17)){
        num++;
      }
      if(this.inMines(square+17)){
        num++;
      }
      if(this.inMines(square-15)){
        num++;
      }
      if(this.inMines(square+15)){
        num++;
      }
      return num;
    },
  },
});
