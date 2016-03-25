angular.module('finanzasApp')

.controller('CdpCalcCtrl',['$scope','toastr',function($scope,toastr){
    console.log('CdpCalcCtrl Init...');
    
    var formula = {
      interest: {
          title: 'Interes',
          description: '(Capital * Tasa% * Plazo)/365',
          result: 0,
          isCurrency: true
      },
        interestDates: {
          title: 'Interes (Calendar)',
          description: '(Capital * Tasa% * Plazo)/365',
          result: 0,
          isCurrency: true
      },
        term:{
            title: 'Plazo',
            description: '(Interes * 365) / (Capital * Tasa%)',
            result: 0,
          isCurrency: false
        },
        rate:{
            title: 'Tasa',
            description: '(Interes * 365) / (Capital * Plazo)',
            result: 0,
          isCurrency: false
        },
        rateDates:{
            title: 'Tasa (Calendar)',
            description: '(Interes * 365) / (Capital * Plazo)',
            result: 0,
          isCurrency: false
        },
        capital:{
            title: 'Capital',
            description: '(Interes * 365) / (Tasa% * Plazo)',
            result: 0 ,
          isCurrency: true
        },
        capitalDates:{
            title: 'Capital (Calendar)',
            description: '(Interes * 365) / (Tasa% * Plazo)',
            result: 0 ,
          isCurrency: true
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
        // Interest
        if(typeof $scope.data.capital !== 'undefined' && typeof $scope.data.rate !== 'undefined' && typeof $scope.data.days !== 'undefined'){
            formula.interest.result = cdLib.calculatingInterest($scope.data.capital,$scope.data.rate,$scope.data.days);
            $scope.resultsData.push(formula.interest);
        }
        
        if(typeof $scope.data.capital !== 'undefined' && typeof $scope.data.rate !== 'undefined' 
           && (!jQuery.isEmptyObject($scope.data.startDate) && (!jQuery.isEmptyObject($scope.data.endDate)) )){
            formula.interestDates.result=cdLib.calculatingInterestDates($scope.data.capital,$scope.data.rate,new Date($scope.data.startDate),new Date($scope.data.endDate));
            $scope.resultsData.push(formula.interestDates);
        }
    
        // Term
    
        if(typeof $scope.data.interest !== 'undefined' && typeof $scope.data.capital !== 'undefined' && typeof $scope.data.rate !== 'undefined'){
            formula.term.result = cdLib.calculatingTerm($scope.data.interest,$scope.data.capital,$scope.data.rate);
            $scope.resultsData.push(formula.term);
        }
    
        // Rate
        
        if(typeof $scope.data.interest !== 'undefined' && typeof $scope.data.capital !== 'undefined' && typeof $scope.data.days !== 'undefined'){
            formula.rate.result = cdLib.calculatingRate($scope.data.interest,$scope.data.capital,$scope.data.days);
            $scope.resultsData.push(formula.rate);
        }
    
        if(typeof $scope.data.capital !== 'undefined' && typeof $scope.data.interest !== 'undefined' 
               && (!jQuery.isEmptyObject($scope.data.startDate) && (!jQuery.isEmptyObject($scope.data.endDate)) )){
            formula.rateDates.result = cdLib.calculatingRateDates($scope.data.interest,$scope.data.capital,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.rateDates);
        }
                           
        // Capital               
        if(typeof $scope.data.interest !== 'undefined' && typeof $scope.data.rate !== 'undefined' && typeof $scope.data.days !== 'undefined'){
            formula.capital.result = cdLib.calculatingCapital($scope.data.interest,$scope.data.rate,$scope.data.days);
            $scope.resultsData.push(formula.capital);
        }
                           
        if(typeof $scope.data.interest !== 'undefined' && typeof $scope.data.rate !== 'undefined' 
               && (!jQuery.isEmptyObject($scope.data.startDate) && (!jQuery.isEmptyObject($scope.data.endDate)) )){
            formula.capitalDates.result = cdLib.calculatingCapitalDates($scope.data.interest,$scope.data.rate,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.capitalDates);
        }
        
        if($scope.resultsData.length > 0){
            toastr.success("Procesado!");
            $scope.resultFlag = true;

        }else{
            toastr.error("Datos Insuficientes");               
        }

    };
        
}])