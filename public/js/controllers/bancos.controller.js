angular.module("finanzasApp")

.controller('BancosCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter',function($scope, $http,toastr,DTOptionsBuilder,$filter){
    console.log('BancosCtrl Init...');
    
    
    // DataTables configurable options
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false)
        .withOption('searching', false)
        .withOption('autoWidth', true);
    
    $scope.addNew = false;
    refresh();
    
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
          $http.post('/bancos',{
                descripcion: $scope.descripcion,
                nombre: $scope.nombre
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
                        toastr.success("Creado nuevo banco!");
                        return;
                    }
                })  

        }else{
            //UPDATE
            $http.put('/bancos',{
                id: $scope.id,
                descripcion: $scope.descripcion,
                nombre: $scope.nombre 
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
        $http.delete('/bancos/'+row._id).then(function(response){
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
    
    
    $scope.updateActivate = function(row){
        $scope.id = row._id;
        $scope.nombre = row.nombre;
        $scope.descripcion = row.descripcion;
        $scope.addNew = true;

    }
    
    
    function refresh(){
        $scope.descripcion = "";
        $scope.nombre = "";
        $scope.id = null;
        
        $http.get('/bancos').then(function(response){
            $scope.bancosDt = response.data;
        })

    }

}]);