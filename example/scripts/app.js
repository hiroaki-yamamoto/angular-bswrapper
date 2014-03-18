angular.module("exampleApp",["bswrapper"])
    .controller("exampleControl",["$scope",function($scope){
        $scope.$on("buttonClicked",function(event,id){console.log(id)})
        $scope.$on("closeClicked",function(){console.log("Closed")})
        $scope.$on("hidden.bs.modal",function(){console.log("hidden")})
    }])