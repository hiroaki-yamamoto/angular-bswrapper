angular.module("bswrapper",[])
/*
bs-button:
    The Attributes:
        id: ID of the button. this field is passed when the scope is emmit.
        toggle: toggle type. the same as "data-toggle" on bootstrap.
        target: the target.
        dismiss: dissmiss something. the same as "data-dismiss"
        placement: the same as data-placement
        content: the same as data-content
        type: button type. i.e. One of "default", primary, success , warning, danger, info, and link.
        size: the size of buton. i.e. One of ex-small, small, and large
        block: non-false state value if the button is block-level.
        title: the title.
    Events:
        buttonClicked(event,id): this event is emmited when the button is clicked. id is id attribtue.
    Example:
        <bs-button size="large">Hello World!!</bs-button>
*/
.directive("bsButton",function(){
    return {
        "restrict":"E",
        "scope":{
            "id":"@",
            "type":"@",
            "size":"@",
            "block":"=",
            "title":"@"
        },
        "link":function(scope,element,attrs){
            var attr_replacement={}
            var acc_attr=["toggle","target","dismiss","placement","content"]
            for(var key in attrs){
                var el=attrs[key]
                if(acc_attr.indexOf(key)>=0) attr_replacement["data-"+key]=el
            }
            element.attr(attr_replacement)
        },
        "template":"<button class=\"btn\" ng-class=\"{'btn-primary':type==='primary','btn-default':type==='default','btn-warning':type==='warning','btn-success':type==='success','btn-info':type==='info','btn-danger':type==='danger','btn-link':type==='link','btn-lg':size==='large','btn-sm':size==='small','btn-xs':size==='ex-small','btn-block':block}\" ng-click=\"clicked()\" ng-transclude></button>",
        "replace":true,
        "transclude":true,
        "controller":function($scope){
            $scope.clicked=function(){$scope.$emit("buttonClicked",$scope.id)}
        }
    }
})
    /*
    bs-modal:
        The Attributes:
            id:identifier of the dialog. used by target attribute on bs-button.
            backdrop:alias of data-backrtop
            keyboard:alias of data-keyboard
            show:alias of data-show
            remote:alias of data-remote
            yes: the text body of "yes" button
            no: the text body of "no" button
            cancel: the text body of "cancel" button
            ok: the text body of "ok" button
            size: size of the dialog i.e. large, or small
            title: title of the dialog
        Events:
            *.bs.modal(event,id,e): alias of *.bs.modal on bootstrap. But note that event is angular's event object, id is id attirbute, and e is bootstrap's event object.
            (yes|no|ok|cancel|close)Clicked(event,id): thie event is emmited when the corresponding button is clicked.
        Note:
            *) OK attribute is exclusively generated. i.e. Neither yes and nor buttons are generated if ok attribtue is set.
            *) button-clicked event and modal event is asynchronous. this mean, if you want to do something with this dialog corresponding with the result of button, you need to do like this:
                function testControl($scope){
                    var buttonResult={}
                    // store button result type
                    $scope.$on("yesClicked",function(event,id){buttonResult[id]="yes"})
                    $scope.$on("noClicked",function(event,id){buttonResult[id]="no"})
                    $scope.$on("cancelClicked",function(event,id){buttonResult[id]="cancel"})
                    $scope.$on("okClicked",function(event,id){buttonResult[id]="ok"})
                    //When the dialog is hidden...
                    $scope.$on("hidden.bs.modal",function(event,id,e){
                        if(id==="THEID"){
                            switch(buttonResult[id]){
                                case "yes": blablabla; break;
                                case "no": blablabla; break;
                                case "cancel": blablabla; break;
                                case "ok": blablabla; break;
                                case "close": blablabla; break;
                                default: blablabla; break;
                            }
                        }
                }
        Example:
            <bs-modal title="HelloWorld" id="exampleModal" ok="Close" backdrop="static">Hello World!!</bs-modal>
    */
.directive("bsModal",["$rootScope",function($rootScope){
    return {
        "restrict":"E",
        "scope":{
            "id":"@",
            "yesBody":"@yes",
            "noBody":"@no",
            "okBody":"@ok",
            "cancelBody":"@cancel",
            "size":"@",
            "title":"@"
        },
        "replace":true,
        "transclude":true,
        "link":function(scope,element,attrs){
            var acc_attr=["backdrop","keyboard","show","remote"]
            for(var key in attrs){
                var el=attrs[key]
                if(acc_attr.indexOf(key)>=0){element.attr("data-"+key,el)}
            }

            element.bind("show.bs.modal",function(e){
                $rootScope.$apply(function(){$rootScope.$broadcast("show.bs.modal",scope.id,e)})
            })
            element.bind("shown.bs.modal",function(e){
                $rootScope.$apply(function(){$rootScope.$broadcast("shown.bs.modal",scope.id,e)})
            })
            element.bind("hide.bs.modal",function(e){
                $rootScope.$apply(function(){$rootScope.$broadcast("hide.bs.modal",scope.id,e)})
            })
            element.bind("hidden.bs.modal",function(e){
                $rootScope.$apply(function(){$rootScope.$broadcast("hidden.bs.modal",scope.id,e)})
            })
            element.bind("loaded.bs.modal",function(e){
                $rootScope.$apply(function(){$rootScope.$broadcast("loaded.bs.modal",scope.id,e)})
            })
        },
        "controller":function($scope){
            $scope.yes=function(){$scope.$emit("yesClicked",$scope.id)}
            $scope.no=function(){$scope.$emit("noClicked",$scope.id)}
            $scope.ok=function(){$scope.$emit("okClicked",$scope.id)}
            $scope.cancel=function(){$scope.$emit("cancelClicked",$scope.id)}
            $scope.close=function(){$scope.$emit("closeClicked",$scope.id)}
        },
        "template":"<div class=\"modal fade\" role=\"dialog\"><div class=\"modal-dialog\" ng-class=\"{'modal-lg':size==='large','modal-sm':size==='small'}\"><div class=\"modal-content\"><div class=\"modal-header\"><h4>{{title}}</h4></div><div class=\"modal-body\" ng-transclude></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"yes()\" data-dismiss=\"modal\" ng-if=\"yesBody&&!okBody\">{{yesBody}}</button><button class=\"btn\" ng-click=\"no()\" ng-class=\"{'btn-warning':cancelBody}\" data-dismiss=\"modal\" ng-if=\"noBody&&!okBody\">{{noBody}}</button><button class=\"btn\" ng-click=\"cancel()\" data-dismiss=\"modal\" ng-if=\"cancelBody&&!okBody\">{{cancelBody}}</button><button class=\"btn\" ng-click=\"ok()\" data-dismiss=\"modal\" ng-if=\"okBody\">{{okBody}}</button><button class=\"btn\" ng-click=\"close()\" data-dismiss=\"modal\" ng-if=\"!okBody&&!yesBody&&!noBody&&!cancelBody\">Close</button></div></div></div></div>"
        }
}])
/*
Tab:
    Example: 
    <bs-tab>
        <bs-tab-pane id="tab1" title="Tab 1" active="true">
            <h4>Hello 1</h4>
            <p>1 World</p>
        </bs-tab-pane>
        <bs-tab-pane id="tab2" title="Tab 2">
            <h4>Hello 2</h4>
            <p>2 Worlds</p>
        </bs-tab-pane>
        <bs-tab-pane id="tab3" title="Tab 3">
            <h4>Hello 3</h4>
            <p>3 Worlds</p>
        </bs-tab-pane>
    </bs-tab>
*/
.directive("bsTab",function(){
    return {
        "restrict":"E",
        "replace":true,
        "transclude":true,
        "controller":function($scope){
            this.panelInfoList=[]
            $scope.panelInfoList=this.panelInfoList
        },
        "template":"<div class=\"bsWrap-tab\"><ul class=\"nav nav-tabs\"><li ng-repeat=\"panelInfo in panelInfoList\" ng-class=\"{active: panelInfo.active}\"><a href=\"#{{panelInfo.id}}\" data-toggle=\"tab\">{{panelInfo.title}}</a></li></ul><div class=\"tab-content\" ng-transclude></div></div>"
    }
})
.directive("bsTabPane",function(){
    return {
        "require":"^bsTab",
        "restrict":"E",
        "replace":true,
        "transclude":true,
        "controller":function($scope,$element){console.log($element.attr("id"))},
        "scope":{"active":"="},
        "link":function(scope,element,attrs,parentCtrl){
            scope.panelInfo={"id":attrs.id,"title":attrs.title,"active":scope.active}
            parentCtrl.panelInfoList.push(scope.panelInfo)
        },
        "template":"<div class=\"tab-pane\" ng-class=\"{active:panelInfo.active}\" ng-transclude></div>"
    }
})