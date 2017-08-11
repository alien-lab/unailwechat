(function() {
    'use strict';
    angular
        .module('alienlab')
        .directive('alienImage', function(){
            return {
                restrict: 'A',
                scope: {
                    image:"@",
                    rate:"@"
                },
                link: function(scope, element, attrs){
                    console.log($(element));
                    var rate=scope.rate;
                    if(!rate){
                        rate=2;
                    }
                    console.log(element.width());
                    element.css("height",(element.width()/parseInt(rate)));
                    element.css("background-image","url('"+scope.image+"')");
                    element.css("background-size","cover");
                    element.css("background-position","center center");
                    element.css("overflow","hidden");
                }
            }
        });
})();
