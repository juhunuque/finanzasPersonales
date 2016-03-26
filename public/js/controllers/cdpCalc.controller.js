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
        if(!isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.rate) && !isEmptyObject($scope.data.days)){
            formula.interest.result = cdLib.calculatingInterest($scope.data.capital,$scope.data.rate,$scope.data.days);
            $scope.resultsData.push(formula.interest);
        }
        
        if(!isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.rate) && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.interestDates.result=cdLib.calculatingInterestDates($scope.data.capital,$scope.data.rate,new Date($scope.data.startDate),new Date($scope.data.endDate));
            $scope.resultsData.push(formula.interestDates);
        }
    
        // Term
    
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.rate)){
            formula.term.result = cdLib.calculatingTerm($scope.data.interest,$scope.data.capital,$scope.data.rate);
            $scope.resultsData.push(formula.term);
        }
    
        // Rate
        
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.days)){
            formula.rate.result = cdLib.calculatingRate($scope.data.interest,$scope.data.capital,$scope.data.days);
            $scope.resultsData.push(formula.rate);
        }
    
        if(!isEmptyObject($scope.data.capital) && !isEmptyObject($scope.data.interest) 
               && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.rateDates.result = cdLib.calculatingRateDates($scope.data.interest,$scope.data.capital,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.rateDates);
        }
                           
        // Capital               
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.rate) && !isEmptyObject($scope.data.days)){
            formula.capital.result = cdLib.calculatingCapital($scope.data.interest,$scope.data.rate,$scope.data.days);
            $scope.resultsData.push(formula.capital);
        }
                           
        if(!isEmptyObject($scope.data.interest) && !isEmptyObject($scope.data.rate) 
               && (!isEmptyObject($scope.data.startDate) && !isEmptyObject($scope.data.endDate)) ){
            formula.capitalDates.result = cdLib.calculatingCapitalDates($scope.data.interest,$scope.data.rate,$scope.data.startDate,$scope.data.endDate);
            $scope.resultsData.push(formula.capitalDates);
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