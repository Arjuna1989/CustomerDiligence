module controllers.diligence {
    'use strict';

    export interface IUserScope {
        Service: any;
        UserCollection: services.IResponseArray<model.diligent.IGetAllUsersResponse>;
        AgentId: number;
       
        Init(agentId: number): void;
        InitDataTable(): void;
        DeleteUser(user: number): void;
        AmlClicked(userId: number): void;
    }


    export class UserController {
        static $inject = ['$scope', '$window', '$timeout', 'DiligenceService'];

        constructor(private $scope: IUserScope, private $window: ng.IWindowService, private $timeout: ng.ITimeoutService, private diligentService: services.diligence.DiligenceService) {
            $scope.Service = diligentService;
            this.$scope.Init = this.InitializeCommands;
            this.$scope.DeleteUser = this.DeleteUser;
            this.$scope.AmlClicked = this.AmlClicked;
          
        }

        private InitializeCommands = (agentId: number): void => {
            console.log(agentId);
            this.$scope.AgentId = agentId;

            var request = <model.diligent.IGetAllUsersRequest>{};
            request.AgentId = agentId;

            this.diligentService.GetAllUsers(request).then((result: services.IResponseArray<model.diligent.IGetAllUsersResponse>) => {
                this.$scope.UserCollection = result;

                if ($.fn.DataTable.isDataTable("#datatable_col_reorder")) {
                    $('#datatable_col_reorder').DataTable().clear().destroy();
                }

                this.$timeout(() => {
                    $('#datatable_col_reorder').dataTable(
                        {
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
        }

        private DeleteUser = (user: number): void => {
            if (confirm("Do you want to delete this contact?")) {
                var request = <model.diligent.IDeletediligentUserRequest>{};
                request.AgentId = this.$scope.AgentId;
                request.UserId = user;
                this.diligentService.DeleteUser(request).then((result: model.diligent.IDeletediligentUserResponse) => {
                    this.InitializeCommands(this.$scope.AgentId);
                });
            }
        }

        private AmlClicked = (userId: number): void => {
            var request = <model.diligent.IGetAMLCreditBalanceRequest>{};
            request.AgentId = this.$scope.AgentId;
            this.diligentService.CheckAmlPricing(request).then((result: model.diligent.IGetAMLCreditBalanceResponse) => {
                if (result.isEnoughCredit) this.$window.location.href = '/Diligence/AML?UserId=' + userId;
                else this.$window.location.href = '/Diligence/AmlPricing';
            });
        }

     
    }
}