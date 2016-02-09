angular.module('finanzasApp')

.factory('$dataFactory',function(){
    var tipos = [
     { id: 0, name: 'Seleccione' },
     { id: 1, name: 'Ingreso' },
     { id: 2, name: 'Egreso' }
   ];
    
    var frecuencias = [
     { id: 0, name: 'Anual',value: 12},
     { id: 1, name: 'Bimestral',value: 2},
     { id: 2, name: 'Trimestral',value: 3},
     { id: 3, name: 'Cuatrimestre',value: 4},
     { id: 4, name: 'Semestre',value: 6},
   ];
    
    return {
        tipos: tipos,
        frecuencias: frecuencias
        };
})
