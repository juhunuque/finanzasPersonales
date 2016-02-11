angular.module("finanzasApp")

.controller('PresupuestoMainCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter','$dataFactory','$location',function($scope, $http,toastr,DTOptionsBuilder,$filter,$dataFactory,$location){
    console.log('PresupuestoMainCtrl Init...');
    
    var selectedTipoSelect = "";
    var selectedFrecuenciaSelect = "";
    $scope.frecuencias = $dataFactory.frecuencias;
    $scope.selectedFrecuencia = $scope.frecuencias[0];
    selectedFrecuenciaSelect =  $scope.frecuencias[0];
    
    $scope.selectName = null;
    $scope.filter = false;
    $scope.addNew = false;
    $scope.selectStatus = true;
    
    $http.get('/tiposMovimientos').then(function(response){
          $scope.tiposList = response.data;
          $scope.tiposSelected = [];
            
        
          $scope.selectedTipo = $scope.tiposList[0];
          selectedTipoSelect =  $scope.tiposList[0];

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
        $scope.fecha_inicio = "";
        $dataFactory.presupuestoSelected = {};
        $scope.monto = "";
        
        $scope.selectStatus = true;
        $scope.selectName = null;
        
        $scope.tiposSelected = [];
        
        $http.get('/presupuestosMain').then(function(response){
            $scope.presupuestos = response.data;
        })
        
        
    }
    
    $scope.selectedFrecuenciaSel = function(pItem) {
        selectedFrecuenciaSelect = pItem;
    }
    
    $scope.updateActivate = function(row){
        $scope.id = row._id;
        $scope.descripcion = row.descripcion;
        $scope.fecha_inicio = $filter('date')(row.fecha_inicio, "MM/dd/yyyy");
        $scope.categoria = row.categoria;
        $scope.valor_categoria = row.valor_categoria;
        
        $scope.tiposSelected = JSON.parse(row.tipos);
        
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

            $http.post('/presupuestosMain',{
                descripcion: $scope.descripcion,
                fecha_inicio: $scope.fecha_inicio,
                categoria: selectedFrecuenciaSelect.name,
                valor_categoria: selectedFrecuenciaSelect.value,
                detalles: '',
                tipos: JSON.stringify($scope.tiposSelected)
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
                tipos: JSON.stringify($scope.tiposSelected)
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
        $dataFactory.presupuestoSelected = row;
        $location.url('/presupuestoDetail');
        
    }
    
    
    //
    $scope.addToSelectedList = function(){
        if( $scope.tiposSelected == null ){
            $scope.tiposSelected = [];
        }
        $scope.tiposSelected.push({tipo:selectedTipoSelect,
                                  monto: $scope.monto});
        
        $scope.monto = "";
        
    }
    
    $scope.removeFromSelectedList = function(row){
        //$scope.tiposList.push(row);
        
        var i = $scope.tiposSelected.indexOf(row);
        if(i != -1) {
            $scope.tiposSelected.splice(i, 1);
        }
    }
    
    $scope.selectedTipoSel = function(pItem) {
        selectedTipoSelect = pItem;
    }
 

    
}])

