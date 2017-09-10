angular.module('App')
.controller('MusicsController', function ($scope, $http, $ionicModal, Conditions) {
  
  $scope.musics;
  $scope.composers = Conditions.Composers;
  $scope.genres = Conditions.Genres;
  $scope.instruments = Conditions.Instruments;
  
  $scope.$on('$destroy', function() {
	  $scope.searchModal.remove();
  });

  $scope.load = function () {
    $http.get('https://kongnamul.pythonanywhere.com/musics').success(function (musics) {
    	$scope.musics = musics;
    }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
    });
  };
  
  $scope.showSearchModal = function (condition) {
	  $scope.conditions = condition;
	  switch(condition.englishName) {
	  	case 'composers' : $scope.conditions = $scope.composers; break;
	  	case 'genres' : $scope.conditions = $scope.genres; break;
	  	case 'instruments' : $scope.conditions = $scope.instruments; break;
	  	default : break;
	  }
      console.log($scope.conditions[0].koreanName);
      if ($scope.searchModal) {
  		  $scope.searchModal.show();
  	  } else {
  		  $ionicModal.fromTemplateUrl('views/musics/modal/search-modal.html', {
  			  scope: $scope
  		  }).then(function (modal) {
  			  $scope.searchModal = modal;
  			  $scope.searchModal.show();
  		  });
  	  }
  };
    
  $scope.hideSearchModal = function () {
      $scope.searchModal.hide();
  };

  $scope.load();
})