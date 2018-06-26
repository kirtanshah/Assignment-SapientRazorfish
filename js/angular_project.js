var path = window.location.origin;
//alert(path)
var jspath = path + "/assignment/js/";
var app = angular.module("twoBytesApp", ["ngRoute", "ngTagsInput", 'ngCookies']);
app.run(function($rootScope) {
    $rootScope.show_component = false;
})
app.config(function($routeProvider) {

    $routeProvider.when('/', {
            templateUrl: "header.html",
            controller: "headerCtrl"

        })
        .when('/profile', {
            templateUrl: "profile.html",
            controller: "profileCtrl"

        })
        .when('/jobs', {
            templateUrl: "jobs.html",
        })
        .when('/aboutus', {
            templateUrl: "aboutus.html",

        })
        .when('/clients', {
            templateUrl: "client.html",
            //controller: "loginCtrl"
            //template:"login"

        })

        .when('/employer', {
            templateUrl: "employer.html",
            //controller: "loginCtrl"
            //template:"login"

        })
        .when('/contact', {
            templateUrl: "contactus.html",
            //controller: "loginCtrl"
            //template:"login"

        })
        .otherwise({

            templateUrl: "404.html",
            //template: "404"

        })


})

app.controller("headerCtrl", function($scope, $http, $rootScope, $cookies) {
    $rootScope.show_component = false;
    $scope.user = {
        name: '',
        imageSrc: ''
    }
    $scope.flagforprofile = false;
    $scope.Submit1 = false;
    $scope.tasks = {}; //$scope.imageSrc = "";
    function setData(data) {
        localStorage.setItem('tasks', angular.toJson(data));
        $rootScope.show_component = true;
        window.location.assign(path + '/#!/profile')
    }
$scope.submitForm = function(data) {

    try {
        //check whether browser fully supports all File API
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //get the file size and file type from file input field
            var fsize = document.getElementById('myfile').files[0];
            if (fsize != undefined) {
                if (fsize.size > 403000) //310*325px image
                {
                    alert(fsize.size + " bites\nToo big! Please select image upto 310*325px");
                } else {
                    setData(data);
                }
            } else {
                setData(data);
            }
        } else {
            alert("Please upgrade your browser, because your current browser lacks some new features we need!");
        }
    } catch (e) {

    }
};

    $scope.onFileSelect = function(event) {
        console.log(event)
    }
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
        console.log($scope.progress);
    });

});
app.controller("profileCtrl", function($scope, $http, $rootScope, $cookies) {
    $scope.flagforprofile = true;
    $scope.user = {};
    $scope.leader = {};

    window.scroll({
        top: 0,
        behavior: "smooth"
    });

    $scope.user = angular.fromJson(localStorage.getItem('tasks'));
    console.log($scope.user);
    angular.copy($scope.user, $scope.leader);


    $scope.reset = function() {
        angular.element(document.querySelector('#myModal'))[0].style.display = "none"
        // Example with 1 argument
        $scope.user = angular.copy($scope.leader);
    };

    function setData(data) {
        localStorage.setItem('tasks', angular.toJson(data));
        $rootScope.show_component = true;
        angular.copy(data, $scope.leader);
        angular.element(document.querySelector('#myModal'))[0].style.display = "none"

    }

    $scope.submitForm = function(data) {
        try {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                //get the file size and file type from file input field
                var fsize = document.getElementById('myfile').files[0];

                if (fsize != undefined) {
                    if (fsize.size > 403000) //310*325px image
                    {
                        alert(fsize.size + " bites\nToo big! Please select image upto 310*325px");
                    } else {
                        setData(data);
                    }
                } else {
                    setData(data);
                }
            } else {
                alert("Please upgrade your browser, because your current browser lacks some new features we need!");

            }

        } catch (e) {

        }


    };
});
app.directive("ngFileSelect", function(fileReader, $timeout) {
    return {
        scope: {
            ngModel: '='
        },
        link: function($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                    .then(function(result) {
                        $timeout(function() {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function(e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});

app.factory("fileReader", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function(reader, scope) {
        return function(event) {
            scope.$broadcast("fileProgress", {
                total: event.total,
                loaded: event.loaded
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function(file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});