"use strict";

document.onclick = function(event){
	var theTarget = event.target;
	if (theTarget.className == "item"){
		setPieceInTurn();
		theTarget.innerText = getPieceInTurn();
	}
}

var pieces = {
	first_piece: "X",
	second_piece: "O",
};

function getPieceInTurn(){
	return localStorage.getItem("currentPiece");
}

function setPieceInTurn(){
	var piece_in_turn = localStorage.getItem("currentPiece");
	
	if (piece_in_turn === null){
		localStorage.setItem("currentPiece", pieces.first_piece);
	}else if (piece_in_turn === pieces.first_piece){
		localStorage.setItem("currentPiece", pieces.second_piece)
	}else if (piece_in_turn === pieces.second_piece){
		localStorage.setItem("currentPiece", pieces.first_piece)
	}
}
