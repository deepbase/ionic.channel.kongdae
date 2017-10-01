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
	  $scope.beforeConditions = condition;
	  $scope.conditionKey = condition.englishName;
	  switch(condition.englishName) {
	  	case 'composers' : $scope.conditions = $scope.composers;
	  	                   $scope.beforeConditions = angular.copy($scope.composers);
	  	                   $scope.conditionName = '작곡가';
	  	                   break;
	  	case 'genres' : $scope.conditions = $scope.genres;
	                    $scope.beforeConditions = angular.copy($scope.genres);
	  	                $scope.conditionName = '장르';
	  	                break;
	  	case 'instruments' : $scope.conditions = $scope.instruments;
	                         $scope.beforeConditions = angular.copy($scope.instruments);
	  	                     $scope.conditionName = '악기';
	  	                     break;
	  	default : break;
	  }
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
    
  $scope.hideSearchModal = function (canceled) {
	  if (canceled) {
		  switch($scope.conditionKey) {
		    case 'composers' : $scope.composers = angular.copy($scope.beforeConditions); break;
		    case 'genres' : $scope.genres = angular.copy($scope.beforeConditions); break;
		    case 'instruments' : $scope.instruments = angular.copy($scope.beforeConditions); break;
		    default : break;
		  }
	  }
      $scope.searchModal.hide();
  };
  
  $scope.checkAllSelected = function(condition) {
	  var conditions = $scope.conditions;
	  var selectedCount = 0;

	  if ('All' == condition.englishName) {
		  if (conditions[0].selected) {
			  for (var i = 1; i < conditions.length; i++) {
				  conditions[i].selected = true;
			  }
		  } else {
			  for (var i = 1; i < conditions.length; i++) {
				  if (conditions[i].selected) {
					  selectedCount++
				  }
			  }
			  if (selectedCount == conditions.length - 1) {
				  for (var i = 1; i < conditions.length; i++) {
					  conditions[i].selected = false;
				  } 
			  }
		  }
	  } else {
		  if (conditions[0].selected) {
			  conditions[0].selected = false;
		  } else {
			  for (var i = 1; i < conditions.length; i++) {
				  if (conditions[i].selected) {
					  selectedCount++
				  }
			  }
			  if (selectedCount == conditions.length - 1) {
				  conditions[0].selected = true;
			  }
		  }
	  }
  };

  $scope.load();
})