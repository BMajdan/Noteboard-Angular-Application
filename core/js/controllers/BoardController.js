app.controller('BoardController', ['$scope', '$location', 'boardService', function($scope, $location, boardService){


	$scope.boardProperties = {
		boardName: ($location.path()).split("/")[1]
	}

	boardService.checkCreated($scope.boardProperties).then(function(data){
		if(data.checkStatus == true){
			$scope.boardProperties = {
				boardName: data.boardName
			}
		}else{
			$scope.$emit('undefinedBoard', true);
			$location.path( '/' )
		}
	});
	
}])