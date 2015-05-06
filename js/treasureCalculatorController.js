angular.module('pirates')
    .controller('treasureCalculatorController', TreasureCalculatorController)
    
TreasureCalculatorController.$inject = ['treasureCalculatorService'];

function TreasureCalculatorController(treasureCalculatorService) {
    var vm = this;
   
    vm.numberOfPirates = 3;
    vm.calculate = _calculate;
    vm.results = [];

    function _calculate() {
        if (!vm.numberOfPirates) {
            return;
        }
        else {
            // causes the spinner to show in the list
            var newLength = vm.results.push({ dataLoading: true});
            
            if (vm.results.length > 10) {
                vm.results.splice(0, 1);
                newLength--;
            }
            
            treasureCalculatorService.getNumberOfCoins(vm.numberOfPirates)
                .then(function(result) {
                    vm.results[newLength - 1] = result;   
                }, function(err) {
                    vm.results[newLength - 1] = { error: true, errorMsg: "There was an error running the calculation." };
                });
        }
    }
}