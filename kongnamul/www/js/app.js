angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs/tabs.html'
    })
    .state('tabs.musics', {
      url: '/musics',
      views: {
        'musics-tab': {
          templateUrl: 'views/musics/musics.html',
          controller: 'MusicsController'
        }
      }
    })
    .state('tabs.detail', {
      url: '/detail/:id',
      views: {
        'musics-tab': {
          templateUrl: 'views/musics/music.html',
          controller: 'DetailController'
        }
      }
    })
    .state('tabs.musicians', {
      url: '/musicians',
      views: {
        'musicians-tab': {
          templateUrl: 'views/musicians/musicians.html'
        }
      }
    })
    .state('tabs.concerts', {
      url: '/concerts',
      views: {
        'concerts-tab': {
          templateUrl: 'views/concerts/concerts.html'
        }
      }
    })
    .state('tabs.mypage', {
      url: '/mypage',
      views: {
        'mypage-tab': {
          templateUrl: 'views/mypage/mypage.html'
        }
      }
    })

  $urlRouterProvider.otherwise('/tabs/musics');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
