var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var EditDiligenceController = /** @class */ (function () {
            function EditDiligenceController($scope, diligenceService) {
                var _this = this;
                this.$scope = $scope;
                this.diligenceService = diligenceService;
                this.InitializeCommands = function (agentId, id) {
                    _this.$scope.AgentId = agentId;
                    $('#loader').show();
                    var request = {};
                    _this.$scope.AmlGroupId = request.Id = id;
                    _this.diligenceService.GetSinglePreCheckList(request).then(function (result) {
                        _this.$scope.CustomerCollection = result;
                        if (result[0].DraftReport != null) {
                            _this.$scope.CustomerDiligent = result[0].DraftReport;
                        }
                        else {
                            _this.$scope.CustomerDiligent.Q21 = false;
                            _this.$scope.CustomerDiligent.Q22 = false;
                            _this.$scope.CustomerDiligent.Q23 = false;
                            _this.$scope.CustomerDiligent.Q24A = false;
                            _this.$scope.CustomerDiligent.Q24B = false;
                            _this.$scope.CustomerDiligent.Q24C = false;
                            _this.$scope.CustomerDiligent.Q24D = false;
                            _this.$scope.CustomerDiligent.Q24E = false;
                            _this.$scope.CustomerDiligent.Q24F = false;
                            _this.$scope.CustomerDiligent.Q24G = false;
                            _this.$scope.CustomerDiligent.Q24H = false;
                            _this.$scope.CustomerDiligent.Q24I = false;
                            _this.$scope.CustomerDiligent.Q24J = false;
                            _this.$scope.CustomerDiligent.Q31A = false;
                            _this.$scope.CustomerDiligent.Q31B = false;
                            _this.$scope.CustomerDiligent.Q32A = false;
                            _this.$scope.CustomerDiligent.Q32B = false;
                            _this.$scope.CustomerDiligent.Q33A = false;
                            _this.$scope.CustomerDiligent.Q33B = false;
                            _this.$scope.CustomerDiligent.Q34A = false;
                            _this.$scope.CustomerDiligent.Q34B = false;
                            _this.$scope.CustomerDiligent.Q35A = false;
                            _this.$scope.CustomerDiligent.Q35B = false;
                            _this.$scope.CustomerDiligent.Q35C = false;
                            _this.$scope.CustomerDiligent.Q36A = false;
                            _this.$scope.CustomerDiligent.Q36B = false;
                            _this.$scope.CustomerDiligent.Q21A = "";
                            _this.$scope.CustomerDiligent.Q22A = "";
                            _this.$scope.CustomerDiligent.Q23A = "";
                            _this.$scope.CustomerDiligent.Q24AA = "";
                            _this.$scope.CustomerDiligent.Q24BA = "";
                            _this.$scope.CustomerDiligent.Q24CA = "";
                            _this.$scope.CustomerDiligent.Q24DA = "";
                            _this.$scope.CustomerDiligent.Q24EA = "";
                            _this.$scope.CustomerDiligent.Q24FA = "";
                            _this.$scope.CustomerDiligent.Q24GA = "";
                            _this.$scope.CustomerDiligent.Q24HA = "";
                            _this.$scope.CustomerDiligent.Q24IA = "";
                            _this.$scope.CustomerDiligent.Q24JA = "";
                            _this.$scope.CustomerDiligent.Q31AA = "";
                            _this.$scope.CustomerDiligent.Q31BA = "";
                            _this.$scope.CustomerDiligent.Q32AA = "";
                            _this.$scope.CustomerDiligent.Q32BA = "";
                            _this.$scope.CustomerDiligent.Q33AA = "";
                            _this.$scope.CustomerDiligent.Q33BA = "";
                            _this.$scope.CustomerDiligent.Q34AA = "";
                            _this.$scope.CustomerDiligent.Q34BA = "";
                            _this.$scope.CustomerDiligent.Q35AA = "";
                            _this.$scope.CustomerDiligent.Q35BA = "";
                            _this.$scope.CustomerDiligent.Q35CA = "";
                            _this.$scope.CustomerDiligent.Q36AA = "";
                            _this.$scope.CustomerDiligent.Q36BA = "";
                        }
                        _this.$scope.DiligenceReportId = result[0].ReportId;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                    var agentRequest = {};
                    agentRequest.AgentId = agentId;
                    _this.diligenceService.GetAgent(agentRequest).then(function (result) {
                        _this.$scope.SalesPersonDeclaration.NameOfSalesPerson = result.DisplayName;
                        _this.$scope.SalesPersonDeclaration.RegistrationOfSalesPerson = result.IDNumber;
                        _this.$scope.SalesPersonDeclaration.NameofEstateAgent = result.AgencyName;
                        _this.$scope.SalesPersonDeclaration.LicenceofEstateAgent = result.AgencyLicence;
                        _this.$scope.SalesPersonDeclaration.ChecklistCompletingDate = new Date();
                        _this.$scope.SalesPersonDeclaration.DateofEstateAgentSubmitting = new Date();
                    });
                };
                this.DraftForm = function () {
                    $('#loader').show();
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.UserId = _this.$scope.UserId;
                    request.PropertyName = _this.$scope.Common.PropertyName;
                    request.ParentPreCheckId = _this.$scope.AmlGroupId;
                    request.IsDraft = true;
                    request.DraftReport = _this.$scope.CustomerDiligent;
                    request.ReportId = _this.$scope.DiligenceReportId;
                    _this.diligenceService.DraftExsitingDiligentReport(request).then(function (result) {
                        if (!result.IsError) {
                            _this.$scope.DiligenceReportId = result.ReportId;
                            _this.$scope.IsDraft = true;
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        }
                    });
                };
                this.SaveBasicForm = function () {
                    if (_this.$scope.CustomerDiligent.Q21 || _this.$scope.CustomerDiligent.Q22 || _this.$scope.CustomerDiligent.Q23 || _this.$scope.CustomerDiligent.Q24A
                        || _this.$scope.CustomerDiligent.Q24B || _this.$scope.CustomerDiligent.Q24C || _this.$scope.CustomerDiligent.Q24D || _this.$scope.CustomerDiligent.Q24E
                        || _this.$scope.CustomerDiligent.Q24F || _this.$scope.CustomerDiligent.Q24G || _this.$scope.CustomerDiligent.Q24H || _this.$scope.CustomerDiligent.Q24I
                        || _this.$scope.CustomerDiligent.Q24J) {
                        _this.$scope.IsEnableDetailSection = true;
                        _this.$scope.IsSaveBasciForm = true;
                    }
                    else {
                        _this.$scope.IsEnableDetailSection = false;
                        var element = document.getElementById("widget-grid-1");
                        element.scrollIntoView();
                    }
                    _this.$scope.IsShowAgentForm = true;
                };
                this.CreatePdf = function () {
                    $('#loader').show();
                    if (_this.$scope.DiligenceReportId == 0) {
                        var request = {};
                        if (_this.$scope.IsEnableDetailSection) {
                            request.HtmlString = $('#sec_full').html();
                        }
                        else {
                            request.HtmlString = $('#sec_top').html();
                        }
                        request.AgentId = _this.$scope.AgentId;
                        request.UserId = _this.$scope.UserId;
                        request.ParentPreCheckId = _this.$scope.AmlGroupId;
                        _this.diligenceService.CreateHtmlPdf(request).then(function (result) {
                            if (result.IsError) {
                                _this.$scope.Ischecked = false;
                            }
                            else {
                                _this.$scope.Ischecked = true;
                                _this.$scope.Pdf = result;
                                _this.$scope.Mail.PdfUrl = result.LocationUrl;
                                _this.$scope.Mail.ReportId = result.ReportId;
                                _this.$scope.IsSaved = true;
                            }
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        });
                    }
                    else {
                        var updaterequest = {};
                        updaterequest.Id = _this.$scope.DiligenceReportId;
                        updaterequest.AgentId = _this.$scope.AgentId;
                        updaterequest.UserId = _this.$scope.UserId;
                        if (_this.$scope.IsEnableDetailSection) {
                            updaterequest.HtmlString = $('#sec_full').html();
                        }
                        else {
                            updaterequest.HtmlString = $('#sec_top').html();
                        }
                        _this.diligenceService.UpdateDrafttoPdf(updaterequest).then(function (result) {
                            if (result.IsError) {
                                _this.$scope.Ischecked = false;
                            }
                            else {
                                _this.$scope.Ischecked = true;
                                _this.$scope.Mail.PdfUrl = result.LocationUrl;
                                _this.$scope.IsSaved = true;
                            }
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        });
                    }
                };
                this.SubmitDocument = function () {
                    _this.CreatePdf();
                };
                this.SendClientMail = function (request) {
                    request.AgentId = _this.$scope.AgentId;
                    request.UserId = _this.$scope.UserId;
                    _this.diligenceService.SendMail(request).then(function (result) {
                        if (result.IsError) {
                            _this.$scope.IsNotSent = true;
                        }
                        else {
                            _this.$scope.IsSent = true;
                            _this.$scope.Mail = {};
                        }
                    });
                };
                this.ProceedCDD = function () {
                    _this.$scope.IsProceed = true;
                    var element = document.getElementById("widget-grid");
                    element.scrollIntoView();
                };
                $scope.Service = diligenceService;
                $scope.CustomerDiligent = {};
                $scope.CreatePdf = {};
                $scope.Pdf = {};
                $scope.Mail = {};
                $scope.AmlPricing = {};
                $scope.SalesPersonDeclaration = {};
                $scope.Common = {};
                this.$scope.Init = this.InitializeCommands;
                this.$scope.SaveBasicForm = this.SaveBasicForm;
                this.$scope.SubmitDocument = this.SubmitDocument;
                this.$scope.SendMail = this.SendClientMail;
                this.$scope.DraftForm = this.DraftForm;
                this.$scope.ProceedCDD = this.ProceedCDD;
                $scope.IsEnableDetailSection = false;
                $scope.Ischecked = false;
                this.$scope.IsAmlData = false;
                $scope.SalesPersonDetailisCollection = [];
                $scope.IsIndividual = true;
                this.$scope.SalesPersonDeclaration.Seller = false;
                this.$scope.SalesPersonDeclaration.Buyer = false;
                this.$scope.SalesPersonDeclaration.Landloard = false;
                this.$scope.SalesPersonDeclaration.Tenant = false;
                this.$scope.SalesPersonDeclaration.SignatureofSalesperson = "";
                this.$scope.CreatePdf.HtmlString = "";
                $scope.IsInvalid = false;
                $scope.IsSent = false;
                $scope.IsNotSent = false;
                this.$scope.IsDraft = false;
                this.$scope.IsSaveBasciForm = false;
                this.$scope.IsProceed = false;
            }
            EditDiligenceController.$inject = ['$scope', 'DiligenceService'];
            return EditDiligenceController;
        }());
        diligence.EditDiligenceController = EditDiligenceController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.editdiligence.controller.js.map