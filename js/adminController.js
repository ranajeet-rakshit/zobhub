jq = $.noConflict();

/**
* adminController Module
*
* Description
*/
angular.module('adminApp', ['ui.router','ngCookies','ngFileUpload','ui.bootstrap'])
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/login');
		$stateProvider
			.state('login',{
				url:'/login',
				templateUrl:'partials/adminLogin.html',
				controller:'LoginController'
			})
			.state('dashboard',{
				url:'/dashboard',
				templateUrl:'partials/adminDashboard.html',
				controller:'JobsController'
			});
	}]).
	controller('mainController', ['$scope','$state', function($scope, $state){
		
	}]).
	controller('JobsController', ['$scope','AdminJobService','Upload', function($scope, AdminJobService, Upload){
		updateJobListings();

		function updateJobListings(){
			var tables='jobs';

			AdminJobService.getMainData(tables).
				then(getDataSuccess, getDataError);

			function getDataSuccess(data){
				$scope.postedJobs = data.jobs;
			}
			function getDataError(err){
				console.log('Some thing went wrong while fetching mainData: '+err);
			}			
		}

		$scope.jobSubmit = function(){
			var jobData = {
				title: $scope.newJob.title,
				description: $scope.newJob.description,
				company: $scope.newJob.company,
				location: $scope.newJob.location,
				experience: $scope.newJob.experience,
				basic: $scope.newJob.basic_salary,
				position: $scope.newJob.open_position,
				jobCode: $scope.newJob.job_code,
				interviewDate: $scope.newJob.interview_date,
				qualification: $scope.newJob.qualification
			}

			Upload.upload({
				url: 'scripts/uploadJob.php',
				method: 'POST',
				sendFieldsAs: 'form',
				fields: jobData
	        }).then(function (resp) {
	        	console.log(resp);
	        	jobData = {};
	        	$scope.newJob = {};
	        	updateJobListings();
	        	jq("#jobPostModal").modal("hide");
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            /*$scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            if ($scope.progressPercentage==100) {
					$interval(function(){
						$scope.progressPercentage = undefined;
					},3000);
	            };*/
	        });
		}

		$scope.deleteJob = function(jobID){
			AdminJobService.deleteJob(jobID)
				.then(deleteSuccess, deleteError);
		}

		function deleteSuccess(resp){
			updateJobListings();
		}

		function deleteError(err){
			console.log('Some thing went wrong while deleting job: '+err);
		}
	}]).
	controller('LoginController', ['$scope','$state','$rootScope','AdminJobService', function($scope, $state, $rootScope, AdminJobService){
		
		$scope.login = function(){
			AdminJobService.checkUser($scope.userEmail, $scope.userPwd)
				.then(loginSuccess, loginError);
		}


		function loginSuccess(credential){
			
			if(credential){
				$rootScope.admin = credential;
				$scope.userEmail = '';
				$scope.userPwd = '';
				$scope.LoginSuccess=false;
				$rootScope.$broadcast('user.logged.in','User has Logged in');
				$state.go('dashboard');
			}else{
				$scope.LoginSuccess = 'Incorrect Email/Password.';
			}
		}

		function loginError(err){
			console.log(err);
		}
	}]).
	factory('AdminJobService', ['$http','$q', function($http, $q){
        var Service = {};

        Service.deleteJob = function(jobID){
        	return $http({
                method:'GET',
                url:"scripts/deleteJob.php?jobID="+jobID
            })
            .then(deleteSuccess)
            .catch(deleteError);
        }

        function deleteSuccess(response){
        	return response.data;
        }

        function deleteError(err){
        	return $q.reject("Error deleting job. (HTTP Status: "+err.status+")");
        }

        Service.checkUser = function(email, pwd){
        	return $http({
                method:'GET',
                url:"scripts/checkAdmin.php?userEmail='"+email+"'&userPwd='"+pwd+"'"
            })
            .then(loginSuccess)
            .catch(loginError);
        }

        function loginSuccess(user){
            if(user.data){
                return user.data;
            }else{
                return false;
            }
        }

        function loginError(err){
            return $q.reject("Error checking login credentials. (HTTP Status: "+err.status+")");
        }

        Service.getMainData = function(tables){
            return $http({
                method:'GET',
                url:'scripts/getTables.php?tables='+tables
            })
            .then(responseSuccess)
            .catch(responseError);
        }

        function responseSuccess(response){
            return response.data;
        }
         
         function responseError(err){
            return $q.reject("Error retrieving Main contents. (HTTP Status: "+err.status+")");
         }
        return Service;
    }])
    .run(function($state, $rootScope, $location){
    $location.url('/login');
    /*	if(!$rootScope.admin){
    		$state.go('login');
    	}
    	console.log('running app.run');
	*/
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams){
		/*if($rootScope.admin==undefined){
    		$state.go('login');
    	}*/
    	// console.log($rootScope.admin);
	});
});
