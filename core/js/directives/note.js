app.directive('note', ['boardService', function(boardService){
	return {
		restrict: 'E',
		controller: 'NoteController',
		link: function(scope, element, attrs) {

			scope.maxIndex = 1;

			scope.noteRemove = function(event){
				boardService.deleteNote(scope.noteArray[event.path[2].id.split("_")[1]].note).then(function(data){
					scope.noteArray[event.path[2].id.split("_")[1]] = {}
					event.path[2].remove();
					scope.notesOnBoard--;
				});
			}

			scope.changeIndex = function(index){

				var now = 1;

				for(var i = 0; i < scope.noteArray.length; i++){
					if(i != index && parseInt(scope.noteArray[i].note.zIndex) > now){
						now = parseInt(scope.noteArray[i].note.zIndex);
						
					}
				}

				if(now != 1){
					angular.element(document.getElementById('note_' + index))[0].style.zIndex = now + 1
					scope.noteArray[index].note.zIndex = now + 1
					boardService.updateNote(scope.noteArray[index].note).then(function(data){});
				}
			}
		} 
	};
}]);