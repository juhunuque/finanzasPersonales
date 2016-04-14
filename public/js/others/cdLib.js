/*!
 * cdLib (Certificate Deposit Library)
 * https://github.com/juhunuque/cdlibjs
 *
 *
 * Created by Julio Nuñez Quesada
 * Released under the MIT license
 *
 * Date: 2016-03-24
 */
(function(cdLib, $, undefined){
    
    cdLib.calculatingInterest = function( capital, rate, term ){
        /*
         *   FORMULA:
         *       (Capital * rate * term)/ 365 (Natural Days) 
         *    INPUT:
         *    - capital = Numeric
         *    - rate = In percentage 
         *    - term = Days within the period
         *    OUTPUT:
         *    - Interest earned
        */
        try{
            if(isEmptyObject(capital) || isEmptyObject(rate) || isEmptyObject(term)){
                throw new UserException('INVALID DATA');
            }
            
            return (capital * (rate/100) * term) / 365;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
        
    };
    
    cdLib.calculatingInterestDates = function( capital, rate, startDate, endDate ){
        /*
         *   FORMULA:
         *       (Capital * rate * term)/ 365 (Natural Days) 
         *    INPUT:
         *    - capital = Numeric
         *    - rate = In percentage 
         *    - term = Days within the period
         *    - startDate = Start date in Date format
         *    - endDate = End date in Date format
         *    OUTPUT:
         *    - Interest earned
        */
        try{
            if(isEmptyObject(capital) || isEmptyObject(rate) || isEmptyObject(startDate) || isEmptyObject(endDate)){
                throw new UserException('INVALID DATA');
            }
            
            return (capital * (rate/100) * cdLib.daysBetweenDates(startDate, endDate)) / 365;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
        
    };
    
    cdLib.calculatingTerm = function( interest, capital, rate ){
        /*
         *   FORMULA:
         *      (Interest * 365) / (Capital * rate)
         *   INPUT:
         *   - capital = Numeric
         *   - rate = In percentage 
         *   - interest = Numeric
         *   OUTPUT:
         *   - Term days
         */
        try{
            if(isEmptyObject(interest) || isEmptyObject(capital) || isEmptyObject(rate)){
                throw new UserException('INVALID DATA');
            }
            
            return (interest*365) / (capital*(rate/100));
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    };
    
    cdLib.calculatingRate = function( interest, capital, term ){
        /*
         *   FORMULA:
         *       (Interest * 365) / (Capital * term)
         *    INPUT:
         *    - interest = Numeric
         *    - capital = Numeric 
         *    - term = Days within the period
         
         *    OUTPUT:
         *    - Rate in percentage
        */
        try{
            if(isEmptyObject(interest) || isEmptyObject(capital) || isEmptyObject(term)){
                throw new UserException('INVALID DATA');
            }
            
            return ((interest * 365)/(capital*term)) * 100;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    };
    
    cdLib.calculatingRateDates = function( interest, capital, startDate, endDate ){
        /*
         *   FORMULA:
         *       (Interest * 365) / (Capital * term)
         *    INPUT:
         *    - interest = Numeric
         *    - capital = Numeric 
         *    - term = Days within the period
         *    - startDate = Start date in Date format
         *    - endDate = End date in Date format
         *    OUTPUT:
         *    - Rate in percentage
        */
        try{
            if(isEmptyObject(interest) || isEmptyObject(capital) || isEmptyObject(startDate) || isEmptyObject(endDate)){
                throw new UserException('INVALID DATA');
            }
            
            return ((interest * 365)/(capital*cdLib.daysBetweenDates(startDate, endDate))) * 100;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    };
    
    cdLib.calculatingCapital = function( interest, rate, term ){
        /*
        *    FORMULA:
        *       (Interest * 365) / (Rate * Term)  
        *    INPUT:
        *    - interest = Numeric
        *    - rate = In percentage 
        *    - term = Days within the period
        *    OUTPUT:
        *    - Capital
        */
        try{
            if(isEmptyObject(interest) || isEmptyObject(rate) || isEmptyObject(term)){
                throw new UserException('INVALID DATA');
            }
            
            return ((interest * 365)/((rate/100) * term));
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    };
    
    cdLib.calculatingCapitalDates = function( interest, rate, startDate, endDate ){
        /*
        *    FORMULA:
        *       (Interest * 365) / (Rate * Term)  
        *    INPUT:
        *    - interest = Numeric
        *    - rate = In percentage 
        *    - term = Days within the period
        *    OUTPUT:
        *    - Capital
        */
        try{
            if(isEmptyObject(interest) || isEmptyObject(rate) || isEmptyObject(startDate)|| isEmptyObject(endDate)){
                throw new UserException('INVALID DATA');
            }
            
            return ((interest * 365)/((rate/100) * cdLib.daysBetweenDates(startDate, endDate)));
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    // Inverstment Founds
    cdLib.profit = function( inverstment, performance, days ){
        /*
        * Get the annualised yield of an Inverstment Found
        *    FORMULA:
        *       ((Final Value / Initial Value)^(365/days))-1  
        *    INPUT:
        *    - inverstment = Numeric
        *    - performance = Numeric
        *    - days = Days within the period
        *    OUTPUT:
        *    - Profit
        */
        try{
            if(isEmptyObject(inverstment) || isEmptyObject(performance) || isEmptyObject(days)){
                throw new UserException('INVALID DATA');
            }
            
            return (Math.pow((performance/inverstment),(365/days)))-1;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    cdLib.profitDates = function( inverstment, performance, startDate, endDate ){
        /*
        * Get the annualised yield of an Inverstment Found
        *    FORMULA:
        *       ((Final Value / Initial Value)^(365/days))-1  
        *    INPUT:
        *    - inverstment = Numeric
        *    - performance = Numeric
        *    - startDate = Start date in Date format
        *    - endDate = End date in Date format
        *    OUTPUT:
        *    - Profit
        */
        try{
            if(isEmptyObject(inverstment) || isEmptyObject(performance) || isEmptyObject(startDate) || isEmptyObject(endDate)){
                throw new UserException('INVALID DATA');
            }
            
            return (Math.pow((performance/inverstment),(365/cdLib.daysBetweenDates(startDate, endDate))))-1;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    cdLib.performance = function( inverstment, profit, days ){
        /*
        * Get the annualised yield of an Inverstment Found
        *    FORMULA:
        *       ((365/days)√((Profit/100)+1))*Initial Value
        *    INPUT:
        *    - inverstment = Numeric
        *    - profit = In percentage
        *    - days = Days within the period
        *    OUTPUT:
        *    - Performance
        */
        try{
            if(isEmptyObject(inverstment) || isEmptyObject(profit) || isEmptyObject(days)){
                throw new UserException('INVALID DATA');
            }
            
            return nthRoot((profit/100)+1,(365/days))*inverstment;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    cdLib.performanceDates = function( inverstment, profit, startDate, endDate ){
        /*
        * Get the annualised yield of an Inverstment Found
        *    FORMULA:
        *       ((365/days)√((Profit/100)+1))*Initial Value
        *    INPUT:
        *    - inverstment = Numeric
        *    - profit = In percentage
        *    - startDate = Start date in Date format
        *    - endDate = End date in Date format
        *    OUTPUT:
        *    - Performance
        */
        try{
            if(isEmptyObject(inverstment) || isEmptyObject(profit) || isEmptyObject(startDate) || isEmptyObject(endDate)){
                throw new UserException('INVALID DATA');
            }
            return nthRoot((profit/100)+1,(365/cdLib.daysBetweenDates(startDate, endDate)))*inverstment;
            
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    cdLib.inverstment = function( performance, profit, days ){
        /*
        * Get the annualised yield of an Inverstment Found
        *    FORMULA:
        *       (Final Value/((365/days)√((Profit/100)+1)))
        *    INPUT:
        *    - performance = Numeric
        *    - profit = In percentage
        *    - days = Days within the period
        *    OUTPUT:
        *    - Inverstment
        */
        try{
            if(isEmptyObject(performance) || isEmptyObject(profit) || isEmptyObject(days)){
                throw new UserException('INVALID DATA');
            }
            
            return performance/(nthRoot((profit/100)+1,(365/days)))
            
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    cdLib.inverstmentDates = function( performance, profit, startDate, endDate ){
        /*
        * Get the annualised yield of an Inverstment Found
        *    FORMULA:
        *       (Final Value/((365/days)√((Profit/100)+1)))
        *    INPUT:
        *    - performance = Numeric
        *    - profit = In percentage
        *    - startDate = Start date in Date format
        *    - endDate = End date in Date format
        *    OUTPUT:
        *    - Inverstment
        */
        try{
            if(isEmptyObject(performance) || isEmptyObject(profit) || isEmptyObject(startDate) || isEmptyObject(endDate)){
                throw new UserException('INVALID DATA');
            }
            
            return performance/(nthRoot((profit/100)+1,(365/cdLib.daysBetweenDates(startDate, endDate))))
            
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    }
    
    cdLib.daysBetweenDates = function( start, end ){
       /*
        *    INPUT:
        *    - start = Start date
        *    - end = End date 
        *    OUTPUT:
        *    - Number of days
        */ 
        try{
            if(isEmptyObject(start) || isEmptyObject(end)){
                throw new UserException('INVALID DATA');
            }
            
            return Math.floor(( Date.parse(end) - Date.parse(start) ) / 86400000) - 2;
        }catch(err){
            console.error("CDLIB " + err.message);
            console.trace();
            return 0;
        }
    };
    
    function isEmptyObject(item){
        if(typeof item === 'undefined' || item === null || item === ''){
            return true;
        }else{
            return false;
        }
    }
    
    // Get root extracting 
    function nthRoot(x, n) {
      if(x < 0 && n%2 != 1) return NaN; // Not well defined
      return (x < 0 ? -1 : 1) * Math.pow(Math.abs(x), 1/n);
    }   
    
    function UserException(message) {
       this.message = message;
       this.name = "UserException";
    }

})(window.cdLib = window.cdLib || {}, jQuery);