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
    .when('/ahorroMain',{
        templateUrl: 'views/ahorroMain.view.html',
        controller: 'AhorroMainCtrl'
    })
    .when('/bancos',{
        templateUrl: 'views/bancos.view.html',
        controller: 'BancosCtrl'
    })
    .when('/ahorroDetail',{
        templateUrl: 'views/ahorroDetail.view.html',
        controller: 'AhorroDetailCtrl'
    })
    .when('/ahorroInteres',{
        templateUrl: 'views/ahorroIntere.view.html',
        controller: 'AhorroInteresCtrl'
    })
    .when('/cdpCalc',{
        templateUrl: 'views/cdpCalc.view.html',
        controller: 'CdpCalcCtrl'
    })
    .when('/fundsCalc',{
        templateUrl: 'views/funds.view.html',
        controller: 'FundsCtrl'
    })
    .otherwise({redirectTo: 'movimientos'})
}]);
