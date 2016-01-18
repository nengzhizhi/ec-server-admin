(function(){
	'use strict';
	angular
		.module('com.module.users')
		.config(function ($stateProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'modules/users/views/login.html',
					controller: 'LoginCtrl',
					controllerAs: 'ctrl'
				})
		})
})();