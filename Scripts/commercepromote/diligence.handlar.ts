/// <reference path="../../scripts/reference.ts" />

module DiligenceWebClient {

    export class DiligenceWebClientHandler {
        private DiligenceApp: ng.IModule;
        private ContentElement: JQuery;

        constructor(token: string) {
            this.Initialize(token);
        }


        public Initialize(token: string): void {
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
        }
    }
}