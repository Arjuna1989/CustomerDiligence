var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var SyncController = /** @class */ (function () {
            function SyncController($scope, diligenceService) {
                this.$scope = $scope;
                this.diligenceService = diligenceService;
                $scope.Service = diligenceService;
            }
            SyncController.$inject = ['$scope', 'DiligenceService'];
            return SyncController;
        }());
        diligence.SyncController = SyncController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.syncdiligence.controller.js.map