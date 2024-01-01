var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var DiligenceController = /** @class */ (function () {
            function DiligenceController($scope, $timeout, $window, diligenceService) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$window = $window;
                this.diligenceService = diligenceService;
                this.InitializeCommands = function (agentId, groupId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.GroupID = groupId;
                    _this.$scope.isExistData = true;
                    _this.$scope.CurrentDate = new Date();
                    $('#loader').show();
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.diligenceService.GetAMLPreCheck(request).then(function (result) {
                        if (result != null) {
                            _this.$scope.PreCheckCollection = result;
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        }
                        else {
                            _this.$scope.isExistData = false;
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        }
                    });
                };
                this.GetAMLPreCheckList = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.diligenceService.GetAMLPreCheck(request).then(function (result) {
                        if (result != null) {
                            _this.$scope.PreCheckCollection = result;
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        }
                        else {
                            _this.$scope.isExistData = false;
                        }
                    });
                };
                this.GetRelatedClient = function (id) {
                    var request = {};
                    request.ParentId = id;
                    _this.diligenceService.GetRelatedPreCheckList(request).then(function (result) {
                        _this.$scope.PreCheckClientCollection = result;
                        if (!_this.$scope.PreCheckClientCollection.IsNull) {
                            $('#relatedClient').modal('show');
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        }
                    });
                };
                this.EditDiligence = function (id) {
                    _this.$window.location.pathname = "/Diligence/Edit/" + id;
                };
                this.ViewReport = function (url) {
                    _this.$window.open(url, "popup");
                };
                this.SendToCustomer = function (report) {
                    $('#loader').show();
                    var request = {};
                    request.Id = report.Id;
                    request.Email = report.Email;
                    request.Name = report.Name;
                    request.AgentId = report.AgentId;
                    _this.diligenceService.GetSignature(request).then(function (result) {
                        report.NoOfEmailSent = result.EmailCount;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                };
                this.GetDiligenceCustomerList = function (Name, IdNumber, Id, Isindividual) {
                    var request = {};
                    request.Id = Id;
                    request.Name = Name;
                    _this.$scope.PreferredName = Name;
                    _this.$scope.IdNumber = IdNumber;
                    request.IsIndividual = Isindividual;
                    _this.$scope.IsIndividual = Isindividual;
                    $('#loader').show();
                    _this.diligenceService.GetBasictDiligenceCustomers(request).then(function (result) {
                        if (result.IsError) {
                            alert(result.ErrorMessage);
                        }
                        else {
                            _this.$scope.DiligenceCustomers = result;
                            if (_this.$scope.DiligenceCustomers.IndividualCollection.length != 0 || _this.$scope.DiligenceCustomers.EntityCollection.length != 0) {
                                _this.$scope.amlMessage = true;
                            }
                            else {
                                _this.$scope.amlMessage = false;
                            }
                            _this.CreateDiligencePdf(Id);
                            //$('.spinner').fadeOut();
                            //$('.preloader-area').fadeOut();
                        }
                    });
                };
                this.CreateDiligencePdf = function (Id) {
                    _this.$timeout(function () {
                        var request = {};
                        request.AgentId = _this.$scope.AgentId;
                        request.Id = Id;
                        if (_this.$scope.amlMessage == false) {
                            request.HtmlString = $("#diligence_empty_report").html();
                        }
                        else {
                            request.HtmlString = $("#diligence_report").html();
                        }
                        _this.diligenceService.CreateDiligencePdf(request).then(function (result) {
                            _this.GetAMLPreCheckList();
                        });
                    }, 1000);
                };
                this.GetReport = function (Name, Date) {
                    $('#amlMessage').modal('show');
                    //this.$scope.amlMessage = true;
                    //this.$scope.PreferredName = Name;
                    //this.$scope.CurrentDate = Date;
                };
                this.CreateDiligence = function () {
                    _this.GetAMLCreditBalance();
                    $('#startupInfo').modal('show');
                };
                this.GetAMLCreditBalance = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.diligenceService.CheckAmlPricing(request).then(function (result) {
                        _this.$scope.AmlPricing = result;
                    });
                };
                this.UpdateAmlCreditBalance = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.AvailableBalance = _this.$scope.AmlPricing.AvailableBalance - 1;
                    request.Id = _this.$scope.AmlPricing.Id;
                    _this.diligenceService.UpdateAmlCreditBalance(request).then(function (result) {
                        if (result.IsError) {
                            result.ErrorMessage;
                        }
                        else {
                            _this.$window.location.pathname = "/Diligence/Create/";
                        }
                    });
                };
                $scope.Init = this.InitializeCommands;
                $scope.ViewReport = this.ViewReport;
                $scope.EditDiligence = this.EditDiligence;
                $scope.GetRelatedClient = this.GetRelatedClient;
                $scope.SendToCustomer = this.SendToCustomer;
                $scope.CreateDiligence = this.CreateDiligence;
                $scope.UpdateAmlCreditBalance = this.UpdateAmlCreditBalance;
                $scope.GetReport = this.GetReport;
                this.$scope.PreferredName = "";
                this.$scope.DiligenceCustomers = {};
                this.$scope.AmlPricing = {};
                this.$scope.CustomerCollection = [];
                this.$scope.loader = "";
                this.$scope.GetDiligenceCustomerList = this.GetDiligenceCustomerList;
            }
            DiligenceController.$inject = ['$scope', '$timeout', '$window', 'DiligenceService'];
            return DiligenceController;
        }());
        diligence.DiligenceController = DiligenceController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.diligence.controller.js.map