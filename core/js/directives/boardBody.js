app.directive('boardBody', ['$compile', '$document', 'boardService', function($compile, $document, boardService){
	return{
		restrict: 'E',
		controller: 'BoardController',
		templateUrl: 'js/directives/views/boardBody.html',
		link: function(scope, element, attrs){

			function createNote(eIdent){
				scope.arrayElement = scope.noteArray[eIdent].note
				var el = angular.element("<note ng-click='changeIndex("+ scope.countAllNotes +")' noteIdent='note_" + scope.countAllNotes +"' id='note_" + scope.countAllNotes 
					+ "' style='left: " + scope.arrayElement.left + "; top: " 
					+ scope.arrayElement.top + "; z-index: " + scope.arrayElement.zIndex + "; width: " + scope.arrayElement.width 
					+ "; height: " + scope.arrayElement.height + "' class='note'>" 
					+ '<span class="buttonRemove"><i class="fa fa-times" aria-hidden="true" ng-click="noteRemove($event)"></i></span>'
					+ '	<div class="note_cnt">'
					+ '	<textarea class="title" placeholder="Enter note title" ng-model="noteArray['+ (scope.noteArray.length - 1) +'].note.title">'+ scope.arrayElement.id +'</textarea>'
					+ '	<textarea class="cnt" placeholder="Enter note description here" ng-model="noteArray['+ (scope.noteArray.length - 1) +'].note.text">'+ scope.arrayElement.text +'</textarea>'
					+ '</div>'
					+ "</note>");
        		element.append(el);
        		$compile(el)(scope);
        		moveResizeNote(scope.countAllNotes, scope, boardService)
			}

			scope.addNewNote = function(){

				scope.noteArray.push({
					note: {
						title: '',
						text: '',
						left: (100 + scope.notesOnBoard * 100) + "px",
						top: '100px',
						zIndex: 2 + scope.notesOnBoard,
						id: 'note_' + scope.countAllNotes,
						boardName: scope.boardProperties.boardName,
						width: "200px",
						height: "200px"
					}
				})

        		boardService.createNote(scope.noteArray[scope.noteArray.length - 1]).then(function(data){
        			createNote(scope.noteArray.length - 1);
					scope.countAllNotes++;
					scope.notesOnBoard++;
				});	
			}

			scope.loadAllNotes = function(){

				scope.bName = {
					boardName: scope.boardProperties.boardName
				}

				boardService.loadNotes(scope.bName).then(function(data){
					for(var i = 0; i < data.notes.length; i++){
						scope.noteArray.push({
							note: {
								title: data.notes[i].title,
								text: data.notes[i].text,
								left: data.notes[i].left,
								top: data.notes[i].top,
								zIndex: data.notes[i].zIndex,
								id: data.notes[i].id,
								boardName: data.notes[i].boardName,
								width: data.notes[i].width,
								height: data.notes[i].height
							}
						})

						console.log(data.notes[i].zIndex)

						createNote(scope.noteArray.length - 1);

						scope.countAllNotes++;
						scope.notesOnBoard++;
					}
				});
			}

			scope.loadAllNotes();
		}
	}
}])