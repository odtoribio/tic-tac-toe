"use strict";
var application = {

	positions: ["c","b","d","e","f","g","h","i","j"],

	pieces:  {
		first_piece: "X",
		second_piece: "O",
	},

	local_storage_keys: {
		current_piece: "currentPiece",
		virtual_board: "virtualBoard",
	},

	init: function(){
		window.onload = function(){
			var arr = new Array();
			arr.push('hi','ho','hu');
			if (this.readItem(this.local_storage_keys.virtual_board) === null) {
				console.log("hola mundo")
				var theArr = JSON.stringify(arr)
				this.saveItem(this.local_storage_keys.virtual_board, theArr);
			}
			this.clickWatcher();
		}.bind(application)
	},

	clickWatcher: function(){
		document.onclick = function(event){
			var theTarget = event.target;
			if (theTarget.className == "item"){
				this.setPieceInTurn();
				theTarget.innerText = this.getPieceInTurn();
				console.log(this.positions[0]);
				var localStorageArray = JSON.parse(this.readItem(this.local_storage_keys.virtual_board))
				console.log(localStorageArray[0])
			}
		}.bind(application)
	},

	getPieceInTurn:function(){
		return this.readItem(this.local_storage_keys.current_piece)
	},

	setPieceInTurn: function (){
		var piece_in_turn = this.readItem(this.local_storage_keys.current_piece)
		
		if (piece_in_turn === null){
			this.saveItem(this.local_storage_keys.current_piece, this.pieces.first_piece)
		}else if (piece_in_turn === this.pieces.first_piece){
			this.saveItem(this.local_storage_keys.current_piece, this.pieces.second_piece)
		}else if (piece_in_turn === this.pieces.second_piece){
			this.saveItem(this.local_storage_keys.current_piece, this.pieces.first_piece)
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

// document.getElementById("myBtn").addEventListener("click", function(){
//     this.style.backgroundColor = "red";
// });