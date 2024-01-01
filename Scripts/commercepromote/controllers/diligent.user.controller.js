var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var UserController = /** @class */ (function () {
            function UserController($scope, $window, $timeout, diligentService) {
                var _this = this;
                this.$scope = $scope;
                this.$window = $window;
                this.$timeout = $timeout;
                this.diligentService = diligentService;
                this.InitializeCommands = function (agentId) {
                    console.log(agentId);
                    _this.$scope.AgentId = agentId;
                    var request = {};
                    request.AgentId = agentId;
                    _this.diligentService.GetAllUsers(request).then(function (result) {
                        _this.$scope.UserCollection = result;
                        if ($.fn.DataTable.isDataTable("#datatable_col_reorder")) {
                            $('#datatable_col_reorder').DataTable().clear().destroy();
                        }
                        _this.$timeout(function () {
                            $('#datatable_col_reorder').dataTable({
                                "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'C>r>" +
                                    "t" +
                                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
                                "autoWidth": true,
                                "oLanguage": {
                                    "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>'
                                }
                            });
                        }, 400);
                    });
                };
                this.DeleteUser = function (user) {
                    if (confirm("Do you want to delete this contact?")) {
                        var request = {};
                        request.AgentId = _this.$scope.AgentId;
                        request.UserId = user;
                        _this.diligentService.DeleteUser(request).then(function (result) {
                            _this.InitializeCommands(_this.$scope.AgentId);
                        });
                    }
                };
                this.AmlClicked = function (userId) {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.diligentService.CheckAmlPricing(request).then(function (result) {
                        if (result.isEnoughCredit)
                            _this.$window.location.href = '/Diligence/AML?UserId=' + userId;
                        else
                            _this.$window.location.href = '/Diligence/AmlPricing';
                    });
                };
                $scope.Service = diligentService;
                this.$scope.Init = this.InitializeCommands;
                this.$scope.DeleteUser = this.DeleteUser;
                this.$scope.AmlClicked = this.AmlClicked;
            }
            UserController.$inject = ['$scope', '$window', '$timeout', 'DiligenceService'];
            return UserController;
        }());
        diligence.UserController = UserController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.user.controller.js.map