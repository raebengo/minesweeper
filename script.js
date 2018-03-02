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
    checkforWin: function(){
      if(this.flagged.length !== this.mines.length){
        return false;
      }
      for(i = 0; i < this.flagged.length; i++){
        if(!this.inMines(this.flagged[i])){
          return false;
        }
      }
      return true;
    },
    loadGame: function(){
      this.squares = [];
      this.mines= [];
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
      for(i = 0; i < this.numSquares; i++){
       this.squares.push({class:true, id: i, value: ""});
     }
     console.log(this.squares);
     for(i = 0; i < this.numofMines; i++){
       this.mines.push(this.randomNumber());
     }
     console.log(this.mines);
    },
    endGame: function() {
      this.message = "Play Again!";
      this.loadGame();
      this.loadGame();
    },
    flagSquare: function(square) {
      if(this.squares[square].value !== "#"){
        this.squares[square].value = "#";
        this.flagged.push(square);
      }else{
        this.squares[square].value = "";
        this.squares[square].class = true;
        this.removeFlag(square);
      }
      if(this.checkforWin()){
        this.endGame();
      }
    },
    clickedSquare: function(square) {
      if(this.squares[square].value === "#"){
        this.squares[square].value = "";
        this.squares[square].class = true;
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
