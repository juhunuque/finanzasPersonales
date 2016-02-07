var app = angular.module('finanzasApp',['ngRoute','door3.css','ngAnimate','toastr','datatables']);

app.config(['$routeProvider',function($routeProvider){

    $routeProvider
    .when('/movimientos',{
        templateUrl: 'views/movimientos.view.html',
        controller: 'MovimientosCtrl'
    })
    .when('/tipoMovimientos',{
        templateUrl: 'views/tipoMovimientos.view.html',
        controller: 'TipoMovimientosCtrl'
    })
    .otherwise({redirectTo: 'movimientos'})
}]);
