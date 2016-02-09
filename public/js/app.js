var app = angular.module('finanzasApp',['ngRoute','door3.css','ngAnimate','toastr','datatables','720kb.datepicker']);

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
    .when('/presupuestoMain',{
        templateUrl: 'views/presupuestoMain.view.html',
        controller: 'PresupuestoMainCtrl'
    })
    .otherwise({redirectTo: 'movimientos'})
}]);
