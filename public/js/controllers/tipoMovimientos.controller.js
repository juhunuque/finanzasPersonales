angular.module("finanzasApp")

.controller('TipoMovimientosCtrl',['$scope','$http','$dataFactory','toastr','DTOptionsBuilder',function($scope, $http, $dataFactory,toastr,DTOptionsBuilder){
    
    console.log('TipoMovimientosCtrl Init...');
    
    // DataTables configurable options
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false)
        .withOption('searching', false)
        .withOption('autoWidth', true);
    
    $scope.users = {};
    
    /*$http.get('/tiposMovimientos').then(function(response){
        $scope.tiposDt = response.data;
    })*/
    
    var selectedTipoSelect = "";
    $scope.selectName = null;
    $scope.addNew = false;
    $scope.selectStatus = true;
    refresh();
    $scope.tipos = $dataFactory.tipos;
    $scope.selectedTipo = $scope.tipos[0];
    
    $scope.addNewOn = function(){
        $scope.addNew = true;
        refresh();
    }
    $scope.addNewOff = function(){
        $scope.addNew = false;
        refresh();
    }
    
    $scope.addTipo = function(){
        /*if(selectedTipoSelect.id === 0 || selectedTipoSelect === "" || $scope.descripcion === ""){
            toastr.warning('Verifique los datos');
            return;
        }*/
        // INSERT
        if (jQuery.isEmptyObject( $scope.id )){
          $http.post('/tiposMovimientos',{
                descripcion: $scope.descripcion,
                tipo: selectedTipoSelect.name
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
                        toastr.success("Creado nuevo tipo!");
                        return;
                    }
                })  

        }else{
            //UPDATE
            var tipo = "";
            if($scope.selectStatus && $scope.selectName != null){
                tipo = $scope.selectName;
            }else{
                tipo = selectedTipoSelect.name;
            }
            $http.put('/tiposMovimientos',{
                id: $scope.id,
                descripcion: $scope.descripcion,
                tipo: tipo 
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
    
    $scope.deleteRow = function(row){
        $http.delete('/tiposMovimientos/'+row._id).then(function(response){
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
    
    $scope.selectedTipoSel = function(pItem) {
        selectedTipoSelect = pItem;
    }
    
    $scope.updateActivate = function(row){
        $scope.id = row._id;
        $scope.descripcion = row.descripcion;
        $scope.selectedTipo = row.tipo;
        $scope.addNew = true;
        $scope.selectStatus = false;
        $scope.selectName  = row.tipo;

    }
    
    $scope.cambiarSelect = function(){
        $scope.selectStatus = true;
        $scope.selectName = null;
        $scope.selectedTipo = $scope.tipos[0];
    }
    
    function refresh(){
        $scope.descripcion = "";
        $scope.id = null;
        $scope.selectStatus = true;
        $scope.selectName = null;
        
        $http.get('/tiposMovimientos').then(function(response){
            $scope.tiposDt = response.data;
        })

    }
}])

