/// <reference path="../../scripts/reference.ts" />
var DiligenceWebClient;
(function (DiligenceWebClient) {
    var DiligenceWebClientHandler = /** @class */ (function () {
        function DiligenceWebClientHandler(token) {
            this.Initialize(token);
        }
        DiligenceWebClientHandler.prototype.Initialize = function (token) {
            try {
                this.DiligenceApp = angular.module('DiligenceApp', [])
                    .directive('dateFormat', directives.diligent.DateFormat.Factory())
                    .service('DiligenceService', services.diligence.DiligenceService)
                    .controller('UserController', controllers.diligence.UserController)
                    .controller('DiligenceController', controllers.diligence.DiligenceController)
                    .controller('CreateDiligenceController', controllers.diligence.CreateDiligenceController)
                    .controller('EditDiligenceController', controllers.diligence.EditDiligenceController)
                    .controller('SyncController', controllers.diligence.SyncController)
                    .controller('SignatureController', controllers.diligence.SignatureController)
                    .controller('EditAnnexController', controllers.diligence.EditAnnexController)
                    .controller('AnnexSignController', controllers.diligence.AnnexSignController)
                    .controller('CDDListController', controllers.diligence.CDDListController);
                //this location provider helps to read query string
                this.DiligenceApp.config(['$locationProvider', function ($locationProvider) {
                        $locationProvider.html5Mode({
                            enabled: true,
                            requireBase: false
                        });
                    }]);
                this.DiligenceApp.config(function ($httpProvider) {
                    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                });
            }
            catch (exception) {
                console.log(exception);
            }
        };
        return DiligenceWebClientHandler;
    }());
    DiligenceWebClient.DiligenceWebClientHandler = DiligenceWebClientHandler;
})(DiligenceWebClient || (DiligenceWebClient = {}));
//# sourceMappingURL=diligence.handlar.js.map