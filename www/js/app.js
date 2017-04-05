// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
var app = angular.module('starter', ['ionic'])
var comics = [];
var comicsfecha = [];
var comicstitulo = [];

function getComic(id){
  return comics.filter(function(comic){
    return comic.id == id;
  })[0];
}


app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('list', {
    url:'/list',
    templateUrl:'templates/list.html'
  });
  $stateProvider.state('info', {
    url:'/info/:id',
    templateUrl:'templates/info.html'
  });
  $stateProvider.state('buscar', {
    cache: false,
    url:'/buscar',
    templateUrl:'templates/buscar.html'
  });
  $stateProvider.state('buscartitulo', {
    cache: false,
    url:'/buscartitulo',
    templateUrl:'templates/buscartitulo.html'
  });
  $stateProvider.state('buscarfecha', {
    cache: false,
    url:'/buscarfecha',
    templateUrl:'templates/buscarfecha.html'
  });
  $stateProvider.state('resultadofecha', {
    url:'/resultadofecha',
    templateUrl:'templates/resultadofecha.html'
  });
  $stateProvider.state('resultadotitulo', {
    url:'/resultadotitulo',
    templateUrl:'templates/resultadotitulo.html'
  });
  $urlRouterProvider.otherwise('/list');
});

app.controller('MarvelCtrl', function($scope, $http){
    $scope.comics = comics;
   /* $http.get('https://gateway.marvel.com/v1/public/comics?&ts=1&apikey=ba57c1da9065b158d2b51a864514e9ea&hash=568dfaf06a6652bc81f2f67fec24d98e').success(function(comics){
      //console.log(comics);
        angular.forEach(comics.data.results,function(comic){
        $scope.comics.push(comic);
        //console.log(comic);
      });
    });*/
        
        var i=0;
        $scope.cargarmas = function(){ 
        var params2 = {};
      
        if ($scope.comics.length > 0) {
            params2['offset'] = i;
        };
        i = i + 20;
        $http.get('https://gateway.marvel.com/v1/public/comics?ts=1&apikey=ba57c1da9065b158d2b51a864514e9ea&hash=568dfaf06a6652bc81f2f67fec24d98e',{params:params2}).success(function(comics){
          //console.log(comics);
            angular.forEach(comics.data.results,function(comic){
            $scope.comics.push(comic);
            //console.log(comic);
          });
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
});

app.controller('infoCtrl', function($scope, $state){
  $scope.id = $state.params.id;
  $scope.comic = getComic($scope.id);
});


app.controller('BuscarFechaCtrl', function($scope, $http){
    $scope.comicsfecha = comicsfecha;

  
    var fecha = document.getElementById('idfecha').value; 
    
   $http.get('https://gateway.marvel.com/v1/public/comics?startYear='+fecha+'&ts=1&apikey=ba57c1da9065b158d2b51a864514e9ea&hash=568dfaf06a6652bc81f2f67fec24d98e').success(function(comicsfecha){
      //console.log(comics);
        angular.forEach(comicsfecha.data.results,function(comicfecha){
        $scope.comicsfecha.push(comicfecha);
        //console.log(comic);
      });
    });

});

app.controller('BuscarTituloCtrl', function($scope, $http){
    $scope.comicstitulo = comicstitulo;

  
    var titulo = document.getElementById('idtitulo').value; 
    
   $http.get('https://gateway.marvel.com/v1/public/comics?title='+titulo+'&ts=1&apikey=ba57c1da9065b158d2b51a864514e9ea&hash=568dfaf06a6652bc81f2f67fec24d98e').success(function(comicstitulo){
      //console.log(comics);
        angular.forEach(comicstitulo.data.results,function(comictitulo){
        $scope.comicstitulo.push(comictitulo);
        //console.log(comic);
      });
    });

});



app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}());
