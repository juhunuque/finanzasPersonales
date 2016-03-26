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
    
    function UserException(message) {
       this.message = message;
       this.name = "UserException";
    }

})(window.cdLib = window.cdLib || {}, jQuery);