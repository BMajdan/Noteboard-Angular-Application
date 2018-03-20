app.controller('NoteController', ['$scope', 'boardService', function($scope, boardService){

	for(var i = 0; i < $scope.noteArray.length; i++){
		$scope.$watchCollection('noteArray[' + i + '].note.title', function() {
			if($scope.noteArray[i] != undefined){
				boardService.updateNote($scope.noteArray[i].note).then(function(data){});
			}
    	});
	}
}])