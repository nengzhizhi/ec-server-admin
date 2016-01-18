(function(){
	'use strict';
	angular
		.module('com.module.core')
		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('app', {
					abstract: true,
					url: '/app',
					templateUrl: 'modules/core/views/app.html',
					controller: 'MainCtrl'
				})
				.state('app.home', {
					url: '',
					templateUrl: 'modules/core/views/home.html',
					controller: 'HomeCtrl'
				})
			$urlRouterProvider.otherwise('/app');
		});
})();