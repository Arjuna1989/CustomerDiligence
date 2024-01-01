var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var CDDListController = /** @class */ (function () {
            function CDDListController($scope, $timeout, diligentService) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.diligentService = diligentService;
                this.InitializeCommands = function (agentId, groupId) {
                    _this.$scope.AgentId = agentId;
                    _this.$scope.GroupId = groupId;
                    var request = {};
                    request.AgentId = agentId;
                    request.GroupID = groupId;
                    $('#loader').show();
                    _this.diligentService.GetAllReports(request).then(function (result) {
                        _this.$scope.CddReportCollection = result;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                };
                this.GetAnnexList = function (parentId) {
                    _this.$scope.isListClicked = true;
                    _this.$scope.DiligenceReportURL = [];
                    _this.$scope.isRelatedPreCheckListData = false;
                    var request = {};
                    request.ParentId = parentId;
                    _this.diligentService.GetRelatedPreCheckList(request).then(function (result) {
                        _this.$scope.isListClicked = false;
                        _this.$scope.RelatedPreCheckList = result;
                        for (var i = 0; i < _this.$scope.RelatedPreCheckList.length; i++) {
                            if (_this.$scope.RelatedPreCheckList[i].Id == parentId || _this.$scope.RelatedPreCheckList[i].AmlGroupId == parentId) {
                                if (_this.$scope.RelatedPreCheckList[i].DiligenceResultPdf != null) {
                                    _this.$scope.DiligenceReportURL.push(_this.$scope.RelatedPreCheckList[i].DiligenceResultPdfUrl);
                                }
                            }
                        }
                        _this.$scope.isRelatedPreCheckListData = false;
                        if (_this.$scope.DiligenceReportURL.length == 0) {
                            _this.$scope.isRelatedPreCheckListData = true;
                        }
                        $("#customerRecord").modal('show');
                    });
                };
                this.GetDiligenceList = function (parentId, Id) {
                    var element = "s" + Id;
                    document.getElementById(element).style.display = "block";
                    _this.$scope.isListClicked = true;
                    _this.$scope.DiligenceReportURL = [];
                    _this.$scope.isRelatedPreCheckListData = false;
                    console.log(_this.$scope.DiligenceReportURL.length);
                    var request = {};
                    request.ParentId = parentId;
                    _this.diligentService.GetRelatedPreCheckList(request).then(function (result) {
                        _this.$scope.isListClicked = false;
                        _this.$scope.RelatedPreCheckList = result;
                        document.getElementById(element).style.display = "none";
                        for (var i = 0; i < _this.$scope.RelatedPreCheckList.length; i++) {
                            if (_this.$scope.RelatedPreCheckList[i].Id == parentId || _this.$scope.RelatedPreCheckList[i].AmlGroupId == parentId) {
                                if (_this.$scope.RelatedPreCheckList[i].DiligenceResultPdf != null) {
                                    _this.$scope.DiligenceReportURL.push(_this.$scope.RelatedPreCheckList[i].DiligenceResultPdfUrl);
                                }
                            }
                        }
                        _this.$scope.isRelatedPreCheckListData = false;
                        if (_this.$scope.DiligenceReportURL.length == 0) {
                            _this.$scope.isRelatedPreCheckListData = true;
                        }
                    });
                };
                this.SendToCustomer = function (report) {
                    $('#loader').show();
                    var request = {};
                    request.Id = report.Id;
                    request.Email = report.Email;
                    request.Name = report.Name;
                    request.AgentId = report.AgentId;
                    _this.diligentService.GetSignature(request).then(function (result) {
                        report.NoOfEmailSent = result.EmailCount;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                };
                this.SendToAgency = function (ReportId, Url, Name, Address) {
                    _this.$scope.ReportId = ReportId;
                    _this.$scope.Url = Url;
                    _this.$scope.Name = Name;
                    _this.$scope.Address = Address;
                    $('#createMail').modal('show');
                };
                this.SendClientMail = function (request) {
                    _this.$scope.IsSendingEmail = true;
                    request.AgentId = _this.$scope.AgentId;
                    request.Id = _this.$scope.ReportId;
                    request.PdfUrl = _this.$scope.Url;
                    request.Name = _this.$scope.Name;
                    request.Address = _this.$scope.Address;
                    _this.diligentService.SendCDDReportToAngency(request).then(function (result) {
                        if (!result.IsSent) {
                            _this.$scope.IsSent = false;
                            _this.$scope.IsSendingEmail = false;
                        }
                        else {
                            _this.$scope.IsSendingEmail = false;
                            _this.$scope.IsSent = true;
                            _this.$scope.Mail = {};
                        }
                    });
                };
                this.Close = function () {
                    _this.$scope.IsSendingEmail = false;
                    _this.$scope.IsSent = false;
                    $('#createMail').modal("hide");
                };
                this.$scope.Init = this.InitializeCommands;
                this.$scope.GetAnnexList = this.GetAnnexList;
                this.$scope.GetDiligenceList = this.GetDiligenceList;
                this.$scope.SendToAgency = this.SendToAgency;
                this.$scope.SendClientMail = this.SendClientMail;
                this.$scope.Close = this.Close;
                this.$scope.DiligenceReportURL = [];
                this.$scope.ReportId = 0;
                this.$scope.Url = "";
                this.$scope.IsSendingEmail = false;
                this.$scope.isRelatedPreCheckListData = false;
                this.$scope.isListClicked = false;
                this.$scope.Mail = {};
            }
            CDDListController.$inject = ['$scope', '$timeout', 'DiligenceService'];
            return CDDListController;
        }());
        diligence.CDDListController = CDDListController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.cddlist.controller.js.map