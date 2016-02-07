angular.module("finanzasApp")

.controller('MovimientosCtrl',['$scope','$http','toastr',function($scope, $http,toastr){
    console.log('MovimientosCtrl Init...');
    
    $scope.addNew = false;
    var selectedTipoSelect = "";
    $http.get('/tiposMovimientos').then(function(response){
        $scope.tipos = response.data;
        $scope.selectedTipo = $scope.tipos[0];
    });

    refresh();
    
    $scope.addNewOn = function(){
        $scope.addNew = true;
        refresh();
    }
    $scope.addNewOff = function(){
        $scope.addNew = false;
        refresh();
    }
    
    $scope.addMovimiento = function(){
        $http.post('/movimientos',{
            movimiento: $scope.movimiento,
            monto: $scope.monto,
            tipo: $scope.selectedTipo.tipo,
            categoria: $scope.selectedTipo.descripcion
        }).then(function(data){
            if (!jQuery.isEmptyObject( data ))
                {
                    if(data.status === 500)
                    {
                        console.debug("Error: " + data.error)
                        toastr.error('Ocurrio un error :(');
                        return;
                    }
                    $scope.addNewOff();
                    toastr.success("Agregado movimiento!");
                    return;
                }
        })    
    }
    
    
    
    
    $scope.selectedTipoSel = function(pItem) {
        selectedTipoSelect = pItem;
    }
    
    function refresh(){
        $scope.monto = "";
        $scope.movimiento = "";
    }
}])

