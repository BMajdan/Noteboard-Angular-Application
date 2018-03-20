app.directive('boardHeader', [ function(){
	return{
		restrict: 'E',
		controller: 'BoardController',
		templateUrl: 'js/directives/views/boardHeader.html',
	}
}])