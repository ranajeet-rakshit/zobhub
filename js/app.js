//angular.module('Authentication',[]);
//angular.module('ShinobiModule',[]);;
//,'Authentication'
angular.module('zobApp', ['ui.router','ngCookies','ngFileUpload','ui.bootstrap'])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'partials/home.html',
			controller:'HomeController'
		})
		.state('jobs',{
			url:'/jobs',
			templateUrl:'partials/jobs.html',
			controller: 'JobsController'
		})
		.state('account',{
			url:'/account',
			templateUrl: 'partials/account.html',
			controller: 'ProfileController',
			data:{
				requireLogin:true
			}
		})
		.state('login',{
			url:'/login',
			templateUrl:'partials/login.html',
			controller:'LoginController'
		})
		.state('register',{
			url:'/register',
			templateUrl: 'partials/register.html',
			controller: 'RegisterController'
		})
		.state('about',{
			url:'/about',
			templateUrl:'partials/about.html',
			controller:'HomeController'
		})
		.state('services',{
			url:'/services',
			templateUrl:'partials/services.html',
			controller:'HomeController'
		})
		.state('team',{
			url:'/team',
			templateUrl:'partials/team.html',
			controller:'HomeController'
		})
		.state('contact',{
			url:'/contact',
			templateUrl:'partials/contact.html',
			controller:'HomeController'
		});
}])
.run(function($rootScope){
	$rootScope.div = false;
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams){
		
	});
})
/*.run(['$rootScope','$state','$cookieStore','$http', 
	function($rootScope, $location, $cookieStore, $http){
		$rootScope.globals = $cookieStore.get('globals')||{};
		if($rootScope.globals.currentUser){
			$http.defaults.headers.common['Authorization'] = 'Basic '+$rootScope.globals.currentUser.authdata;
		}

		$rootScope.$on('$locationChangeStart',function(event, next, start){
			console.log(next);
			console.log(start);
			console.log(event);
			console.log($rootScope.globals.currentUser);
			if($location.path()!=='/login' && !$rootScope.globals.currentUser){
				$location.path('/login');
			}
		});
}]);*/

/*zobApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'partials/home.html'
		})
		.state('about',{
			url:'/about',
			templateUrl:'partials/about.html'
		})
		.state('account'{
			url:'/account',
			templateUrl: 'partials/account.html',
			abstract: true,
			data:{
				requireLogin:true
			}
		});
});
*/

/*
zobApp.service('loginModal',function($uibModal, $rootScope){
	
});*/