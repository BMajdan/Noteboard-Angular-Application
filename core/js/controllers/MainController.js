app.controller('MainController', ['$scope', '$document', '$location', function($scope, $document, $location){

	$scope.author = {
		name: "Bartosz",
		surname: "Majdan",
		class: "4ia1",
		version: " v0.9"
	}

	$scope.noteArray = new Array();

	$scope.countAllNotes = 0;
	$scope.notesOnBoard = 0;

	$scope.boardProperties = {
		boardName: undefined
	}

	$scope.openBoard = function(board){
		$location.path( '/' + board );
	}

	$scope.$on('undefinedBoard', function(mass) {
		alert("Podana tablica nie istnieje!")
	});

}])