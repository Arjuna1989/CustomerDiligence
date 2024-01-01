module controllers.diligence {
    'use strict';

    export interface IEditAnnexScope {
        Customer: model.diligent.IGetSinglePreCheckResponse;
        PreCheckId: number;
        IsInvalid: boolean;
        IsSuccess: boolean;

        Init(agentId: number, id: number): void;
        Submit(): void;

    }

    export class EditAnnexController {
        static $inject = ['$scope', 'DiligenceService'];

        constructor(private $scope: IEditAnnexScope, private diligenceService: services.diligence.DiligenceService) {
            this.$scope.Init = this.InitializeCommands;
            this.$scope.Submit = this.Submit;
        }

        private InitializeCommands = (id: number): void => {
            this.$scope.PreCheckId = id;

            $('#loader').show();
            var request = <model.diligent.IGetSinglePreCheckRequest>{};
            request.Id = id;
            this.diligenceService.GetSinglePreCheck(request).then((result: model.diligent.IGetSinglePreCheckResponse) => {
                this.$scope.Customer = result;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });
        }

        private Submit = (): void => {

            $('#loader').show();
            var request = <model.diligent.IUpdateAnnexAInPreCheckRequest>{};
            request.Id = this.$scope.Customer.Id;
            request.Email = this.$scope.Customer.Email;
            request.AgentId = this.$scope.Customer.AgentId;
            request.AmlGroupId = this.$scope.Customer.AmlGroupId;
            request.Birthday = this.$scope.Customer.Birthday;
            request.IdNumber = this.$scope.Customer.IdNumber;
            request.IsIndividual = this.$scope.Customer.IsIndividual;
            request.IsSigned = this.$scope.Customer.IsSigned;
            request.Name = this.$scope.Customer.Name;
            request.Nationality = this.$scope.Customer.Nationality;
            request.Occupation = this.$scope.Customer.Occupation;
            request.Owner = this.$scope.Customer.Owner;
            request.PropertyAddress = this.$scope.Customer.PropertyAddress;
            request.UserId = this.$scope.Customer.UserId;
            request.IsInList = this.$scope.Customer.IsInList;
            request.Date = new Date(this.$scope.Customer.Date).toLocaleDateString();

            if (this.$scope.Customer.IsIndividual) {
                document.getElementById("annexEntity").style.display = "none";
            }
            else {
                document.getElementById("annexIndividual").style.display = "none";
            }
            request.HtmlString = $("#sec_annex").html();
            

            this.diligenceService.UpdateEmailInPreCheck(request).then((result: model.diligent.IUpdateAnnexAInPreCheckResponse) => {
                this.$scope.IsSuccess = true;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });

        }
    }
}