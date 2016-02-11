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
     { id: 5, name: 'Mensual',value: 1},
   ];
    
    var presupuestoSelected = {};
    
    return {
        tipos: tipos,
        frecuencias: frecuencias,
        presupuestoSelected: presupuestoSelected
        };
})

.factory('uuid', function() {
    var svc = {
        new: function() {
            function _p8(s) {
                var p = (Math.random().toString(16)+"000000000").substr(2,8);
                return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
            }
            return _p8() + _p8(true) + _p8(true) + _p8();
        },
         
        empty: function() {
          return '00000000-0000-0000-0000-000000000000';
        }
    };
     
    return svc;
});