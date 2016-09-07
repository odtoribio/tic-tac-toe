"use strict";
var application = {
	
	board: {
		positions: ["c","b","d","e","f","g","h","i","j"],
		board_status: ["","","","","","","","",""],
		pieces:{
			first: "X",
			second: "O",
		},
	},

	local_storage_keys: {
		current_piece: "currentPiece",
		virtual_board: "virtualBoard",
		game_status: "gameStatus",
	},

	init: function(){
		window.onload = function(){
			this.renderCurrentGameStatus();
			this.clickWatcher();
		}.bind(application)
	},

	clickWatcher: function(){
		var self = this;
		var board_spaces = document.getElementsByClassName("item");
		for (var i = 0; i < board_spaces.length; i++){
			(function(i){
				board_spaces[i].addEventListener("click",function(){
					self.playInFreeSpace(this, i);
				});
			})(i);
		}
	},

	// winnerWatcher: function(current_game){
		
	// 	// Check diagonal winner
	// 	if ((current_game[0] === current_game[4]) && (current_game[4] === current_game[8])){

	// 	}else if ((current_game[2] === current_game[4]) && (current_game[4] === current_game[6])){
			
	// 	}

	// 	// Check horizontal winner
	// 	for (var i = 0; i < current_game.length ; i+3){
	// 		(current_game[i] === current_game[i+1]) && (current_game[i+1] === current_game[i+2])
	// 	}
	// 	// Check vertical winner
	// 	for (var i = 0; i < current_game.length ; i++){
	// 		(current_game[i] === current_game[i+3]) && (current_game[i+3] === current_game[i+6])
	// 	}


	// },

	playInFreeSpace: function(free_space, index){
		if (free_space.innerHTML == "") {
			var piece = this.getPieceInTurn();
			var current_status_available = this.readItem(this.local_storage_keys.game_status);
			var status_array = JSON.parse(current_status_available);
			status_array[index] = piece;
			current_status_available = JSON.stringify(status_array);
			this.saveItem(this.local_storage_keys.game_status, current_status_available );
			free_space.innerHTML = piece;
			this.winnerWatcher(status_array);
		}
	},

	renderCurrentGameStatus: function(){
		var current_game = this.readItem(this.local_storage_keys.game_status);
		if (current_game === null){
			this.saveItem(this.local_storage_keys.game_status, JSON.stringify(this.board.board_status))
		}else{

			var game_status_array = JSON.parse(current_game);
			var board_spaces = document.getElementsByClassName("item");

			for (var i = 0; i < board_spaces.length; i++){
				board_spaces[i].innerHTML = game_status_array[i];
			}
			
		}
	},

	resetBoard: function(){
		localStorage.removeItem(this.local_storage_keys.current_piece);
		localStorage.removeItem(this.local_storage_keys.game_status);
		location.reload()
	},

	getPieceInTurn:function(){
		this.setPieceInTurn();
		return this.readItem(this.local_storage_keys.current_piece)
	},

	setPieceInTurn: function (){
		var piece_in_turn = this.readItem(this.local_storage_keys.current_piece)
		
		if (piece_in_turn === null){
			this.saveItem(this.local_storage_keys.current_piece, this.board.pieces.first)
		}else if (piece_in_turn === this.board.pieces.first){
			this.saveItem(this.local_storage_keys.current_piece, this.board.pieces.second)
		}else if (piece_in_turn === this.board.pieces.second){
			this.saveItem(this.local_storage_keys.current_piece, this.board.pieces.first)
		}
	},

	saveItem: function(key,value){
		localStorage.setItem(key,value);
	},

	readItem: function(key){
		return localStorage.getItem(key);
	},
};

application.init();
