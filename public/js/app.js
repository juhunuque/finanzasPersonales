var app = angular.module('finanzasApp',['ngRoute','door3.css','ngAnimate','toastr','datatables','720kb.datepicker','googlechart']);

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
    .when('/presupuestoDetail',{
        templateUrl: 'views/presupuestoDetail.view.html',
        controller: 'PresupuestoDetailCtrl'
    })
    .otherwise({redirectTo: 'movimientos'})
}]);
