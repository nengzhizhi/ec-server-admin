(function(){
	'use strict';

	angular
		.module('com.module.users')
		.controller('LoginCtrl', function ($scope, $location) {
			$scope.login = function () {
				$location.path('/');
			}

			var vm = this;
			vm.user = {};
			vm.userFields = [
				{
					key: 'account',
					type: 'text',
					templateOptions: {
						placeholder: '账号',
						require: true
					}
				},
				{
					key: 'password',
					type: 'password',
					templateOptions: {
						placeholder: '密码',
						require: true
					}
				}				
			]

			vm.onSubmit = onSubmit;

			function onSubmit(){
				console.log(vm.user);
			}

		})
})();