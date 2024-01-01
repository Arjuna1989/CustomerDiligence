module controllers.diligence {
    'use strict';

    export interface IEditDiligenceController {
        Service: any;
        Files: Array<any>;
        CustomerDiligent: model.diligent.CustomerDiligence;
        CustomerCollection: services.IRequestArray<model.diligent.IGetSinglePreCheckResponse>;
        CreatePdf: model.diligent.IPostPdfRequest;
        Init(agentId: number, id: number): void;
        SaveBasicForm(): void;
        DraftForm(): void;
        IsEnableDetailSection: boolean;
        SubmitDocument(): void;
        ProceedCDD(): void;
        Pdf: model.diligent.IPostPdfResponse;
        Mail: model.diligent.IPostMailRequest;
        SendMail(arg: model.diligent.IPostMailRequest): void;
        EntityCustomer: model.diligent.ICustomerEntityRequest;
        SalesPersonDetailisCollection: Array<model.diligent.ISalesPersonDetailsRequest>;
        DiligenceCustomers: model.diligent.IGetDiligenceCustomerResponse;
        AmlPricing: model.diligent.IGetAMLCreditBalanceResponse;
        SalesPersonDeclaration: model.diligent.ISalesPersonDeclarationRequest;
        Common: model.diligent.ICommonCustomerFields;


        AgentId: number;
        UserId: number;
        Ischecked: boolean;
        amlMessage: boolean;
        IsSaved: boolean;
        IsInvalid: boolean;
        CurrentDate: string;
        IsAmlData: boolean;
        IsIndividual: boolean;
        IsSent: boolean;
        IsNotSent: boolean;
        AmlGroupId: number;
        IsShowAgentForm: boolean;
        IsDraft: boolean;
        IsSaveBasciForm: boolean;
        DiligenceReportId: number;
        IsProceed: boolean;
    }

    export class EditDiligenceController {
        static $inject = ['$scope', 'DiligenceService'];

        constructor(private $scope: IEditDiligenceController, private diligenceService: services.diligence.DiligenceService) {
            $scope.Service = diligenceService;
            $scope.CustomerDiligent = <model.diligent.CustomerDiligence>{};
            $scope.CreatePdf = <model.diligent.IPostPdfRequest>{};
            $scope.Pdf = <model.diligent.IPostPdfResponse>{};
            $scope.Mail = <model.diligent.IPostMailRequest>{};
            $scope.AmlPricing = <model.diligent.IGetAMLCreditBalanceResponse>{};
            $scope.SalesPersonDeclaration = <model.diligent.ISalesPersonDeclarationRequest>{};
            $scope.Common = <model.diligent.ICommonCustomerFields>{};

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

        private InitializeCommands = (agentId: number, id: number): void => {

            this.$scope.AgentId = agentId;
          

            $('#loader').show();

            var request = <model.diligent.IGetSinglePreCheckRequest>{};
            this.$scope.AmlGroupId = request.Id = id;
            this.diligenceService.GetSinglePreCheckList(request).then((result: services.IResponseArray<model.diligent.IGetSinglePreCheckResponse>) => {
                this.$scope.CustomerCollection = result;
                if (result[0].DraftReport != null) {
                    this.$scope.CustomerDiligent = result[0].DraftReport;
                }
                else {
                    this.$scope.CustomerDiligent.Q21 = false;
                    this.$scope.CustomerDiligent.Q22 = false;
                    this.$scope.CustomerDiligent.Q23 = false;
                    this.$scope.CustomerDiligent.Q24A = false;
                    this.$scope.CustomerDiligent.Q24B = false;
                    this.$scope.CustomerDiligent.Q24C = false;
                    this.$scope.CustomerDiligent.Q24D = false;
                    this.$scope.CustomerDiligent.Q24E = false;
                    this.$scope.CustomerDiligent.Q24F = false;
                    this.$scope.CustomerDiligent.Q24G = false;
                    this.$scope.CustomerDiligent.Q24H = false;
                    this.$scope.CustomerDiligent.Q24I = false;
                    this.$scope.CustomerDiligent.Q24J = false;

                    this.$scope.CustomerDiligent.Q31A = false;
                    this.$scope.CustomerDiligent.Q31B = false;
                    this.$scope.CustomerDiligent.Q32A = false;
                    this.$scope.CustomerDiligent.Q32B = false;
                    this.$scope.CustomerDiligent.Q33A = false;
                    this.$scope.CustomerDiligent.Q33B = false;
                    this.$scope.CustomerDiligent.Q34A = false;
                    this.$scope.CustomerDiligent.Q34B = false;
                    this.$scope.CustomerDiligent.Q35A = false;
                    this.$scope.CustomerDiligent.Q35B = false;
                    this.$scope.CustomerDiligent.Q35C = false;
                    this.$scope.CustomerDiligent.Q36A = false;
                    this.$scope.CustomerDiligent.Q36B = false;
                    this.$scope.CustomerDiligent.Q21A = "";
                    this.$scope.CustomerDiligent.Q22A = "";
                    this.$scope.CustomerDiligent.Q23A = "";
                    this.$scope.CustomerDiligent.Q24AA = "";
                    this.$scope.CustomerDiligent.Q24BA = "";
                    this.$scope.CustomerDiligent.Q24CA = "";
                    this.$scope.CustomerDiligent.Q24DA = "";
                    this.$scope.CustomerDiligent.Q24EA = "";
                    this.$scope.CustomerDiligent.Q24FA = "";
                    this.$scope.CustomerDiligent.Q24GA = "";
                    this.$scope.CustomerDiligent.Q24HA = "";
                    this.$scope.CustomerDiligent.Q24IA = "";
                    this.$scope.CustomerDiligent.Q24JA = "";
                    this.$scope.CustomerDiligent.Q31AA = "";
                    this.$scope.CustomerDiligent.Q31BA = "";
                    this.$scope.CustomerDiligent.Q32AA = "";
                    this.$scope.CustomerDiligent.Q32BA = "";
                    this.$scope.CustomerDiligent.Q33AA = "";
                    this.$scope.CustomerDiligent.Q33BA = "";
                    this.$scope.CustomerDiligent.Q34AA = "";
                    this.$scope.CustomerDiligent.Q34BA = "";
                    this.$scope.CustomerDiligent.Q35AA = "";
                    this.$scope.CustomerDiligent.Q35BA = "";
                    this.$scope.CustomerDiligent.Q35CA = "";
                    this.$scope.CustomerDiligent.Q36AA = "";
                    this.$scope.CustomerDiligent.Q36BA = "";
                }
                this.$scope.DiligenceReportId = result[0].ReportId;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });

            var agentRequest = <model.diligent.IGetAgentRequest>{};
            agentRequest.AgentId = agentId;
            this.diligenceService.GetAgent(agentRequest).then((result: model.diligent.IGetAgentResponse) => {
                this.$scope.SalesPersonDeclaration.NameOfSalesPerson = result.DisplayName;
                this.$scope.SalesPersonDeclaration.RegistrationOfSalesPerson = result.IDNumber;
                this.$scope.SalesPersonDeclaration.NameofEstateAgent = result.AgencyName;
                this.$scope.SalesPersonDeclaration.LicenceofEstateAgent = result.AgencyLicence;
                this.$scope.SalesPersonDeclaration.ChecklistCompletingDate = new Date();
                this.$scope.SalesPersonDeclaration.DateofEstateAgentSubmitting = new Date();
            });

            
        }

        private DraftForm = (): void => {
            $('#loader').show();

            var request = <model.diligent.IPostPdfRequest>{};

            request.AgentId = this.$scope.AgentId;
            request.UserId = this.$scope.UserId;
            request.PropertyName = this.$scope.Common.PropertyName;
            request.ParentPreCheckId = this.$scope.AmlGroupId;
            request.IsDraft = true;
            request.DraftReport = this.$scope.CustomerDiligent;
            request.ReportId = this.$scope.DiligenceReportId;

            this.diligenceService.DraftExsitingDiligentReport(request).then((result: model.diligent.IPostPdfResponse) => {
                if (!result.IsError) {
                    this.$scope.DiligenceReportId = result.ReportId;
                    this.$scope.IsDraft = true;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                }
            });


        }


        private SaveBasicForm = (): void => {

            if (this.$scope.CustomerDiligent.Q21 || this.$scope.CustomerDiligent.Q22 || this.$scope.CustomerDiligent.Q23 || this.$scope.CustomerDiligent.Q24A
                || this.$scope.CustomerDiligent.Q24B || this.$scope.CustomerDiligent.Q24C || this.$scope.CustomerDiligent.Q24D || this.$scope.CustomerDiligent.Q24E
                || this.$scope.CustomerDiligent.Q24F || this.$scope.CustomerDiligent.Q24G || this.$scope.CustomerDiligent.Q24H || this.$scope.CustomerDiligent.Q24I
                || this.$scope.CustomerDiligent.Q24J) {

                this.$scope.IsEnableDetailSection = true;
                this.$scope.IsSaveBasciForm = true;

            }
            else {
                this.$scope.IsEnableDetailSection = false;
                var element = document.getElementById("widget-grid-1");
                element.scrollIntoView();
            }
            this.$scope.IsShowAgentForm = true;
        }

        private CreatePdf = (): void => {

            $('#loader').show();
            if (this.$scope.DiligenceReportId == 0) {
            var request = <model.diligent.IPostPdfRequest>{};

            if (this.$scope.IsEnableDetailSection) {
                request.HtmlString = $('#sec_full').html();
            }
            else {
                request.HtmlString = $('#sec_top').html();
            }

            request.AgentId = this.$scope.AgentId;
            request.UserId = this.$scope.UserId;
            request.ParentPreCheckId = this.$scope.AmlGroupId;
            this.diligenceService.CreateHtmlPdf(request).then((result: model.diligent.IPostPdfResponse) => {
                if (result.IsError) {
                    this.$scope.Ischecked = false;
                }
                else {
                    this.$scope.Ischecked = true;
                    this.$scope.Pdf = result;
                    this.$scope.Mail.PdfUrl = result.LocationUrl;
                    this.$scope.Mail.ReportId = result.ReportId;
                    this.$scope.IsSaved = true;
                }
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });
            }
            else {
                var updaterequest = <model.diligent.IUpdateDrafttoPdfRequest>{};
                updaterequest.Id = this.$scope.DiligenceReportId;
                updaterequest.AgentId = this.$scope.AgentId;
                updaterequest.UserId = this.$scope.UserId;
                if (this.$scope.IsEnableDetailSection) {
                    updaterequest.HtmlString = $('#sec_full').html();
                }
                else {
                    updaterequest.HtmlString = $('#sec_top').html();
                }



                this.diligenceService.UpdateDrafttoPdf(updaterequest).then((result: model.diligent.IUpdateDrafttoPdfResponse) => {
                    if (result.IsError) {
                        this.$scope.Ischecked = false;
                    }
                    else {
                        this.$scope.Ischecked = true;
                        this.$scope.Mail.PdfUrl = result.LocationUrl;
                        this.$scope.IsSaved = true;
                    }
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                });

            }

        }

        private SubmitDocument = (): void => {
            this.CreatePdf();
        }

        private SendClientMail = (request: model.diligent.IPostMailRequest): void => {
            request.AgentId = this.$scope.AgentId;
            request.UserId = this.$scope.UserId;
            this.diligenceService.SendMail(request).then((result: model.diligent.IPostMailResponse) => {
                if (result.IsError) {

                    this.$scope.IsNotSent = true;
                }
                else {
                    this.$scope.IsSent = true;
                    this.$scope.Mail = <model.diligent.IPostMailRequest>{};
                }
            });
        }

        private ProceedCDD=():void=>
        {
            this.$scope.IsProceed = true;
            var element = document.getElementById("widget-grid");
            element.scrollIntoView();

        }
    }
}