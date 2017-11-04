angular.module('App')
.controller('MusicDetailController', function($scope, $http, $stateParams, $localstorage, root_url) {
	//
	let musicId = $stateParams.id;
    
	$http({
		method: 'GET',
		url: root_url + '/musics/' + musicId,
		headers: {
			'Authorization': "Token " + $localstorage.get("authToken")
		}
	}).then(response => {
		$scope.music = response.data;
	});
	
	$http({
		method: 'GET',
		url: root_url + '/musics/' + musicId + '/reviews',
		headers: {
			'Authorization': "Token " + $localstorage.get("authToken")
		}
	}).then(response => {
		$scope.reviews = response.data;
	})
	
//    $http.get('https://kongnamul.pythonanywhere.com/musics/'+musicId+'/reviews').then(function(data, status, headers, config){
//        $scope.reviews = data.data;
//    });
});