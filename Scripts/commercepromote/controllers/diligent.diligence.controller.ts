module controllers.diligence {
    'use strict';

    export interface IDiligenceScope {

        Init(agentId: number, groupId: number): void;
        AgentId: number;
        GroupID: number;
        isExistData: boolean;
        PreferredName: string;
        IdNumber: string;
        PreCheckCollection: services.IResponseArray<model.diligent.IGetAMLPreCheckResponse>;
        PreCheckClientCollection: services.IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>;
        DiligenceCustomers: model.diligent.IGetDiligenceCustomerResponse;
        CustomerCollection: Array<model.diligent.IGetSinglePreCheckResponse>;
        AmlPricing: model.diligent.IGetAMLCreditBalanceResponse;
        AmlGroupId: number;
        IsIndividual: boolean;
        amlMessage: boolean;
        CurrentDate :Date;
        ViewReport(url: string): void;
        EditDiligence(id: number): void;
        GetRelatedClient(id: number): void;
        CreateDiligence(): void;
        UpdateAmlCreditBalance(): void;
        GetReport(Name: string, Date: Date): void;
        SendToCustomer(report: model.diligent.IGetAMLPreCheckResponse): void;
        GetDiligenceCustomerList(Name: string, IdNumber: string, Id: number, Isindividual: boolean): void;
        loader: string;

    }

    export class DiligenceController {
        static $inject = ['$scope', '$timeout', '$window', 'DiligenceService'];

        constructor(private $scope: IDiligenceScope, private $timeout: ng.ITimeoutService, private $window: ng.IWindowService, private diligenceService: services.diligence.DiligenceService) {

            $scope.Init = this.InitializeCommands;
            $scope.ViewReport = this.ViewReport;
            $scope.EditDiligence = this.EditDiligence;
            $scope.GetRelatedClient = this.GetRelatedClient;
            $scope.SendToCustomer = this.SendToCustomer;
            $scope.CreateDiligence = this.CreateDiligence;
            $scope.UpdateAmlCreditBalance = this.UpdateAmlCreditBalance;
            $scope.GetReport = this.GetReport;
            this.$scope.PreferredName = "";
            this.$scope.DiligenceCustomers = <model.diligent.IGetDiligenceCustomerResponse>{};
            this.$scope.AmlPricing = <model.diligent.IGetAMLCreditBalanceResponse>{};
            this.$scope.CustomerCollection = [];
            this.$scope.loader = "";
        

            this.$scope.GetDiligenceCustomerList = this.GetDiligenceCustomerList;
          
        }

        private InitializeCommands = (agentId: number, groupId: number): void => {
            this.$scope.AgentId = agentId;
            this.$scope.GroupID = groupId;
            this.$scope.isExistData = true;
            this.$scope.CurrentDate = new Date();
            $('#loader').show();

            var request = <model.diligent.IGetAMLPreCheckRequest>{};
            request.AgentId = this.$scope.AgentId;
            this.diligenceService.GetAMLPreCheck(request).then((result: services.IResponseArray<model.diligent.IGetAMLPreCheckResponse>) => {
                if (result != null) {
                    this.$scope.PreCheckCollection = result;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                }
                else {
                    this.$scope.isExistData = false;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                }
            });
        }


        private GetAMLPreCheckList=():void=>
        {
            
            var request = <model.diligent.IGetAMLPreCheckRequest>{};
            request.AgentId = this.$scope.AgentId;
            this.diligenceService.GetAMLPreCheck(request).then((result: services.IResponseArray<model.diligent.IGetAMLPreCheckResponse>) => {
                if (result != null) {
                    this.$scope.PreCheckCollection = result;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                }
                else {
                    this.$scope.isExistData = false;
                }
            });

        }

        private GetRelatedClient = (id: number): void => {

            var request = <model.diligent.IGetRelatedAMLPreCheckRequest>{};
            request.ParentId = id;
            this.diligenceService.GetRelatedPreCheckList(request).then((result: services.IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>) => {
                this.$scope.PreCheckClientCollection = result;
                if (!this.$scope.PreCheckClientCollection.IsNull) {
                    $('#relatedClient').modal('show');
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                }
            });
        }

        private EditDiligence = (id: number): void => {
            this.$window.location.pathname = "/Diligence/Edit/" + id;
        }

        private ViewReport = (url: string): void => {
            this.$window.open(url, "popup");
        }

        private SendToCustomer = (report: model.diligent.IGetAMLPreCheckResponse): void => {
            $('#loader').show();

            var request = <model.diligent.ISignatureRequest>{};
            request.Id = report.Id;
            request.Email = report.Email;
            request.Name = report.Name;
            request.AgentId = report.AgentId;
            this.diligenceService.GetSignature(request).then((result: model.diligent.ISignatureResponse) => {
                report.NoOfEmailSent = result.EmailCount;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });
        }

        private GetDiligenceCustomerList = (Name: string, IdNumber: string, Id: number, Isindividual: boolean): void => {
         
            var request = <model.diligent.IGetDiligenceCustomerRequest>{};
           
            request.Id = Id;
            request.Name = Name;
            this.$scope.PreferredName = Name;
            this.$scope.IdNumber = IdNumber;
            request.IsIndividual = Isindividual;
            this.$scope.IsIndividual = Isindividual;
            $('#loader').show();
            this.diligenceService.GetBasictDiligenceCustomers(request).then((result: model.diligent.IGetDiligenceCustomerResponse) => {
                if (result.IsError) {
                    alert(result.ErrorMessage);
                }
                else {
                    this.$scope.DiligenceCustomers = result;
                   

                    if (this.$scope.DiligenceCustomers.IndividualCollection.length != 0 || this.$scope.DiligenceCustomers.EntityCollection.length != 0)
                    {
                        this.$scope.amlMessage = true;
                        
                    }
                    else {
                        this.$scope.amlMessage = false;
                    }

                    this.CreateDiligencePdf(Id);
                    //$('.spinner').fadeOut();
                    //$('.preloader-area').fadeOut();
                }

            });
        }


        private CreateDiligencePdf = (Id: number): void => {
            this.$timeout(() => {
                var request = <model.diligent.IPostDiligencePdfRequest>{};
                request.AgentId = this.$scope.AgentId;
                request.Id = Id;

                if (this.$scope.amlMessage == false) {

                    request.HtmlString = $("#diligence_empty_report").html();

                }
                else {

                    request.HtmlString = $("#diligence_report").html();


                }


                this.diligenceService.CreateDiligencePdf(request).then((result: model.diligent.IPostDiligencePdfResponse) => {
                    this.GetAMLPreCheckList();
                });

            }, 1000);
        }


        private GetReport = (Name: string, Date: Date): void => {
            $('#amlMessage').modal('show');
            //this.$scope.amlMessage = true;
            //this.$scope.PreferredName = Name;
            //this.$scope.CurrentDate = Date;
        }


        private CreateDiligence = (): void => {

            this.GetAMLCreditBalance();
            $('#startupInfo').modal('show');
        }

        private GetAMLCreditBalance = (): void => {
            var request = <model.diligent.IGetAMLCreditBalanceRequest>{}
            request.AgentId = this.$scope.AgentId;

            this.diligenceService.CheckAmlPricing(request).then((result: model.diligent.IGetAMLCreditBalanceResponse) => {
                this.$scope.AmlPricing = result;

            });
        }

        private UpdateAmlCreditBalance = (): void => {
            var request = <model.diligent.IUpdateAMLCreditBalanceRequest>{};
            request.AgentId = this.$scope.AgentId;
            request.AvailableBalance = this.$scope.AmlPricing.AvailableBalance - 1;
            request.Id = this.$scope.AmlPricing.Id;

            this.diligenceService.UpdateAmlCreditBalance(request).then((result: model.diligent.IUpdateAMLCreditBalanceResponse) => {
                if (result.IsError) {
                    result.ErrorMessage;
                }
                else {
                    this.$window.location.pathname = "/Diligence/Create/"
                }

            });
        }



    
   
    }
}