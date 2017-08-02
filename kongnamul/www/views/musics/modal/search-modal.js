angular.module('App')
.controller('SearchModalController', function ($scope, $http, $ionicModal) {
	//
    $scope.showSearchModal = function () {
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
})
