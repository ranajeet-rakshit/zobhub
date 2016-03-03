var jq = $.noConflict();
angular.module('zobApp')
	.controller('MainController', ['$state','$scope','$location','$rootScope','DataService', 'Upload','LoginService', function($state, $scope, $location, $rootScope, DataService, ngFileUpload, LoginService){

		if($rootScope.currentUser){
			$scope.loggedIn=true;
		}else{
			$scope.loggedIn=false;
		}

		/*$scope.selectedIndex = 0;

        $scope.$watch('selectedIndex', function(current, old) {
            switch (current) {
                case 0:
                    $location.url("/home");
                    break;
                case 1:
                    $location.url("/about");
                    break;
                case 2:
                	$location.url("/services");
                	break;
                case 3:
                	$location.url("/team");
                	break;
                case 4:
                	$location.url("/contact");
                	break;
            }
        });*/
		
		$scope.$on('user.logged.in', function(event, value){
			$scope.loggedIn = true;
			$scope.currentUser = $rootScope.currentUser;
		});

		

		$scope.logout = function(){
			delete $rootScope.currentUser;
			$scope.loggedIn = false;
			$rootScope.$broadcast('user.logged.out','User has Logged out');
			$state.go('home');
		}

		var tables='about||services||logo||users';

		DataService.getMainData(tables).
			then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
		}
		function getDataError(err){
			console.log('Some thing went wrong while fetching mainData: '+err);
		}

		//CONTROL THE LOGIN MODAL//

		var user={};

		$scope.cancel = function(){
			$scope.userEmail = '';
			$scope.userPwd = '';
			jq("#loginModal").modal("hide");
			$state.go('home');
		}

		$scope.login = function(){
			user.userEmail = $scope.userEmail;
			user.userPwd = $scope.userPwd;
			LoginService.checkUser(user.userEmail, user.userPwd)
				.then(loginSuccess, loginError);
		}


		function loginSuccess(credential){
			
			if(credential){
				$rootScope.currentUser = credential;
				$scope.userEmail = '';
				$scope.userPwd = '';
				$rootScope.$broadcast('user.logged.in','User has Logged in');
				jq("#loginModal").modal("hide");
				$state.go('account');
			}else{
				$scope.LoginSuccess = 'Incorrect Email/Password.';
			}
		}

		function loginError(err){
			console.log(err);
		}

		//LOGIN MODAL CONTROL END//
	}])
	.controller('HomeController', ['$scope', '$rootScope','DataService', function($scope, $rootScope, DataService){
		
		var tables = 'slides||about||services';
		$scope.myInterval = 3000;

		DataService.getMainData(tables).
			then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.slides = data.slides;
			$scope.about = data.about[0];
			$scope.services = data.services;
		}
		function getDataError(err){
			console.log('Some thing went wrong while fetching mainData: '+err);
		}

	}])
	.controller('JobsController', ['$state','$scope', '$rootScope', 'JobService','ProfileService', function($state, $scope, $rootScope, JobService, ProfileService){
		console.log(!$rootScope.currentUser);
		tables = 'jobs';
		JobService.getPostedJobs(tables).
			then(responseSuccess, responseError);

			function responseSuccess(response){
				$scope.jobs = response.jobs;

				for (var i = 0; i<$scope.jobs.length; i++) {
					$scope.jobs[i].currentUserApplied = false;
				};
			}

			function responseError(err){
				console.log('Some thing went wrong while fetching Jobs: '+err);
			}
		$scope.notLoggedIn = !$rootScope.currentUser;

		if ($rootScope.currentUser) {
			console.log('calling updateJobListing');
			updateJobListing();
		};
		
		$scope.applyJob = function(jobID){
			JobService.applyJob($rootScope.currentUser.id, jobID)
				.then(applySuccess, applyError);
		}

		function applySuccess(response){
			updateJobListing();
		}

		function applyError(error){
			console.log('apply error: '+error);
		}

		function updateJobListing(){
			ProfileService.getAppliedJobs($rootScope.currentUser.id)
				.then(getJobSuccess, getJobError);
		}

		function getJobSuccess(data){
			if (data!='false') {
				for (var i = 0; i<data.length; i++) {
					for (var j = 0; j<$scope.jobs.length; j++) {
						if ($scope.jobs[j].jobID==data[i].jobID) {
							$scope.jobs[j].currentUserApplied=true;
							console.log('applied job');
						};
					};

				};
			};
		}

		function getJobError(err){

		}

	}])
	.controller('ProfileController', ['$state','$scope', '$rootScope','Upload','LoginService','$timeout','DataService','JobService', function($state, $scope, $rootScope, Upload, LoginService, $timeout, DataService, JobService){

		var appliedJobIDs=[];

		if(!$rootScope.currentUser){
			$scope.showProfile=false;
		}else{
			$scope.showProfile=true;
			$scope.currentUser=$rootScope.currentUser;
		}

		$rootScope.$on('user.logged.out', function(event, value){
			$scope.showProfile = false;
			$state.go('home');
		});

		var tables='jobapplications';
		

		DataService.getMainData(tables).
			then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.jobapplications = data.jobapplications;
			
			
			for (var i = 0;i<$scope.jobapplications.length; i++) {
				
				if ($scope.jobapplications[i].applicantUserID==$scope.currentUser.id) {
					//console.log('match job id:'+$scope.jobapplications[i].jobID);
					//$scope.currentUser.id==
					//console.log($scope.jobapplications[i].applicantUserID);
					appliedJobIDs.push($scope.jobapplications[i].jobID);
				};
			};
		}

		function getDataError(err){
			console.log('Some thing went wrong while fetching mainData: '+err);
		}

		tables = 'jobs';
		JobService.getPostedJobs(tables).
			then(responseSuccess, responseError);

			function responseSuccess(response){
				var appliedJobs=[];

				for(var i=0; i<response.jobs.length; i++){
					for(var j=0; j<appliedJobIDs.length;j++){
						if(appliedJobIDs[j]==response.jobs[i].jobID){
							appliedJobs.push(response.jobs[i]);
						}
					}
				}
				$scope.appliedJobs = appliedJobs;
			}

			function responseError(err){
				console.log('Some thing went wrong while fetching Jobs: '+err);
			}

		function getProfile(){
				LoginService.checkUser($rootScope.currentUser.email, $rootScope.currentUser.password)
					.then(loginSuccess, loginError);
			}


			function loginSuccess(credential){
				$rootScope.currentUser = credential;
				$scope.currentUser = $rootScope.currentUser;
				jq("#profileModal").modal("hide");
			}

			function loginError(err){
				console.log(err);
			}

		$scope.update = function() {
			userData = {
				phone: $scope.user.phone,
				desc: $scope.user.description,
				skills: $scope.user.skills,
				experience: $scope.user.experience,
				availability: $scope.user.availability,
				id: $scope.currentUser.id
			}

			Upload.upload({
				url: 'scripts/updateProfile.php',
				method: 'POST',
				sendFieldsAs: 'form',
				fields: userData
	        }).then(function (resp) {
	        	userData = {};
	        	getProfile();
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

    	$scope.updateResume = function(){
    		var file = $scope.file;
    		userData = {
				id: $scope.currentUser.passport_number
			}
    		Upload.upload({
			url: 'scripts/resume_upload.php',
			method: 'POST',
			file: file,
			sendFieldsAs: 'form',
			fields: userData
	        }).then(function (resp) {
	        	$scope.loginSuccess = "Resume uploaded successfuly";
	        	$timeout(function(){
	        		$scope.loginSuccess='';
	        		jq("#resumeModal").modal("hide");
	        	}, 1000);
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

		
	}])
	.controller('RegisterController', ['$state','$scope', '$rootScope','RegistrationService', 'Upload', function($state, $scope, $rootScope, RegistrationService, Upload){
		$scope.register = function(){
			RegistrationService.register($scope.user)
			.then(registrationSuccess, registrationErro);
		}

		function registrationSuccess(response){
			console.log(response);
		}

		function registrationError(err){
			console.log(err);
		}


		$scope.upload = function() {
		var file=$scope.file;
		userData = {
			/*user:$scope.user*/
			email: $scope.user.email,
			password: $scope.user.pwd,
			firstName: $scope.user.fName,
			lastName: $scope.user.lName,
			phone: $scope.user.phone,
			passport: $scope.user.passport,
			description: $scope.user.desc,
			skills: $scope.user.skills,
			experience: $scope.user.experience,
			availability: $scope.user.availability
		}

		console.log(userData);

		Upload.upload({
			url: 'scripts/file_upload.php',
			method: 'POST',
			file: file,
			sendFieldsAs: 'form',
			fields: userData
        }).then(function (resp) {
        	if (resp.data == 'DUPLICATE') {
        		$scope.regResponse = 'Email is already registered.';
        	}else{
        		$scope.regResponse = 'Registration successful';
        	}
        	console.log('Success '+ 'uploaded. Response: ' + resp.data);
        	$rootScope.currentUser = $scope.user;
        	$rootScope.$broadcast('user.logged.in','User has Logged in');
        	$state.go('account');
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
	}])
	.controller('LoginController', ['$scope', '$rootScope','LoginService','$timeout','$state', function($scope, $rootScope, LoginService, $timeout, $state){
		var user={};

		$scope.cancel = function(){
			$scope.userEmail = '';
			$scope.userPwd = '';
			$state.go('home');
		}

		$scope.login = function(){
			user.userEmail = $scope.userEmail;
			user.userPwd = $scope.userPwd;
			LoginService.checkUser(user.userEmail, user.userPwd)
				.then(loginSuccess, loginError);
		}


		function loginSuccess(credential){
			
			if(credential){
				$rootScope.currentUser = credential;
				$scope.userEmail = '';
				$scope.userPwd = '';
				$rootScope.$broadcast('user.logged.in','User has Logged in');
				$state.go('account');
			}else{
				$scope.LoginSuccess = 'Incorrect Email/Password.';
			}
		}

		function loginError(err){
			console.log(err);
		}
	}])
	.controller('adminController', ['$scope','Upload','DataService', function($scope, Upload, DataService){
		var tables='about||services||logo||users';

		DataService.getMainData(tables).
			then(getDataSuccess, getDataError);

		function getDataSuccess(data){
			$scope.appData = data;
		}
		function getDataError(err){
			console.log('Some thing went wrong while fetching mainData: '+err);
		}
	}]);