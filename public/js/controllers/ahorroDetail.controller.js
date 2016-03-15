angular.module("finanzasApp")

.controller('AhorroDetailCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter','$dataFactory','$location','$route',function($scope, $http,toastr,DTOptionsBuilder,$filter,$dataFactory,$location,$route){
    console.log('AhorroDetailCtrl Init...');
    
    //CHECK IF THERE IS AN EXISTING PRESUPUESTO OBJECT
    $scope.ahorroMain = $dataFactory.ahorroSelected;
    $dataFactory.ahorroSelected = {};
    
    if(jQuery.isEmptyObject($scope.ahorroMain)){
        $location.url('/ahorroMain');
    }

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false)
        .withOption('destroy', true)
        .withOption('autoWidth', true);
    
    $scope.saldoAnterior = 0;
    $scope.selectName = null;
    $scope.filter = false;
    $scope.addNew = false;
    $scope.selectStatus = true;
    var selectedTipoSelect = [];
    
    $http.get('/tiposMovimientos').then(function(response){
        $scope.tipos = response.data;
        $scope.selectedTipo = $scope.tipos[0];
        selectedTipoSelect = $scope.tipos[0];
    });
    
    $scope.addNewOn = function(){
        $scope.addNew = true;
        refresh();
    }
    $scope.addNewOff = function(){
        $scope.addNew = false;
        refresh();
    }
    
    

    refresh();
    
    $scope.reLoad = function(){
        $dataFactory.ahorroSelected = $scope.ahorroMain;
        $route.reload();
    }
    
    function refresh(){        
        
        $scope.id = false;
        $scope.fecha = '';
        $scope.tipo = '';
        $scope.monto = '';
        $scope.descripcion = '';
        $scope.selectStatus = true;
        $scope.selectName = null;
        
        
        
        $http.get('/ahorros/movimientos/'+$scope.ahorroMain._id).then(function(response){
            $scope.movimientos = !jQuery.isEmptyObject(response.data) ? JSON.parse(response.data) : [];
            /*try {
                $scope.movimientos.sort(function(a,b){
                  return new Date(b.fecha)-new Date(a.fecha);
                });
            }
            catch(err) {
                //ERROR
            }*/
            
            
        });
    }
    
    $scope.selectedTipoSel = function(pItem) {
        selectedTipoSelect = pItem;
    }
    
    $scope.deleteRow = function(row){
        $scope.fecha = row.fecha;
        var i = $scope.movimientos.indexOf(row);
        if(i != -1) {
            $scope.movimientos.splice(i, 1);
        }
        
        $scope.movimientos = setSaldos();
        var movimientosClone = $scope.movimientos.slice(0);
        $scope.ahorroMain.saldo = (!jQuery.isEmptyObject(movimientosClone)) ? movimientosClone.reverse()[0].saldo : 0;
        
        $http.put('/ahorros/',{
            id: $scope.ahorroMain._id,
            numeroCuenta: $scope.ahorroMain.numeroCuenta,
            banco: $scope.ahorroMain.banco,
            descripcion: $scope.ahorroMain.descripcion,
            saldo: $scope.ahorroMain.saldo,
            tasa: $scope.ahorroMain.tasa,
            movimientos: (!jQuery.isEmptyObject($scope.movimientos)) ? JSON.stringify($scope.movimientos) : '',
            intereses: (!jQuery.isEmptyObject($scope.ahorroMain.intereses)) ? $scope.ahorroMain.intereses : ''
        }).then(function(response){
            if (!jQuery.isEmptyObject( response ))
                {
                    if(response.status === 500)
                    {
                        console.debug("Error: " + response.error)
                        toastr.error('Ocurrio un error :(');
                        return;
                    }
    
                    toastr.success("Eliminado!");
                    $scope.addNewOff();
                    $dataFactory.ahorroSelected = $scope.ahorroMain;
                    $route.reload();
                    return;
                }
        })
    }
    
    $scope.addMovimiento = function(){
        
        if (!$scope.id){
        
            $scope.movimientos.push({
                  fecha: $scope.fecha,
                  categoria: selectedTipoSelect.descripcion,
                  tipo: selectedTipoSelect.tipo, 
                  monto: $scope.monto,
                  descripcion: $scope.descripcion}); 
            
            $scope.movimientos = setSaldos();
            var movimientosClone = $scope.movimientos.slice(0);
            $scope.ahorroMain.saldo = (!jQuery.isEmptyObject(movimientosClone)) ? movimientosClone.reverse()[0].saldo : 0;
            
            $http.put('/ahorros',{
                id: $scope.ahorroMain._id,
                numeroCuenta: $scope.ahorroMain.numeroCuenta,
                banco: $scope.ahorroMain.banco,
                descripcion: $scope.ahorroMain.descripcion,
                saldo: $scope.ahorroMain.saldo,
                tasa: $scope.ahorroMain.tasa,
                movimientos: (!jQuery.isEmptyObject($scope.movimientos)) ? JSON.stringify($scope.movimientos) : '',
                intereses: (!jQuery.isEmptyObject($scope.ahorroMain.intereses)) ? $scope.ahorroMain.intereses : ''
            }).then(function(data){
                if (!jQuery.isEmptyObject( data ))
                    {
                        if(data.status === 500)
                        {
                            console.debug("Error: " + data.error)
                            toastr.error('Ocurrio un error :(');
                            return;
                        }
                        toastr.success("Agregado movimiento!");
                        $scope.addNewOff();
                        $dataFactory.ahorroSelected = $scope.ahorroMain;
                        $route.reload();
                        return;
                    }
            })
        }else{
            //UPDATE
            var tipo = "";
            var categoria = ""
            if(!$scope.selectStatus && $scope.selectName != null){
                tipo = $scope.tipo;
                categoria = $scope.selectName;

            }else{
                tipo = selectedTipoSelect.tipo;
                categoria = selectedTipoSelect.descripcion;
            }
            var i = $scope.movimientos.indexOf($scope.rowAnterior);
            if(i != -1) {
                $scope.movimientos.splice(i, 1);
            }
            $scope.movimientos.push({
                  fecha: $scope.fecha,
                  categoria: categoria,
                  tipo: tipo,
                  monto: $scope.monto,
                  descripcion: $scope.descripcion}); 
            
            $scope.movimientos = setSaldos();
            var movimientosClone = $scope.movimientos.slice(0);
            $scope.ahorroMain.saldo = (!jQuery.isEmptyObject(movimientosClone)) ? movimientosClone.reverse()[0].saldo : 0;
            
            
            $http.put('/ahorros',{
                id: $scope.ahorroMain._id,
                numeroCuenta: $scope.ahorroMain.numeroCuenta,
                banco: $scope.ahorroMain.banco,
                descripcion: $scope.ahorroMain.descripcion,
                saldo: $scope.ahorroMain.saldo,
                tasa: $scope.ahorroMain.tasa,
                movimientos: (!jQuery.isEmptyObject($scope.movimientos)) ? JSON.stringify($scope.movimientos) : '',
                intereses: (!jQuery.isEmptyObject($scope.ahorroMain.intereses)) ? $scope.ahorroMain.intereses : ''
            }).then(function(data){
                if (!jQuery.isEmptyObject( data ))
                    {
                        if(data.status === 500)
                        {
                            console.debug("Error: " + data.error)
                            toastr.error('Ocurrio un error :(');
                            return;
                        }
                        
                        toastr.success("Actualizado!");
                        $scope.addNewOff();
                        $dataFactory.ahorroSelected = $scope.ahorroMain;
                        $route.reload();
                        return;
                    }
            })
        }
            
    }
    
    $scope.updateActivate = function(row){
        
        $scope.id = true;
        $scope.fecha = $filter('date')(row.fecha, "MM/dd/yyyy");
        $scope.selectedTipo = row.tipo;
        $scope.tipo = row.tipo;
        $scope.monto = row.monto;
        $scope.descripcion = row.descripcion;
        
        $scope.addNew = true;
        $scope.selectStatus = false;
        $scope.selectName  = row.categoria;
        
        $scope.rowAnterior = row;

    }
    
    function setSaldos(){
        try {
            $scope.movimientos.sort(function(a,b){
              return new Date(b.fecha)-new Date(a.fecha);
            });
        }
        catch(err) {
            //ERROR
        }
        var movimientos = $scope.movimientos.slice(0);
        var movimientosAux = [];
        var saldo = 0;
        var count = 0;
        
        movimientos = movimientos.reverse();
        
        movimientos.forEach(function(mov){
                if(mov.tipo === 'Egreso')
                {
                    //mov.monto = mov.monto * -1;  
                    saldo = saldo - mov.monto;
                }
                else{
                    saldo = saldo + mov.monto;
                }

                //saldo = saldo + mov.monto;
                //movimientosAux[count].saldo = saldo;
                movimientosAux.push({
                    fecha: mov.fecha,
                    categoria: mov.categoria,
                    tipo: mov.tipo, 
                    monto: mov.monto,
                    descripcion: mov.descripcion,
                    saldo: saldo
                });
            
                count = count + 1;
            });
        
        return movimientosAux;
    }
    
    $scope.cambiarSelect = function(){
        $scope.selectStatus = true;
        $scope.selectName = null;
        $scope.selectedTipo = $scope.tipos[0];
        selectedTipoSelect = $scope.tipos[0];
        
    }
        
}])

