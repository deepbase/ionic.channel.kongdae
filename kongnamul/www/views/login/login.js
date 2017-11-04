angular.module('App')
.controller('LoginController', function ($scope, $http, $ionicLoading, $ionicPopup, $state, $localstorage) {
	//
	$scope.data = {};
	
	$scope.load = function() {
		if ($localstorage.get("authToken")) {
			$state.go('tabs.musics');
		}
	}
	
    $scope.login = function() {
    	startLoading();
    	$http.post("https://kongnamul.pythonanywhere.com/api-token-auth/", {
    		'username': $scope.data.username,
    		'password': $scope.data.password
    	}).then(response => {
    		$localstorage.set("authToken", response.data.token);
    		$state.go('tabs.musics');
    	}).catch(error => {
    		$ionicPopup.alert({
                title: '로그인 실패',
                template: '아이디와 비밀번호를 확인해주세요'
            });
    	}).finally(function() {
    		finishLoading();
    	});
    }
    
    $scope.load();
    
    function startLoading() {
        $ionicLoading.show({
            template: '<p>사용자 정보 확인중</p><ion-spinner></ion-spinner>'
        });
    }
    
    function finishLoading() {
    	$ionicLoading.hide();
    }
})