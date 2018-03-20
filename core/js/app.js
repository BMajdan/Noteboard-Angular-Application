var app = angular.module('NoteBoard', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		controller: 'MainController',
		templateUrl: 'views/setNameScreen.html'
	})
	.when('/:boardName', {
		controller: 'BoardController',
		templateUrl: 'views/boardTemplate.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})