angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
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
    .state('tabs.searchModal', {
    	url: '/musics/search-modal/',
    	views: {
    		'musics-search-tab': {
    			templateUrl: 'views/musics/modal/search-modal.html',
    			controller: 'SearchModalController',
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
//    .state('tabs.searchKeytabs.searchKeyView', {
//      url: '/musics/modal/:key',
//      views: {
//        'musics-search-key': {
//          templateUrl: 'views/musics/modal/searchkey/search-key.html',
//          controller: 'SearchModalController'
//        }
//      }
//    })
    
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

.factory('Conditions', function() {
	//
	function store() {
		localStorage.setItem('musicSearchConditions', angular.toJson(Conditions.data));
	}
	
	var defaultData = {
	     Composers:
	     	 [{ englishName: 'All', koreanName: '모든 작곡가', selected: true },
    	      { englishName: 'Bach', koreanName: '바하', selected: true },
    		  { englishName: 'Beethoven', koreanName: '베토벤', selected: true },
	     	  { englishName: 'Chopin', koreanName: '쇼팽', selected: true }],
	     Genres:
	     	 [{ englishName: 'All', koreanName: '모든 장르', selected: true },
	          { englishName: 'Symphony', koreanName: '교향곡', selected: true },
	     	  { englishName: 'Concerto', koreanName: '협주곡', selected: true }],
	     Instruments:
	     	 [{ englishName: 'All', koreanName: '모든 악기', selected: true },
	     	  { englishName: 'Orchestra', koreanName: '오케스트라', selected: true },
	     	  { englishName: 'Piano', koreanName: '피아노', selected: true }]
	};
	
	var Conditions = {
		data: [],
		store: function() {
			store();
		}
	}
	
	try {
		var items = angular.fromJson(localStorage.getItem('musicSearchConditions'));
		if (items) {
			Conditions.data = items;
		} else {
			Conditions.data = defaultData;
		}
	} catch (e) {
		Conditions.data = defaultData;
	}
	
	return Conditions;
});
