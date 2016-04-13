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

        if(!isEmptyObject($scope.data.inverstment) && !isEmptyObject($scope.data.performance) && !isEmptyObject($scope.data.days)){
            formula.annual.result = cdLib.annualisedYield($scope.data.inverstment,$scope.data.performance,$scope.data.days) * 100;
            formula.monthly.result = formula.annual.result / 12;
            $scope.resultsData.push(formula.annual);
            $scope.resultsData.push(formula.monthly);
        }
        
        if(!isEmptyObject($scope.data.inverstment) && !isEmptyObject($scope.data.performance) && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.annualCalendar.result = cdLib.annualisedYieldDates($scope.data.inverstment,$scope.data.performance,$scope.data.startDate,$scope.data.endDate) * 100;
            formula.monthlyCalendar.result = formula.annualCalendar.result / 12;
            $scope.resultsData.push(formula.annualCalendar);
            $scope.resultsData.push(formula.monthlyCalendar);
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