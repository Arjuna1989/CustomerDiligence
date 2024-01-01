module controllers.diligence {
    'use strict';

    export interface IDiligenceScope {
        Service: any;
    }

    export class SyncController {
        static $inject = ['$scope', 'DiligenceService'];

        constructor(private $scope: IDiligenceScope, private diligenceService: services.diligence.DiligenceService) {
            $scope.Service = diligenceService;
        }
    }
}