angular.module('App')
.controller('MypageController', function ($scope, $state, $localstorage) {
	//
	$scope.logout = function() {
		$localstorage.remove("authToken");
		$state.go('login');
	}
})