angular.module('pirates')
    .controller('treasureCalculatorController', TreasureCalculatorController)
    
TreasureCalculatorController.$inject = ['treasureCalculatorService'];

function TreasureCalculatorController(treasureCalculatorService) {
    var vm = this;
   
    vm.numberOfPirates = 3;
    vm.calculate = _calculate;
    vm.results = [];
    
    // this feels kind of hacky, but for each request we push an empty object into dataLoading
    // so that we can display a spinner for each separate request. This plays nice
    // with ng-repeat
    vm.dataLoading = [];
    
    function _calculate() {
        vm.dataLoading.push({});
        
        treasureCalculatorService.getNumberOfCoins(vm.numberOfPirates)
            .then(function(result) {
                vm.dataLoading.pop();
                vm.results.push(result);
                
                if (vm.results.length > 10) {
                    vm.result.splice(0, 1);
                }
            }, function(err) {
                vm.dataLoading.pop();
                alert('There was an error calculating the coins!')
            });
    }
}