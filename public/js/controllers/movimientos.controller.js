angular.module("finanzasApp")

.controller('MovimientosCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter',function($scope, $http,toastr,DTOptionsBuilder,$filter){
    console.log('MovimientosCtrl Init...');
    
    $scope.selectName = null;
    $scope.filter = false;
    $scope.addNew = false;
    $scope.selectStatus = true;
    var selectedTipoSelect = "";
    $http.get('/tiposMovimientos').then(function(response){
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
    
    $scope.addMovimiento = function(){
        
        if (jQuery.isEmptyObject( $scope.id )){
        
            $http.post('/movimientos',{
                movimiento: $scope.movimiento,
                monto: $scope.monto,
                tipo: selectedTipoSelect.tipo,
                fecha: $scope.fecha,
                categoria: selectedTipoSelect.descripcion
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
        }else{
            //UPDATE
            var tipo = "";
            var categoria = ""
    
            if($scope.selectStatus && $scope.selectName != null){
                tipo = selectedTipoSelect.tipo;
                categoria = selectedTipoSelect.categoria;
                console.log("2");


            }else{
                tipo = $scope.tipo;
                categoria = $scope.selectName;
                            console.log("1");
                
                

            }

            $http.put('/movimientos',{
                id: $scope.id,
                movimiento: $scope.movimiento,
                monto: $scope.monto,
                tipo: tipo,
                fecha: $scope.fecha,
                categoria: categoria 
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
    
    $scope.selectedTipoSel = function(pItem) {
        selectedTipoSelect = pItem;
    }
    
    $scope.deleteRow = function(row){
        $http.delete('/movimientos/'+row._id).then(function(response){
            if (!jQuery.isEmptyObject( response ))
                {
                    if(response.status === 500)
                    {
                        console.debug("Error: " + response.error)
                        toastr.error('Ocurrio un error :(');
                        return;
                    }
                    
                    toastr.success("Eliminado " + row.movimiento);
                    $scope.addNewOff();
                    return;
                }
        })
    }
    
    function refresh(){
        $scope.monto = "";
        $scope.movimiento = "";
        $scope.fecha = "";
        $scope.selectStatus = true;
        $scope.selectName = null;
        $scope.filter = false;
        $scope.filter1 ="";
        $scope.filter2 ="";
        
        $http.get('/movimientos').then(function(response){
            $scope.movimientos = response.data;
        })
    }
    
    $scope.updateActivate = function(row){
        $scope.id = row._id;
        $scope.movimiento = row.movimiento;
        $scope.monto = row.monto;
        $scope.fecha = $filter('date')(row.fecha, "MM/dd/yyyy");;
        $scope.selectedTipo = row.tipo;
        $scope.tipo = row.tipo;
        
        $scope.addNew = true;
        $scope.selectStatus = false;
        $scope.selectName  = row.categoria;

    }
    
    $scope.cambiarSelect = function(){
        $scope.selectStatus = true;
        $scope.selectName = null;
        $scope.selectedTipo = $scope.tipos[0];
    }
    
    $scope.getIngresos = function(){
        var result = 0;
        $scope.invoiceDetails.details.forEach(function (item){
            result = result + (item.precio * item.cantidad);
        });
        return result;
    };
    
    $scope.getIngreso = function(){
        var result = 0;
        var ingresos = JSON.search($scope.movimientos, '//*[tipo="Ingreso"]');
        if (ingresos.length > 0)
        {
              ingresos.forEach(function (item){
                result = result + item.monto;
            });      
        }
        
        return result;
    };
    
    $scope.getEgreso = function(){
        var result = 0;
        var egresos = JSON.search($scope.movimientos, '//*[tipo="Egreso"]');

        if (egresos.length > 0)
        {
              egresos.forEach(function (item){
                result = result + item.monto;
            });      
        }
        
        return result;
    };
    
    $scope.toogleFilter = function(){
        $scope.filter = !$scope.filter;
        $scope.filter1 ="";
        $scope.filter2 ="";
        
        $http.get('/movimientos').then(function(response){
            $scope.movimientos = response.data;
        })
    }
    
    $scope.filterRun = function(){
        if(jQuery.isEmptyObject( $scope.filter1 ) || jQuery.isEmptyObject( $scope.filter2 ) || $scope.filter2 == "" ||$scope.filter1 == "")
        {
            toastr.warning('Verifique los datos');
            return;        
        }
        $http.post('/movimientos/betweenDates',{
            dateIn: $scope.filter1,
            dateOut: $scope.filter2
        }).then(function(response){
            $scope.movimientos = response.data;
        })
    }
}])

