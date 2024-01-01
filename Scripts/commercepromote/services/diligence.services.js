var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var services;
(function (services) {
    var diligence;
    (function (diligence) {
        'use strict';
        var DiligenceService = /** @class */ (function (_super) {
            __extends(DiligenceService, _super);
            function DiligenceService($http) {
                var _this = _super.call(this, $http) || this;
                _this.executeQueryServiceUrl = 'api/Services/';
                return _this;
            }
            DiligenceService.prototype.GetFullSingle = function (request) {
                return this.ServiceRequest('/api/user/GetFullSingle', request);
            };
            DiligenceService.prototype.CreateHtmlPdf = function (request) {
                return this.ServiceRequest('/api/Diligent/CreateDiligentReport', request);
            };
            DiligenceService.prototype.DraftDiligentReport = function (request) {
                return this.ServiceJsonRequest('/api/Diligent/DraftDiligentReport', request);
            };
            DiligenceService.prototype.DraftExsitingDiligentReport = function (request) {
                return this.ServiceJsonRequest('/api/Diligent/DraftExsitingDiligentReport', request);
            };
            DiligenceService.prototype.SendMail = function (request) {
                return this.ServiceRequest('/api/Diligent/CreateDiligenceEmail', request);
            };
            DiligenceService.prototype.GetDiligenceCustomers = function (request) {
                return this.ServiceRequest('/api/Diligent/GetDiligenceCustomers', request);
            };
            DiligenceService.prototype.GetBasictDiligenceCustomers = function (request) {
                return this.ServiceRequest('/api/Diligent/GetBasictDiligenceCustomers', request);
            };
            DiligenceService.prototype.CreateCustomerDiligenceUserAml = function (request) {
                return this.ServiceRequest('/api/Diligent/CreateCustomerDiligenceUserAml', request);
            };
            DiligenceService.prototype.GetUsersByAgentId = function (request) {
                return this.ServiceRequest('/api/Diligent/GetUsersByAgentId', request);
            };
            DiligenceService.prototype.GetAllReports = function (request) {
                return this.ServiceRequest('/api/Diligent/GetAllReports', request);
            };
            DiligenceService.prototype.GetAllUsers = function (request) {
                return this.ServiceRequest('/api/Diligent/GetAllUsers', request);
            };
            DiligenceService.prototype.DeleteUser = function (request) {
                return this.ServiceRequest('/api/Diligent/DeletediligentUser', request);
            };
            DiligenceService.prototype.CheckAmlPricing = function (request) {
                return this.ServiceRequest('/api/Diligent/CheckAmlPricing', request);
            };
            DiligenceService.prototype.UpdateAmlCreditBalance = function (request) {
                return this.ServiceRequest('/api/Diligent/UpdateAMLCreditBalance', request);
            };
            DiligenceService.prototype.GetAMLPreCheck = function (request) {
                return this.ServiceRequest('/api/Diligent/GetAMLPreCheckList', request);
            };
            DiligenceService.prototype.GetSinglePreCheckList = function (request) {
                return this.ServiceRequest('/api/Diligent/GetSinglePreCheckList', request);
            };
            DiligenceService.prototype.GetSinglePreCheck = function (request) {
                return this.ServiceRequest('/api/Diligent/GetSinglePreCheck', request);
            };
            DiligenceService.prototype.GetAgent = function (request) {
                return this.ServiceRequest('/api/Diligent/GetSingleAgent', request);
            };
            DiligenceService.prototype.GetRelatedPreCheckList = function (request) {
                return this.ServiceRequest('/api/Diligent/GetRelatedPreCheckList', request);
            };
            DiligenceService.prototype.UpdateSignature = function (request) {
                return this.ServiceRequest('/api/Diligent/UpdateSignature', request);
            };
            DiligenceService.prototype.GetSignature = function (request) {
                return this.ServiceRequest('/api/Diligent/GetSignature', request);
            };
            DiligenceService.prototype.GetEmailCount = function (request) {
                return this.ServiceRequest('/api/Diligent/GetEmailCount', request);
            };
            DiligenceService.prototype.GetPropertyLocation = function (request) {
                return this.ServiceRequest('/api/Diligent/GetPropertyLocation', request);
            };
            DiligenceService.prototype.UpdateEmailInPreCheck = function (request) {
                return this.ServiceRequest('/api/Diligent/UpdateAnnexAInAmlPreCheck', request);
            };
            DiligenceService.prototype.UpdateDrafttoPdf = function (request) {
                return this.ServiceRequest('/api/Diligent/UpdateDrafttoPdf', request);
            };
            DiligenceService.prototype.SaveCustomer = function (request) {
                return this.ServiceRequest('/api/Diligent/SaveCustomer', request);
            };
            DiligenceService.prototype.GetSinglePreCheckCustomer = function (request) {
                return this.ServiceRequest('/api/Diligent/GetSinglePreCheck', request);
            };
            DiligenceService.prototype.GetReportId = function (request) {
                return this.ServiceRequest('/api/Diligent/GetReportId', request);
            };
            DiligenceService.prototype.CreateDiligencePdf = function (request) {
                return this.ServiceRequest('/api/Diligent/CreateDiligenceResultPdf', request);
            };
            DiligenceService.prototype.SendCDDReportToAngency = function (request) {
                return this.ServiceRequest('/api/Diligent/SendCDDReportToAngency', request);
            };
            DiligenceService.prototype.SendAnnexAReportToCustomer = function (request) {
                return this.ServiceRequest('/api/Diligent/SendAnnexAReportToCustomer', request);
            };
            DiligenceService.$inject = ['$http'];
            return DiligenceService;
        }(services.BaseService));
        diligence.DiligenceService = DiligenceService;
    })(diligence = services.diligence || (services.diligence = {}));
})(services || (services = {}));
//# sourceMappingURL=diligence.services.js.map