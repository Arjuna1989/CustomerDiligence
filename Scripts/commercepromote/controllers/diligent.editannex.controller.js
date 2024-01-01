var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var EditAnnexController = /** @class */ (function () {
            function EditAnnexController($scope, diligenceService) {
                var _this = this;
                this.$scope = $scope;
                this.diligenceService = diligenceService;
                this.InitializeCommands = function (id) {
                    _this.$scope.PreCheckId = id;
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
                    var request = {};
                    request.Id = _this.$scope.Customer.Id;
                    request.Email = _this.$scope.Customer.Email;
                    request.AgentId = _this.$scope.Customer.AgentId;
                    request.AmlGroupId = _this.$scope.Customer.AmlGroupId;
                    request.Birthday = _this.$scope.Customer.Birthday;
                    request.IdNumber = _this.$scope.Customer.IdNumber;
                    request.IsIndividual = _this.$scope.Customer.IsIndividual;
                    request.IsSigned = _this.$scope.Customer.IsSigned;
                    request.Name = _this.$scope.Customer.Name;
                    request.Nationality = _this.$scope.Customer.Nationality;
                    request.Occupation = _this.$scope.Customer.Occupation;
                    request.Owner = _this.$scope.Customer.Owner;
                    request.PropertyAddress = _this.$scope.Customer.PropertyAddress;
                    request.UserId = _this.$scope.Customer.UserId;
                    request.IsInList = _this.$scope.Customer.IsInList;
                    request.Date = new Date(_this.$scope.Customer.Date).toLocaleDateString();
                    if (_this.$scope.Customer.IsIndividual) {
                        document.getElementById("annexEntity").style.display = "none";
                    }
                    else {
                        document.getElementById("annexIndividual").style.display = "none";
                    }
                    request.HtmlString = $("#sec_annex").html();
                    _this.diligenceService.UpdateEmailInPreCheck(request).then(function (result) {
                        _this.$scope.IsSuccess = true;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                };
                this.$scope.Init = this.InitializeCommands;
                this.$scope.Submit = this.Submit;
            }
            EditAnnexController.$inject = ['$scope', 'DiligenceService'];
            return EditAnnexController;
        }());
        diligence.EditAnnexController = EditAnnexController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.editannex.controller.js.map