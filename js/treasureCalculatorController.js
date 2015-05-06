angular.module('pirates')
    .controller('treasureCalculatorController', TreasureCalculatorController)
    
TreasureCalculatorController.$inject = ['treasureCalculatorService'];

function TreasureCalculatorController(treasureCalculatorService) {
    var vm = this;
    
    
    vm.numberOfPirates = 3;
    vm.calculate = _calculate;
    vm.results = [];
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