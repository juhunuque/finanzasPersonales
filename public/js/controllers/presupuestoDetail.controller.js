angular.module("finanzasApp")

.controller('PresupuestoDetailCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter','$dataFactory','$location',function($scope, $http,toastr,DTOptionsBuilder,$filter,$dataFactory,$location){
    console.log('PresupuestoDetailCtrl Init...');
    //CHECK IF THERE IS AN EXISTING PRESUPUESTO OBJECT
    $scope.presupuestoMain = $dataFactory.presupuestoSelected;
    $dataFactory.presupuestoSelected = {};
    if(jQuery.isEmptyObject($scope.presupuestoMain)){
        $location.url('/presupuestoMain');
    }
    jQuery('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    
    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDisplayLength(10)
        .withOption('bLengthChange', false)
        .withOption('autoWidth', true);
    
    var dateIni;
    var dateEnd;
    $scope.chartObject = {};

    refresh();
    
    
    $scope.runCreateProcess = function(){
        $scope.loader = true;
        dateIni = new Date($scope.presupuestoMain.fecha_inicio);
        dateEnd = new Date(new Date(dateIni).setMonth(dateIni.getMonth()+$scope.presupuestoMain.valor_categoria));
        var movimientosArray = $scope.movimientos;
        var result = 0;     
        var count = 12;
        var resultObject = [];
        var tipos =JSON.parse($scope.presupuestoMain.tipos)
        
        /*for( tipo in  tipos ){
            while ( count != 0 ){
                movimientosArray.forEach(function (item){
                    if(item.categoria === tipos[tipo].tipo.descripcion
                        && new Date(item.fecha) >= dateIni
                        && new Date(item.fecha) <= dateEnd){
                        result = result + item.monto;
                    }
                });   
                
                if ( result !== 0 ){
                    resultObject.push({categoria: tipos[tipo].tipo.descripcion,
                                  fecha_ini: dateIni,
                                  fecha_end: dateEnd,
                                  presupuesto: tipos[tipo].monto,
                                  total: result}); 
                }
                
                dateIni = dateEnd;
                dateEnd = new Date(new Date(dateIni).setMonth(dateIni.getMonth()+$scope.presupuestoMain.valor_categoria));
                result = 0;
                count = count - $scope.presupuestoMain.valor_categoria;
                
            }

            dateIni = new Date($scope.presupuestoMain.fecha_inicio);
            dateEnd = new Date(new Date(dateIni).setMonth(dateIni.getMonth()+$scope.presupuestoMain.valor_categoria));
            count = 12;
        }*/
        
        for( tipo in  tipos ){
            while ( dateIni < dateEnd ){
                movimientosArray.forEach(function (item){
                    if(item.categoria === tipos[tipo].tipo.descripcion
                        && new Date(item.fecha) >= dateIni
                        && new Date(item.fecha) <= dateEnd){
                        result = result + item.monto;
                    }
                });   
                
                if ( result !== 0 ){
                    resultObject.push({categoria: tipos[tipo].tipo.descripcion,
                                  fecha_ini: dateIni,
                                  fecha_end: dateEnd,
                                  presupuesto: tipos[tipo].monto,
                                  total: result}); 
                }
                
                dateIni = dateEnd;
                dateEnd = new Date(new Date(dateIni).setMonth(dateIni.getMonth()+$scope.presupuestoMain.valor_categoria));
                
                if(dateEnd > new Date($scope.presupuestoMain.fecha_final)){
                    dateEnd = new Date($scope.presupuestoMain.fecha_final);
                }
                
                result = 0;
                count = count - $scope.presupuestoMain.valor_categoria;
                
            }

            dateIni = new Date($scope.presupuestoMain.fecha_inicio);
            dateEnd = new Date(new Date(dateIni).setMonth(dateIni.getMonth()+$scope.presupuestoMain.valor_categoria));
            count = 12;
        }
        
        if(!jQuery.isEmptyObject(resultObject)){
            $http.put('/presupuestosMain',{
                id: $scope.presupuestoMain._id,
                descripcion: $scope.presupuestoMain.descripcion,
                fecha_inicio: $scope.presupuestoMain.fecha_inicio,
                fecha_final: $scope.presupuestoMain.fecha_final,
                categoria: $scope.presupuestoMain.categoria,
                valor_categoria: $scope.presupuestoMain.valor_categoria,
                tipos: $scope.presupuestoMain.tipos,
                detalles: JSON.stringify(resultObject)
            }).then(function(data){
                if (!jQuery.isEmptyObject( data ))
                    {
                        if(data.status === 500)
                        {
                            console.debug("Error: " + data.error)
                            toastr.error('Ocurrio un error :(');
                            return;
                        }
                        toastr.success("Generado Satisfactoriamente");
                        $scope.presupuestoMain.detalles = JSON.stringify(resultObject);
                        refresh();
                        return;
                    }
            })
        }else{
            refresh();
        }
        
        $scope.loader = false;    
    }
    
    function refresh(){
        $scope.tiposList = JSON.parse($scope.presupuestoMain.tipos);
        $scope.loader = false;
        
        dateIni = new Date($scope.presupuestoMain.fecha_inicio);
        dateEnd = new Date(new Date(dateIni).setMonth(dateIni.getMonth()+12));
        
        $scope.detalles = [];
        $scope.flagDetalles = false;
        
        if($scope.presupuestoMain.detalles){
            $scope.detalles = JSON.parse($scope.presupuestoMain.detalles);
            $scope.flagDetalles = true;
            formatDataForChart();
        }
        
        $http.post('/movimientos/betweenDates',{
            dateIn: dateIni,
            dateOut: dateEnd
        }).then(function(response){
            $scope.movimientos = response.data;
        })
    }

    ////
    function formatDataForChart(){

        if(!jQuery.isEmptyObject($scope.detalles)){
            var rows = [];
            $scope.chartObject.type = "ColumnChart";
            $scope.detalles.forEach(function(item){
                var fecIni = $filter('date')(item.fecha_ini, "MM/dd/yyyy");
                var fecEnd = $filter('date')(item.fecha_end, "MM/dd/yyyy");
                var title = item.categoria + "\n" + fecIni + " - " + fecEnd;
               rows.push({c: [{v: title},{v: item.presupuesto}, {v: item.total}, {v: item.presupuesto - item.total} ] }); 
            });
            
            $scope.chartObject.data = {"cols": [
                { label: "Categoria", type: "string"},
                { label: "Presupuestado", type: "number"},
                { label: "Monto Real", type: "number"},
                { label: "Monto Neto", type: "number"}

            ], "rows": rows
            };
            
            $scope.chartObject.options = {
                'title': 'Presupuesto',
                 'vAxis': {
                  'title': 'Montos'
                  //,'format': 'currency'
                 },
                 'hAxis': {
                  'title': 'Tipos'
                }
            };
            
        }
    }
    
    

}])

