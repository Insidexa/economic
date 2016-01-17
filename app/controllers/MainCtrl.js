app.controller('MainCtrl', ['$scope', function ($scope) {

    $scope.m = math;

    /**
     *
     * @type {Array}
     */
    $scope.energys = [];


    /**
     *
     * @type {Array}
     */
    $scope.products = [];


    /**
     * @name Матеріальні витрати
     *
     * @type {number}
     */
    $scope.materialCosts = 0.00;


    /**
    @name Електроенергія
     */
    $scope.energysCosts = 0.00;


    /**
     * @name Єдиний соціальний внесок
     *
     * @formula ((wages + additionSalary) * 37.28) / 100
     *
     * @type {number}
     */
    $scope.social = 0.00;


    /**
     * @name тарифна ставка
     *
     * @formula salary / (numWorkDaysMonths * workDay)
     *
     * @type {number}
     */
    $scope.tariff = 0.00;


    /**
     * @name заробітну плату програміста
     *
     * @formula tariff * workHours
     *
     * @type {number}
     */
    $scope.wages = 0.00;


    /**
     * @name Додаткова заробітна плата
     *
     * @formula wages * 12 / 100
     *
     * @type {number}
     */
    $scope.additionSalary = 0.00;


    /**
     * @name Витрати на утримання обладнання
     *
     * @formula wages * 0.3
     *
     * @type {number}
     */
    $scope.costMaintainingEquipment = 0.00;


    /**
     * @name Загальновиробничі витрати
     *
     * @formula wages * 0.28
     *
     * @type {number}
     */
    $scope.totalExpenditures = 0.00;


    /**
     * @name виробнича собівартість
     *
     * @formula totalExpenditures + costMaintainingEquipment + additionSalary + wages + energysCosts + social
     *
     * @type {number}
     */
    $scope.totalEconomicCosts = 0.00;


    /**
     * @name позавиробничих витрат
     *
     * @formula totalEconomicCosts * 0.3
     *
     * @type {number}
     */
    $scope.nonManufacturingCosts = 0.00;


    /**
     *
     */
    $scope.initCosts = function () {

        $scope.materialCosts = 0.0;
        $scope.energysCosts = 0.0;

        for (var product in $scope.products) {
            $scope.materialCosts += $scope.products[product].price;
        }

        for (var energy in $scope.energys) {
            $scope.energysCosts += $scope.energys[energy].price;
        }

        $scope.articlesCosts();

    };

    /**
     *
     */
    $scope.articlesCosts = function () {

        $scope.tariff = $scope._r($scope.salary) / ($scope.numWorkDaysMonths * $scope.workDay);
        $scope.wages = $scope.tariff * $scope.workHours;
        $scope.additionSalary = $scope.wages * 12 / 100;
        $scope.social = (($scope.wages + $scope.additionSalary) * 37.28) / 100;

        $scope.costMaintainingEquipment = $scope.wages * 0.3;

        $scope.totalExpenditures = $scope.wages * 0.28;

        $scope.totalEconomicCosts =
              $scope.totalExpenditures
            + $scope.costMaintainingEquipment
            + $scope.additionSalary
            + $scope.wages
            + $scope.energysCosts
            + $scope.social;

        $scope.nonManufacturingCosts = $scope.totalEconomicCosts * 0.3;
    };

    /**
     *
     * @param index
     * @param product
     */
    $scope.editProduct = function (index, product) {
        $scope.products[index].name = product.name;
        $scope.products[index].count = product.count;
        $scope.products[index].countOne = product.countOne;
        $scope.products[index].price = product.count * product.countOne;
        $scope.products[index].editable = false;

        $scope.initCosts();
    };
    /**
     *
     */
    $scope.addProduct = function () {
        var nextId = ($scope.products.length == 0) ? 0 : $scope.products[$scope.products.length - 1].id;

        var price = $scope.count * $scope.countOne;

        $scope.products.push({
            'id': nextId,
            'name': $scope.name,
            'count': $scope.count,
            'countOne': $scope.countOne,
            'price': price,
            'editable': false
        });

        $scope.name = null;
        $scope.count = null;
        $scope.countOne = null;
        $scope.price = null;
        $scope.editable = null;

        $scope.materialCosts += price;
    };
    /**
     *
     * @param index
     */
    $scope.removeProduct = function (index) {
        $scope.materialCosts -= $scope.products[index].price;
        $scope.products.splice(index, 1);
    };

    /**
     *
     * @param index
     */
    $scope.removeEnergy = function (index) {
        $scope.energysCosts -= $scope.energys[index].price;
        $scope.energys.splice(index, 1);
    };
    /**
     *
     */
    $scope.addEnergy = function () {
        var nextId = ($scope.energys.length == 0) ? 0 : $scope.energys[$scope.energys.length - 1].id;
        var price = $scope.power * $scope.durationWork * $scope.priceEnergy;
        var energy = {
            'id': nextId,
            'name': $scope.name,
            'power': $scope.power,
            'durationWork': $scope.durationWork,
            'priceEnergy': $scope.priceEnergy,
            'price': price,
            'editable': false
        };

        $scope.energys.push(energy);

        $scope.power = null;
        $scope.name = null;
        $scope.durationWork = null;
        $scope.priceEnergy = null;
        $scope.price = null;

        $scope.energysCosts += price;
    };

    $scope._r = function (value) {
        return Math.round(parseFloat(value) * 100) / 100;
    };

}]);