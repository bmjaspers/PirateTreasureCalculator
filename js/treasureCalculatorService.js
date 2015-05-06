angular.module('pirates')
    .factory('treasureCalculatorService', TreasureCalculatorService);

TreasureCalculatorService.$inject = ['$http', '$q', '$localStorage']
    
 function TreasureCalculatorService ($http, $q, $localStorage) {
    return {
            getNumberOfCoins: _getNumberOfCoins
    }; 

    function _getNumberOfCoins(numberOfPirates) {
        var d = $q.defer();
        
        // if we have the result in cache, copy it to a new object and return it
        // we want the user to a new result for each request
        var cached = $localStorage.getObject(numberOfPirates);
        
        if (cached['numberOfCoins']) {
            d.resolve(angular.copy(cached));
        }
        else {
            $http.get('http://pirate.azurewebsites.net/api/Pirate/' + numberOfPirates).success(function(data){
                var result = { numberOfPirates: numberOfPirates, numberOfCoins: data};
                
                // The returned value isn't expected to change, so let's stuff it in
                // localStorage for returning users
                $localStorage.setObject(numberOfPirates, result);
                
                d.resolve(result);
            })
            .error(function(err) {
                d.reject(err);
            });
        }
        
        return d.promise;
    }
 }