angular.module('App')
.controller('MusicsController', function ($scope, $http, $ionicPopover) {
  
  $scope.musics;

  $ionicPopover.fromTemplateUrl('views/musics/help-popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
  $scope.openHelp = function($event) {
    $scope.popover.show($event);
  };
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

  $scope.load = function () {
    $http.get('https://kongnamul.pythonanywhere.com/musics').success(function (musics) {
    	$scope.musics = musics;
        console.log(musics)
    }).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.load();
})

.controller('DetailController', function($scope, $http, $stateParams) {
    let musicId = $stateParams.id;
    $http.get('https://kongnamul.pythonanywhere.com/musics/'+musicId).then(function(data, status, headers, config){
        $scope.music = data.data;
    });
});
