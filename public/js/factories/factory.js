angular.module('finanzasApp')

.factory('$dataFactory',function(){
    var tipos = [
     { id: 0, name: 'Seleccione' },
     { id: 1, name: 'Ingreso' },
     { id: 2, name: 'Egreso' }
   ];
    
    return {
        tipos: tipos
        };
})
