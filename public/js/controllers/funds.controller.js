angular.module('finanzasApp')

.controller('FundsCtrl',['$scope','toastr',function($scope,toastr){
    console.log('FundsCtrl Init...');
    
     var formula = {
      annual: {
          title: 'Beneficio (Anual)',
          description: '((Vf / Vi)^(365/dias))-1',
          result: 0,
          isCurrency: false
      },
      annualCalendar: {
          title: 'Beneficio (Anual, Calendar)',
          description: '((Vf / Vi)^(365/dias))-1',
          result: 0,
          isCurrency: false
      },
        monthly: {
          title: 'Beneficio (Mensual)',
          description: '(((Vf / Vi)^(365/dias))-1)/12',
          result: 0,
          isCurrency: false
      },
        monthlyCalendar: {
          title: 'Beneficio (Mensual, Calendar)',
          description: '(((Vf / Vi)^(365/dias))-1)/12',
          result: 0,
          isCurrency: false
      },
        performance: {
          title: 'Rendimiento',
          description: '((365/dias)√((Rentabilidad/100)+1))*Vi',
          result: 0,
          isCurrency: true
      },
        performanceCalendar: {
          title: 'Rendimiento (Calendar)',
          description: '((365/dias)√((Rentabilidad/100)+1))*Vi',
          result: 0,
          isCurrency: true
      },
        inverstment: {
          title: 'Inversion',
          description: '(Vf/((365/dias)√((Rentabilidad/100)+1)))', 
          result: 0,
          isCurrency: true
      },
        inverstmentCalendar: {
          title: 'Inversion (Calendar)',
          description: '(Vf/((365/dias)√((Rentabilidad/100)+1)))', 
          result: 0,
          isCurrency: true
      },
        days: {
          title: 'Dias',
          description: 'Log(365√(Rentabilidad/100)+1)(Vf/Vi)', 
          result: 0,
          isCurrency: false
      }
         
    }; 
    
    $scope.resultFlag = false;
    $scope.data = {};
    
    $scope.clean = function(){
        $scope.resultFlag = false;
        $scope.resultsData = [];
        $scope.data = {};
    }
    
    $scope.calculate = function(){
        console.log('Calculating...');
        $scope.resultsData = [];

        // Annual/Monthly
        if(!isEmptyObject($scope.data.inverstment) && !isEmptyObject($scope.data.performance) && !isEmptyObject($scope.data.days)){
            formula.annual.result = cdLib.profit($scope.data.inverstment,$scope.data.performance,$scope.data.days) * 100;
            formula.monthly.result = formula.annual.result / 12;
            $scope.resultsData.push(formula.annual);
            $scope.resultsData.push(formula.monthly);
        }
        
        
        if(!isEmptyObject($scope.data.inverstment) && !isEmptyObject($scope.data.performance) && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.annualCalendar.result = cdLib.profitDates($scope.data.inverstment,$scope.data.performance,$scope.data.startDate,$scope.data.endDate) * 100;
            formula.monthlyCalendar.result = formula.annualCalendar.result / 12;
            $scope.resultsData.push(formula.annualCalendar);
            $scope.resultsData.push(formula.monthlyCalendar);
        }
        
        // Performance
        if(!isEmptyObject($scope.data.inverstment) && !isEmptyObject($scope.data.profit) && !isEmptyObject($scope.data.days)){
            formula.performance.result = cdLib.performance($scope.data.inverstment,$scope.data.profit,$scope.data.days);
            $scope.resultsData.push(formula.performance);
        }
        
        if(!isEmptyObject($scope.data.inverstment) && !isEmptyObject($scope.data.profit) && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.performanceCalendar.result = cdLib.performanceDates($scope.data.inverstment,$scope.data.profit,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.performanceCalendar);
        }
        
        // Inverstment
        
        if(!isEmptyObject($scope.data.performance) && !isEmptyObject($scope.data.profit) && !isEmptyObject($scope.data.days)){
            formula.inverstment.result = cdLib.inverstment($scope.data.performance,$scope.data.profit,$scope.data.days);
            $scope.resultsData.push(formula.inverstment);
        }
        
        if(!isEmptyObject($scope.data.performance) && !isEmptyObject($scope.data.profit) && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.inverstmentCalendar.result = cdLib.inverstmentDates($scope.data.performance,$scope.data.profit,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.inverstmentCalendar);
        }
        
        // Days
        if(!isEmptyObject($scope.data.performance) && !isEmptyObject($scope.data.profit) && !isEmptyObject($scope.data.inverstment)){
            formula.days.result = cdLib.daysInverstmentFound($scope.data.performance,$scope.data.profit,$scope.data.inverstment);
            $scope.resultsData.push(formula.days);
        }
        
        
        if($scope.resultsData.length > 0){
            toastr.success("Processing!");
            $scope.resultFlag = true;

        }else{
            toastr.error("Insufficient Data");               
        }

    };
    
    function isEmptyObject(item){
        if(typeof item === 'undefined' || item === null || item === ''){
            return true;
        }else{
            return false;
        }
    }
}])