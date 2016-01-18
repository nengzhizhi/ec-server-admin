(function(){
	'use strict';
	angular
		.module('com.module.core')
		.run(function ($rootScope) {
			//左侧导航菜单
			$rootScope.menu = [];

			$rootScope.addMenu = function (name, uisref, icon, subMenus) {
				$rootScope.menu.push({
					name: name,
					sref: uisref,
					icon: icon,
					subMenus: subMenus
				})
			}

			$rootScope.addMenu('控制台', 'app.home', 'fa-dashboard');
			// $rootScope.addMenu('控制台2', 'app.home', 'fa-dashboard', [
			// 	{ name: '子菜单', sref: 'app.home.xxx' },
			// 	{ name: '子菜单', sref: 'app.home.xxx' }
			// ]);
		})
})();