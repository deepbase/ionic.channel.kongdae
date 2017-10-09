angular.module('App')
.controller('MusicDetailController', function($scope, $http, $stateParams) {
    let musicId = $stateParams.id;
    $http.get('https://kongnamul.pythonanywhere.com/musics/'+musicId).then(function(data, status, headers, config){
        $scope.music = data.data;
    });
    $http.get('https://kongnamul.pythonanywhere.com/musics/'+musicId+'/reviews').then(function(data, status, headers, config){
        $scope.reviews = data.data;
    });
});