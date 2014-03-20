angular.module("exampleApp",["bswrapper"])
    .controller("exampleControl",["$scope",function($scope){
        $scope.disabled={
            "yes":false,
            "no":false,
            "cancel":false
        }
        $scope.$on("buttonClicked",function(event,id){
            switch(id){
                case "attributeModal":
                    console.log("Open: exampleModal as attribute")
                break;
                case "controlModal":
                    console.log("Open: exampleModal as control")
                    $scope.$broadcast("openModal","exampleModal")
                break;
            }
        })
        $scope.$on("closeClicked",function(){console.log("Closed")})
        $scope.$on("hidden.bs.modal",function(){console.log("hidden")})
        
    }])