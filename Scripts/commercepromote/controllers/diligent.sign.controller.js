var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var SignatureController = /** @class */ (function () {
            function SignatureController($scope, diligenceService) {
                var _this = this;
                this.$scope = $scope;
                this.diligenceService = diligenceService;
                this.InitializeCommands = function (agentId, id) {
                    _this.$scope.PreCheckId = id;
                    _this.$scope.AgentId = agentId;
                    $('#loader').show();
                    var request = {};
                    request.Id = id;
                    _this.diligenceService.GetSinglePreCheck(request).then(function (result) {
                        _this.$scope.Customer = result;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                };
                this.Submit = function () {
                    $('#loader').show();
                    var signature = $('#imgSignature').attr('src');
                    if (typeof (signature) == 'undefined') {
                        _this.$scope.IsSuccess = false;
                        _this.$scope.IsInvalid = true;
                    }
                    else {
                        _this.$scope.Customer.Signature = signature;
                        var request = {};
                        request = _this.$scope.Customer;
                        request.Id = _this.$scope.PreCheckId;
                        request.Birthday = new Date(_this.$scope.Customer.Birthday).toLocaleDateString();
                        request.Date = new Date(_this.$scope.Customer.Date).toLocaleDateString();
                        if (_this.$scope.Customer.IsIndividual) {
                            document.getElementById("annexEntity").style.display = "none";
                        }
                        else {
                            document.getElementById("annexIndividual").style.display = "none";
                        }
                        request.HtmlString = $('#sec_annex').html();
                        _this.diligenceService.UpdateSignature(request).then(function (result) {
                            _this.$scope.IsInvalid = false;
                            _this.$scope.IsSuccess = true;
                            _this.SendClientMail();
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        });
                    }
                };
                this.SendClientMail = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.Id = _this.$scope.Customer.Id;
                    request.Name = _this.$scope.Customer.Name;
                    request.Email = _this.$scope.Customer.Email;
                    _this.diligenceService.SendAnnexAReportToCustomer(request).then(function (result) {
                        if (!result.IsSent) {
                            _this.$scope.Ismailed = false;
                        }
                        else {
                            _this.$scope.Ismailed = true;
                        }
                    });
                };
                this.$scope.ischecked = false;
                this.$scope.Ismailed = false;
                this.$scope.Init = this.InitializeCommands;
                this.$scope.Submit = this.Submit;
            }
            SignatureController.$inject = ['$scope', 'DiligenceService'];
            return SignatureController;
        }());
        diligence.SignatureController = SignatureController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.sign.controller.js.map