angular.module("finanzasApp")

.controller('AhorroMainCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter','$dataFactory','$location',function($scope, $http,toastr,DTOptionsBuilder,$filter,$dataFactory,$location){
    console.log('AhorroMainCtrl Init...');
    
    $scope.selectName = null;
    $scope.filter = false;
    $scope.addNew = false;
    $scope.selectStatus = true;
    
    var selectedTipoSelect;
    $http.get('/bancos').then(function(response){
        $scope.tipos = response.data;
        $scope.selectedTipo = $scope.tipos[0];
        selectedTipoSelect = $scope.tipos[0];
    });
    
    
    // DataTables configurable options
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false)
        .withOption('autoWidth', true);
    
    refresh();
    
    $scope.addNewOn = function(){
        $scope.addNew = true;
        refresh();
    }
    $scope.addNewOff = function(){
        $scope.addNew = false;
        refresh();
    }
    
    function refresh(){
        $scope.descripcion = "";
        $scope.tasa = "";
        $dataFactory.ahorroSelected = {};
        
        $scope.selectStatus = true;
        $scope.selectName = null;
        
        $scope.tiposSelected = [];
        
        $http.get('/ahorros').then(function(response){
            $scope.cuentas = response.data;
        })
        
        
    }
    
    $scope.selectedFrecuenciaSel = function(pItem) {
        selectedFrecuenciaSelect = pItem;
    }
    
    $scope.updateActivate = function(row){
        $scope.id = row._id;
        $scope.numeroCuenta = row.numeroCuenta;
        $scope.descripcion = row.descripcion;
        $scope.saldo = row.saldo;
        $scope.tasa = row.tasa;
        $scope.movimientos = row.movimientos;
        
        
        $scope.addNew = true;
        $scope.selectStatus = false;
        $scope.selectName  = row.banco;

    }
    
    $scope.cambiarSelect = function(){
        $scope.selectStatus = true;
        $scope.selectName = null;
        $scope.selectedTipo = $scope.tipos[0];
        selectedTipoSelect = $scope.tipos[0];
        
    }
    
    $scope.deleteRow = function(row){
        $http.delete('/ahorros/'+row._id).then(function(response){
            if (!jQuery.isEmptyObject( response ))
                {
                    if(response.status === 500)
                    {
                        console.debug("Error: " + response.error)
                        toastr.error('Ocurrio un error :(');
                        return;
                    }
                    
                    toastr.success("Eliminado " + row.descripcion);
                    $scope.addNewOff();
                    return;
                }
        })
    }
    
    
    $scope.addTipo = function(){
        /*if(selectedTipoSelect.id === 0 || selectedTipoSelect === "" || $scope.descripcion === ""){
            toastr.warning('Verifique los datos');
            return;
        }*/
        // INSERT
        if (jQuery.isEmptyObject( $scope.id )){

            $http.post('/ahorros',{
                numeroCuenta: makeAccount(),
                banco: selectedTipoSelect.nombre,
                descripcion: $scope.descripcion,
                tasa: $scope.tasa
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
                        toastr.success("Creado nueva Cuenta!");
                        return;
                    }
                })  

        }else{
            //UPDATE
            var banco = ""
             if(!$scope.selectStatus && $scope.selectName != null){
                banco = $scope.selectName;

                }else{
                    banco = selectedTipoSelect.nombre;
                }
            $http.put('/ahorros',{
                id: $scope.id,
                numeroCuenta: $scope.numeroCuenta,
                banco: banco,
                descripcion: $scope.descripcion,
                saldo: $scope.saldo,
                tasa: $scope.tasa,
                movimientos: $scope.movimientos
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
                        toastr.success("Actualizado!");
                        return;
                    }
            })
        }       
    }
    
    $scope.goToDetails = function(row){
        $dataFactory.ahorroSelected = row;
        $location.url('/ahorroDetail');
        
    }
    
    $scope.goToInteres = function(row){
        $dataFactory.ahorroSelected = row;
        $location.url('/ahorroInteres');
        
    }
    
    
    $scope.selectedTipoSel = function(pItem) {
        selectedTipoSelect = pItem;
    }
 

    function makeAccount()
    {
        var text = "";
        var possible = "0123456789";

        for( var i=0; i < 7; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    



}]);