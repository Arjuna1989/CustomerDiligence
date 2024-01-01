module controllers.diligence {
    'use strict';

    export interface IAnnexSignScope {
        Customer: model.diligent.IGetSinglePreCheckResponse;
        PreCheckId: number;
        IsInvalid: boolean;
        IsSuccess: boolean;
        AgentId: number;
        ischecked: boolean;

        Init(agentId: number, id: number): void;
        Submit(): void;

    }

    export class AnnexSignController {
        static $inject = ['$scope', 'DiligenceService'];

        constructor(private $scope: IAnnexSignScope, private diligenceService: services.diligence.DiligenceService) {
            this.$scope.Init = this.InitializeCommands;
            this.$scope.Submit = this.Submit;
            this.$scope.ischecked = false;
        }

        private InitializeCommands = (agentId: number, id: number): void => {
            this.$scope.PreCheckId = id;
            this.$scope.AgentId = agentId;

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
            var signature = $('#imgSignature').attr('src');
            if (typeof (signature) == 'undefined') {
                this.$scope.IsSuccess = false;
                this.$scope.IsInvalid = true;
            }
            else {
                this.$scope.Customer.Signature = signature;

                var request = <model.diligent.IUpdateSignatureRequest>{};
                request = (this.$scope.Customer as model.diligent.IUpdateSignatureRequest);
                request.Id = this.$scope.PreCheckId;
                request.Birthday = new Date(this.$scope.Customer.Birthday).toLocaleDateString();
                request.Date = new Date(this.$scope.Customer.Date).toLocaleDateString();
                request.Owner = this.$scope.Customer.Owner == null ? "" : this.$scope.Customer.Owner;

                if (this.$scope.Customer.IsIndividual) {
                    document.getElementById("annexEntity").style.display = "none";
                }
                else {
                    document.getElementById("annexIndividual").style.display = "none";
                }
                request.HtmlString = $('#sec_annex').html();
                this.diligenceService.UpdateSignature(request).then((result: model.diligent.IUpdateSignatureResponse) => {
                    this.$scope.IsInvalid = false;
                    this.$scope.IsSuccess = true;
                    this.SendClientMail();
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                });
            }

        }

        private SendClientMail = (): void => {
            var request = <model.diligent.IMailAnnexAReportRequest>{};
            request.AgentId = this.$scope.AgentId;
            request.Id = this.$scope.Customer.Id;
            request.Name = this.$scope.Customer.Name;
            request.Email = this.$scope.Customer.Email;

            this.diligenceService.SendAnnexAReportToCustomer(request).then((result: model.diligent.IMailAnnexAReportResponse) => {
                if (!result.IsSent) {
                    //this.$scope.IsSent = false;
                    //this.$scope.IsSendingEmail = false;
                }
                else {
                    //this.$scope.IsSendingEmail = false;
                    //this.$scope.IsSent = true;
                    //this.$scope.Mail = <model.diligent.IMailCDDReportRequest>{};
                }
            });
        }
    }
}