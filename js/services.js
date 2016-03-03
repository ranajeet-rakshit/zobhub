angular.module('zobApp')
    .factory('DataService', ['$http','$q', function($http, $q){
        var Service = {};

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
    .factory('JobService', ['$http', '$q', function($http, $q){
        var Service={};

        Service.getPostedJobs = function(tables){
            return $http({
                method:'GET',
                url:'scripts/getTables.php?tables='+tables
            })
            .then(responseSuccess)
            .catch(responseError);

        return Service;
        }

        function responseSuccess(response){
            return response.data;
        }

        function responseError(err){
            return $q.reject("Error retrieving Main contents. (HTTP Status: "+err.status+")");
        }
        
        Service.applyJob = function(applicantID, jobID){

            return $http({
                method:'GET',
                url:"scripts/applyJob.php?applicantID="+applicantID+"&jobID="+jobID
            })
            .then(responseJobSuccess)
            .catch(responseJobError);
        }

        function responseJobSuccess(response){
            console.log('Service success response: '+ response.data);
            return response.data;
        }

        function responseJobError(err){
            console.log(err);
            return $q.reject("Error applying for Job. (HTTP Status: "+err.status+")");
        }

        return Service;
    }])
    .factory('ProfileService', ['$http','$q', function($http, $q){
        var Service = {};

        Service.getAppliedJobs = function(applicantID){
            
            return $http({
                method:'GET',
                url:"scripts/getAppliedJobs.php?applicantID='"+applicantID+"'"
            })
            .then(responseJobSuccess)
            .catch(responseJobError);
        }
        function responseJobSuccess(response){
            console.log(response.data);
            return response.data;
        }

        function responseJobError(err){
            return $q.reject("Error getting applied jobs. (HTTP Status: "+err.status+")");
        }

        Service.getUserData = function(userID){
            return $http({
                method:'GET',
                url:"scripts/getUserData.php?userID='"+userID+"'"
            })
            .then(responseSuccess)
            .catch(responseError);
        }

        return Service;
        
    }])
    .factory('RegistrationService', ['$http','$q', function($http, $q){

        var Service = {};

        Service.register = function(regData){
            return $http({
                method:'POST',
                url:'scripts/userRegistration.php',
                data:{
                    user:$scope.user
                },
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(responseSuccess)
            .catch(responseError);
        }

        function responseSuccess(response){
            return response.data;
        }

        function responseError(err){
            return $q.reject("Error registering user. (HTTP Status: "+err.status+")");
        }

        return Service;
        
    }])
    .factory('LoginService', ['$http','$q', function($http, $q){
        var Service={};
        Service.checkUser = function(userEmail, userPwd){
            return $http({
                method:'GET',
                url:"scripts/checkUser.php?userEmail='"+userEmail+"'&userPwd='"+userPwd+"'"
            })
            .then(responseSuccess)
            .catch(responseError);
        }

        function responseSuccess(user){
            if(user.data){
                return user.data;
            }else{
                return false;
            }
        }

        function responseError(err){
            return $q.reject("Error checking login credentials. (HTTP Status: "+err.status+")");
        }

        return Service;
    }]);