angular.module("finanzasApp")

.controller('PresupuestoMainCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter','$dataFactory',function($scope, $http,toastr,DTOptionsBuilder,$filter,$dataFactory){
    console.log('PresupuestoMainCtrl Init...');
    
    var selectedFrecuenciaSelect = "";
    $scope.frecuencias = $dataFactory.frecuencias;
    $scope.selectedFrecuencia = $scope.frecuencias[0];
    selectedFrecuenciaSelect =  $scope.frecuencias[0];
    
    $scope.selectName = null;
    $scope.filter = false;
    $scope.addNew = false;
    $scope.selectStatus = true;
    
    
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
        $scope.fecha_inicio = "";
        
        
        $scope.selectStatus = true;
        $scope.selectName = null;
        
        
        $http.get('/presupuestosMain').then(function(response){
            $scope.presupuestos = response.data;
        })
    }
    
    $scope.selectedFrecuenciaSel = function(pItem) {
        selectedFrecuenciaSelect = pItem;
        console.log(JSON.stringify(selectedFrecuenciaSelect));
        
    }
    
    $scope.updateActivate = function(row){
        $scope.id = row._id;
        $scope.descripcion = row.descripcion;
        $scope.fecha_inicio = $filter('date')(row.fecha_inicio, "MM/dd/yyyy");
        $scope.categoria = row.categoria;
        $scope.valor_categoria = row.valor_categoria;
        
        $scope.addNew = true;
        $scope.selectStatus = false;
        $scope.selectName  = row.categoria;

    }
    
    $scope.cambiarSelect = function(){
        $scope.selectStatus = true;
        $scope.selectName = null;
        $scope.selectedFrecuencia = $scope.frecuencias[0];
    }
    
    $scope.deleteRow = function(row){
        $http.delete('/presupuestosMain/'+row._id).then(function(response){
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
            console.log("INSERT");
            console.log($scope.descripcion);
            console.log($scope.fecha_inicio);
            console.log(selectedFrecuenciaSelect.name);
            console.log(selectedFrecuenciaSelect.value);

            $http.post('/presupuestosMain',{
                descripcion: $scope.descripcion,
                fecha_inicio: $scope.fecha_inicio,
                categoria: selectedFrecuenciaSelect.name,
                valor_categoria: selectedFrecuenciaSelect.value,
                detalles: ''
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
            console.log("UPDATE");

            var categoria = "";
            var valor_categoria = "";
            if($scope.selectStatus && $scope.selectName != null){
                categoria = $scope.selectName;
                valor_categoria = $scope.valor_categoria;
            }else{
                categoria = selectedFrecuenciaSelect.name;
                valor_categoria = selectedFrecuenciaSelect.value;
            }
            $http.put('/presupuestosMain',{
                id: $scope.id,
                descripcion: $scope.descripcion,
                fecha_inicio: $scope.fecha_inicio,
                categoria: selectedFrecuenciaSelect.name,
                valor_categoria: selectedFrecuenciaSelect.value,
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
}])

