angular.module("finanzasApp")

.controller('AhorroInteresCtrl',['$scope','$http','toastr','DTOptionsBuilder','$filter','$dataFactory','$location','$route',function($scope, $http,toastr,DTOptionsBuilder,$filter,$dataFactory,$location,$route){
    console.log('AhorroInteresCtrl Init...'); 
    
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

    refresh();
    cleanIntereses();
    
    function refresh(){        
        if($scope.ahorroMain.intereses){
            $scope.intereses = JSON.parse($scope.ahorroMain.intereses);
        }
        
    }
    
    $scope.runCreateProcess = function(){
        cleanIntereses();
    }
    
    function cleanIntereses(){
        if($scope.ahorroMain.movimientos){
            var movimientosAux = JSON.parse($scope.ahorroMain.movimientos);
            var movimientosClone = movimientosAux.slice(0);
            var fechaAnterior = 0;
            var monto = 0;
            var tasa = ($scope.ahorroMain.tasa / 100 ) / 12;
            var intereses = [];
            var count = 0;


            fechaAnterior = new Date(movimientosAux[0].fecha);
            movimientosAux.forEach(function(mov){
                if(mov.categoria == 'Intereses'){
                        var index = movimientosClone.indexOf(mov);
                        if (index > -1) {
                            movimientosClone.splice(index, 1);
                        }
                    }
                else{
                    var fechaMov = new Date(mov.fecha);
                    if(fechaAnterior.getMonth() !== fechaMov.getMonth()){
                        count++;
                        intereses.push({
                            fecha: new Date(fechaAnterior.getFullYear(),fechaAnterior.getMonth()+1,0),
                            saldo: (monto * tasa) + monto,
                            interes: monto * tasa
                            });

                        movimientosClone.push({
                            fecha: new Date(fechaAnterior.getFullYear(),fechaAnterior.getMonth()+1,0),
                            categoria: 'Intereses',
                            tipo: 'Ingreso', 
                            monto: monto * tasa,
                            saldo: (monto * tasa) + monto,
                            descripcion: 'Intereses ganados'
                        });
                        //monto = monto * tasa;
                        monto = monto + (monto*tasa);
                    }

                    if(mov.tipo === 'Egreso')
                    {
                        //mov.monto = mov.monto * -1;  
                        monto = monto - mov.monto;
                    }
                    else{
                        monto = monto + mov.monto;
                    }
                   //monto = monto + mov.monto;
                    fechaAnterior = new Date(mov.fecha);

                } 
            });

            if(monto > 0){
                intereses.push({
                        fecha: new Date(fechaAnterior.getFullYear(),fechaAnterior.getMonth()+1,0),
                        saldo: (monto * tasa) + monto,
                        interes: monto * tasa
                        });

                movimientosClone.push({
                    fecha: new Date(fechaAnterior.getFullYear(),fechaAnterior.getMonth()+1,0),
                    categoria: 'Intereses',
                    tipo: 'Ingreso', 
                    monto: monto * tasa,
                    saldo: (monto * tasa) + monto,
                    descripcion: 'Intereses ganados'
                });
            }

            monto = (monto * tasa) + monto;

            movimientosClone.sort(function(a,b){
              return new Date(a.fecha)-new Date(b.fecha);
            });

            $scope.ahorroMain.movimientos = JSON.stringify(movimientosClone);
            $scope.ahorroMain.intereses = JSON.stringify(intereses);
            $scope.ahorroMain.saldo = monto;

            $http.put('/ahorros',{
                    id: $scope.ahorroMain._id,
                    numeroCuenta: $scope.ahorroMain.numeroCuenta,
                    banco: $scope.ahorroMain.banco,
                    descripcion: $scope.ahorroMain.descripcion,
                    saldo: $scope.ahorroMain.saldo,
                    tasa: $scope.ahorroMain.tasa,
                    movimientos: (!jQuery.isEmptyObject($scope.ahorroMain.movimientos)) ? $scope.ahorroMain.movimientos : '',
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
                            refresh();
                            toastr.success("Intereses procesados!");
                            return;
                        }
                })
        }
    }
}])

