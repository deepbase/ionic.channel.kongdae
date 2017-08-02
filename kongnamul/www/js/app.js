angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'views/tabs/tabs.html'
    })
    
    // musics
    .state('tabs.musics', {
      url: '/musics',
      views: {
        'musics-tab': {
          templateUrl: 'views/musics/musics.html',
          controller: 'MusicsController'
        }
      }
    })
    .state('tabs.musicDetail', {
      url: '/detail/:id',
      views: {
        'musics-tab': {
          templateUrl: 'views/musics/detail/music-detail.html',
          controller: 'MusicDetailController',
        }
      }
    })
    .state('tabs.searchKeytabs', {
      url: '/searchKeyTabs',
      abstract: true,
      templateUrl: 'views/musics/modal/search-modal.html'
    })
    .state('tabs.searchKeytabs.searchKeyView', {
      url: '/musics/modal/:key',
      views: {
        'musics-search-key': {
          templateUrl: 'views/musics/modal/searchkey/search-key.html',
//          controller: 'SearchModalController'
        }
      }
    })
    
    // musicians
    .state('tabs.musicians', {
      url: '/musicians',
      views: {
        'musicians-tab': {
          templateUrl: 'views/musicians/musicians.html'
        }
      }
    })
    
    // concerts
    .state('tabs.concerts', {
      url: '/concerts',
      views: {
        'concerts-tab': {
          templateUrl: 'views/concerts/concerts.html'
        }
      }
    })
    
    // mypage
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
