app.directive('createBoard', ['boardService', function(boardService){
	return{
		restrict: 'E',
		controller: 'MainController',
		templateUrl: 'js/directives/views/createBoard.html',
		link: function(scope, element, attrs){
			scope.createBoard = function(boardProperties){
				
				if(!boardProperties.boardName || boardProperties.boardName === ''){
					scope.alert = {
						text: 'Podaj poprawna nazwę tablicy!'
					}
					element[0].children[2].style.display = "block"
					return;
				}

				boardService.createBoard(boardProperties).then(function(data){
					scope.boardProperties.boardName = data.boardName
					scope.openBoard(data.boardName)
				});
				
			}

			scope.closeAlert = function(){
				element[0].children[2].style.display = "none"
			}
		}
	}
}])