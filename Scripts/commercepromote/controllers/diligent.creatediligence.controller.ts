module controllers.diligence {
    'use strict';

    export interface ICreateDiligenceScope {
        Init(agentId: number, groupId: number, countrycode: string, Id: number, AmlGroupId: number): void;
        SaveBasicForm(): void;
        SubmitDocument(): void;
        ResetFields(): void;
        SendMail(arg: model.diligent.IPostMailRequest): void;
        CheckAML(): void;
        CheckAMLConfirm(): void;
        GetUser(id: number): void;
        GetPropertyLocation(arg: string): void;
        GetAMLCreditBalance(): void;
        CheckAnotherCustomer(): void;
        DraftForm(): void;
        SaveCustomer(): void;
        CreateDiligencePdf(): void;
        SaveSingleCustomer(): void;

        IsShowAgentForm: boolean;
        IsSaveBasciForm: boolean;
        IsEnableDetailSection: boolean;
        CustomerDiligent: model.diligent.CustomerDiligence;
        Customer: model.diligent.IGetFullSingleResponse;
        CreatePdf: model.diligent.IPostPdfRequest;
        Agent: model.diligent.IGetAgentResponse;
        Pdf: model.diligent.IPostPdfResponse;
        Mail: model.diligent.IPostMailRequest;
        CountryCode: string;
        AgentId: number;
        UserId: number;
        Ischecked: boolean;
        IsCreditDeduction: boolean;
        Users: any[];
        amlMessage: boolean;
        IsSaved: boolean;
        IsInvalid: boolean;
        IsAmlData: boolean;
        IsAmlChecked: boolean;
        IsIndividual: boolean;
        IsSent: boolean;
        IsNotSent: boolean;
        IsDraft: boolean;
        AmlGroupId: number;
        AmlPreCheckId: number;
        IsExistingClient: boolean;
        IsSuccessfullySaved: boolean
        IsSaveButtonClicked: boolean;
        IsGenarated: boolean;
        DiligenceCustomers: model.diligent.IGetDiligenceCustomerResponse;
        AmlPricing: model.diligent.IGetAMLCreditBalanceResponse;
        SalesPersonDeclaration: model.diligent.ISalesPersonDeclarationRequest;
        Common: model.diligent.ICommonCustomerFields;
        CustomerCollection: Array<model.diligent.IGetSinglePreCheckResponse>;
        CurrentDate: Date;
        Locations: any[];
        DiligenceReportId: number;
    }

    export class CreateDiligenceController {
        static $inject = ['$scope','$timeout','$window','DiligenceService'];

        constructor(private $scope: ICreateDiligenceScope, private $timeout: ng.ITimeoutService, private $window: ng.IWindowService,  private diligenceService: services.diligence.DiligenceService) {
            $('#loader').show();

            $scope.CustomerDiligent = <model.diligent.CustomerDiligence>{};
            $scope.Customer = <model.diligent.IGetFullSingleResponse>{};
            $scope.CreatePdf = <model.diligent.IPostPdfRequest>{};
            $scope.Pdf = <model.diligent.IPostPdfResponse>{};
            $scope.Mail = <model.diligent.IPostMailRequest>{};
            $scope.AmlPricing = <model.diligent.IGetAMLCreditBalanceResponse>{};
            $scope.SalesPersonDeclaration = <model.diligent.ISalesPersonDeclarationRequest>{};
            $scope.Common = <model.diligent.ICommonCustomerFields>{};
            $scope.Locations = [];
            $scope.Common.Date = new Date().toString();
            $scope.Common.Owner = "";
            $scope.DiligenceReportId = 0;

            this.$scope.Init = this.InitializeCommands;


            $scope.IsEnableDetailSection = false;
            $scope.Ischecked = false;
            this.$scope.IsAmlData = false;
            this.$scope.IsAmlChecked = false;
            $scope.IsIndividual = true;
       

            this.$scope.IsSuccessfullySaved = false;

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

            this.$scope.SalesPersonDeclaration.Seller = false;
            this.$scope.SalesPersonDeclaration.Buyer = false;
            this.$scope.SalesPersonDeclaration.Landloard = false;
            this.$scope.SalesPersonDeclaration.Tenant = false;

            this.$scope.SalesPersonDeclaration.SignatureofSalesperson = "";

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

            this.$scope.CreatePdf.HtmlString = "";

            this.$scope.IsSaveButtonClicked = true;
            this.$scope.IsGenarated = false;
            this.$scope.IsDraft = false;
   
            $scope.IsInvalid = false;
            $scope.IsSent = false;
            $scope.IsNotSent = false;
            $scope.CustomerCollection = [];
        }

        private InitializeCommands = (agentId: number, groupId: number, countrycode: string): void => {

            //, Id: number, AmlGroupId: number

            this.$scope.AgentId = agentId;
            this.$scope.CountryCode = countrycode;
           // this.$scope.AmlPreCheckId = parseInt(Id.toString());
            this.$scope.AmlGroupId =0;
            var request = <model.diligent.IGetUserByAgentRequest>{};
            request.agentID = agentId;
            this.diligenceService.GetUsersByAgentId(request).then((result: services.IResponseArray<model.diligent.IGetUserByAgentResponse>) => {
                this.$scope.Users = result;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });

            this.$scope.SaveBasicForm = this.SaveBasicForm;
            this.$scope.SubmitDocument = this.SubmitDocument;
            this.$scope.SendMail = this.SendClientMail;
            this.$scope.GetUser = this.GetUser;
            this.$scope.GetPropertyLocation = this.GetPropertyLocation;
            this.$scope.ResetFields = this.ResetFields;
            this.$scope.GetAMLCreditBalance = this.GetAMLCreditBalance;
            this.$scope.CheckAnotherCustomer = this.CheckAnotherCustomer;
            this.$scope.DraftForm = this.DraftForm;
            this.$scope.SaveCustomer = this.SaveCustomer;
            this.$scope.CreateDiligencePdf = this.CreateDiligencePdf;
            this.$scope.SaveSingleCustomer = this.SaveSingleCustomer;

            this.$scope.CheckAMLConfirm = this.CheckAMLConfirmedClick;
            this.$scope.CheckAML = this.CheckAMLClicked;

            //var agentRequest = <model.diligent.IGetAgentRequest>{};
            //agentRequest.AgentId = agentId;
            //this.diligenceService.GetAgent(agentRequest).then((result: model.diligent.IGetAgentResponse) => {
            //    this.$scope.SalesPersonDeclaration.NameOfSalesPerson = result.DisplayName;
            //    this.$scope.SalesPersonDeclaration.RegistrationOfSalesPerson = result.IDNumber;
            //    this.$scope.SalesPersonDeclaration.NameofEstateAgent = result.AgencyName;
            //    this.$scope.SalesPersonDeclaration.LicenceofEstateAgent = result.AgencyLicence;
            //    this.$scope.SalesPersonDeclaration.ChecklistCompletingDate = new Date();
            //    this.$scope.SalesPersonDeclaration.DateofEstateAgentSubmitting = new Date();
            //});

            //if (this.$scope.AmlPreCheckId!=0 )
            //{
            //    var GetSingleCustomerRequest = <model.diligent.IGetAMLSingleCustomerRequest>{};
            //    GetSingleCustomerRequest.Id = this.$scope.AmlPreCheckId;
            //    this.diligenceService.GetSinglePreCheckCustomer(GetSingleCustomerRequest).then((result: model.diligent.IGetAMLSingleCustomerResponse) => {
            //        if (result != null) {
            //            this.$scope.Customer.Birthday = result.Birthday;
            //            this.$scope.Customer.PreferredName = result.Name;
            //            this.$scope.Customer.IDNumber = result.IdNumber;
            //            this.$scope.Customer.Nationality = result.Nationality;
            //            this.$scope.Customer.Occupation = result.Occupation;
            //            this.$scope.Customer.Email = result.Email;
            //            this.$scope.Common.Owner = result.Owner;
            //            this.$scope.Common.Date = result.Date;
            //            this.$scope.Common.PropertyName = result.PropertyAddress;
            //            this.GetReportId();
            //        }
            //        else {
            //           this. $scope.Common = <model.diligent.ICommonCustomerFields>{};
            //           this. $scope.Customer = <model.diligent.IGetFullSingleResponse>{};
            //        }
            //        //$('.spinner').fadeOut();
            //        //$('.preloader-area').fadeOut();
            //    });
            //}
        }

        private GetReportId = (): void => {
            var request = <model.diligent.IGetReportIdRequest>{}
            request.ParentPreCheckId = this.$scope.AmlGroupId == 0 ? this.$scope.AmlPreCheckId : this.$scope.AmlGroupId;
            this.diligenceService.GetReportId(request).then((result: model.diligent.IGetReportIdResponse) => {
                this.$scope.DiligenceReportId = result.ReportId;
            });
        }


        private CheckAnotherCustomer = (): void => {

            this.$scope.IsSuccessfullySaved = false;
            this.$scope.IsSaveButtonClicked = false;
            if ((typeof this.$scope.Customer.PreferredName == 'undefined' || typeof this.$scope.Customer.IDNumber == 'undefined' || typeof (this.$scope.Customer.Birthday) == 'undefined' ||
                typeof this.$scope.Customer.Nationality == 'undefined' || typeof this.$scope.Customer.Occupation == 'undefined' || typeof this.$scope.Customer.Email == 'undefined' || typeof (this.$scope.Common.Date) == 'undefined' || this.$scope.Common.PropertyName == '' || typeof (this.$scope.Common.PropertyName) == 'undefined'
                || this.$scope.Customer.PreferredName == "" || this.$scope.Customer.IDNumber == "" || this.$scope.Customer.Nationality == "" || this.$scope.Customer.Occupation == "" || this.$scope.Customer.Email == "" || this.$scope.Customer.Birthday == null || this.$scope.Common.Date == null || typeof (this.$scope.Common.Date) == 'undefined')) {
                this.$scope.IsInvalid = true;
                return;
            }
            else {
                var request = <model.diligent.IGetAMLCreditBalanceRequest>{}
                request.AgentId = this.$scope.AgentId;

                this.diligenceService.CheckAmlPricing(request).then((result: model.diligent.IGetAMLCreditBalanceResponse) => {
                    this.$scope.AmlPricing = result;
                    $('#checkAnotherClient').modal('show');
                });
            }

        }

        private ResetFields = (): void => {

           
            var request = <model.diligent.IUpdateAMLCreditBalanceRequest>{};
            request.AgentId = this.$scope.AgentId;
            request.AvailableBalance = this.$scope.AmlPricing.AvailableBalance - 1;
            request.Id = this.$scope.AmlPricing.Id;
            
                this.GetAMLCreditBalance();
                this.diligenceService.UpdateAmlCreditBalance(request).then((result: model.diligent.IUpdateAMLCreditBalanceResponse) => {
                    if (result.IsError) {
                        result.ErrorMessage;
                    }
                    else {

                        this.SaveCustomer();
                        this.$scope.AmlPreCheckId = 0;
                        this.$scope.IsSaveButtonClicked = true;
                        this.$scope.Customer.PreferredName = "";
                        this.$scope.Customer.IDNumber = "";
                        this.$scope.Customer.Nationality = "";
                        this.$scope.Customer.Occupation = "";
                        this.$scope.Customer.Email = "";
                        this.$scope.Customer.Birthday = null;
                        this.$scope.Common.Owner = "";
                        var element = document.getElementById("widget-grid-0");
                        element.scrollIntoView();

                    }

                });


        }

        private GetPropertyLocation = (arg: string): void => {
            var request = <model.diligent.IGetPropertyLocationRequest>{};
            request.CountryCode = arg;
            this.diligenceService.GetPropertyLocation(request).then((result: services.IResponseArray<model.diligent.IGetPropertyLocationResponse>) => {
                if (!result.IsError && result != null) {
                    for (var i = 0; i < result.length; i++) {
                        var location = result[i].Location.split("-");
                        var locationCity = location[1].split("/");
                        for (var x = 0; x < locationCity.length; x++) {
                            this.$scope.Locations.push(locationCity[x].trim());
                        }
                    }
                }
            });
        }

        private SaveBasicForm = (): void => {

            if (this.$scope.CustomerDiligent.Q21 || this.$scope.CustomerDiligent.Q22 || this.$scope.CustomerDiligent.Q23 || this.$scope.CustomerDiligent.Q24A
                || this.$scope.CustomerDiligent.Q24B || this.$scope.CustomerDiligent.Q24C || this.$scope.CustomerDiligent.Q24D || this.$scope.CustomerDiligent.Q24E
                || this.$scope.CustomerDiligent.Q24F || this.$scope.CustomerDiligent.Q24G || this.$scope.CustomerDiligent.Q24H || this.$scope.CustomerDiligent.Q24I
                || this.$scope.CustomerDiligent.Q24J) {

                this.$scope.IsEnableDetailSection = true;

            }
            else {
                this.$scope.IsEnableDetailSection = false;
            }
            this.$scope.IsShowAgentForm = true;
            this.$scope.IsSaveBasciForm = true;
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
                request.PropertyName = this.$scope.Common.PropertyName;
                request.ParentPreCheckId = this.$scope.AmlGroupId;
                request.DraftHtml = $('#draftSection').html();
                request.IsDraft = false;

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
                        this.$scope.IsAmlChecked = false;

                        this.$scope.Customer = <model.diligent.IGetFullSingleResponse>{};
                        this.$scope.Common = <model.diligent.ICommonCustomerFields>{};
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
                        this.$scope.Mail.ReportId = this.$scope.DiligenceReportId;
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

        private GetUser = (id: number): void => {
            if (id != 0) {
                var request = <model.diligent.IGetFullSingleRequest>{};
                request.UserId = id;
                this.diligenceService.GetFullSingle(request).then((result: model.diligent.IGetFullSingleResponse) => {
                    this.$scope.Customer = result;
                });
            }
        }

        private CheckAMLClicked = (): void => {
            console.log($("#country").val() == -1 ? "" : $("#country").val());
            console.log($("#state").val() == null ? "" : $("#state").val());
            this.$scope.IsInvalid = false;
            if ((typeof this.$scope.Customer.PreferredName == 'undefined' || typeof this.$scope.Customer.IDNumber == 'undefined' || typeof (this.$scope.Customer.Birthday) == 'undefined' ||
                typeof this.$scope.Customer.Nationality == 'undefined' || typeof this.$scope.Customer.Occupation == 'undefined' || typeof this.$scope.Customer.Email == 'undefined' || typeof (this.$scope.Common.Date) == 'undefined' || this.$scope.Common.PropertyName == '' || typeof (this.$scope.Common.PropertyName) == 'undefined'
                || this.$scope.Customer.PreferredName == "" || this.$scope.Customer.IDNumber == "" || this.$scope.Customer.Nationality == "" || this.$scope.Customer.Occupation == "" || this.$scope.Customer.Email == "" || this.$scope.Customer.Birthday == null || this.$scope.Common.Date == null || typeof (this.$scope.Common.Date)=='undefined')) {
                this.$scope.IsInvalid = true;
                return;
            }

            if (this.$scope.AmlPreCheckId == 0 && this.$scope.AmlGroupId == 0) {
                this.GetAMLCreditBalance();
                $('#startupInfo').modal('show');
            }
            else {
                this.CheckAMLConfirmedClick();
            }

        }

        private GetDiligenceCustomerList = (arg: model.diligent.IGetDiligenceCustomerRequest): void => {
            var request = arg;
            request.Id = this.$scope.AmlPreCheckId;
            this.$scope.CurrentDate = new Date();
            $('#loader').show();
            this.diligenceService.GetDiligenceCustomers(request).then((result: model.diligent.IGetDiligenceCustomerResponse) => {
                if (result.IsError) {
                    alert(result.ErrorMessage);
                }
                else {
                    this.$scope.DiligenceCustomers = result;
                    if (typeof this.$scope.AmlGroupId == 'undefined')
                        this.$scope.AmlGroupId = this.$scope.DiligenceCustomers.AmlGroupId;
                        this.$scope.AmlPreCheckId = this.$scope.DiligenceCustomers.AmlGroupId;

                    var customer = <model.diligent.IGetSinglePreCheckResponse>{};
                    customer.Name = arg.Name;
                    customer.IdNumber = arg.IdNumber;

                    this.$scope.CustomerCollection.push(customer);

                    if (this.$scope.DiligenceCustomers.IndividualCollection.length == 0 && this.$scope.DiligenceCustomers.EntityCollection.length == 0) {
                        this.$scope.amlMessage = true;
                        this.$scope.IsAmlData = false;
                    }
                    else {
                        this.$scope.IsAmlData = true;
                    }
                    //this.DraftForm();
                    $('#checkAML').modal('show');
                    this.$scope.IsAmlChecked = true;
                    $('.spinner').fadeOut();
                    $('.preloader-area').fadeOut();
                }

            });
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
                if (result.IsError)
                    result.ErrorMessage;

            });
        }

        private CheckAMLConfirmedClick = (): void => {

            this.UpdateAmlCreditBalance();
            this.$scope.amlMessage = false;
            this.$scope.IsSaveButtonClicked = false;
            var request = <model.diligent.IGetDiligenceCustomerRequest>{};

            request.Name = this.$scope.Customer.PreferredName;
            request.IsIndividual = this.$scope.IsIndividual;
            request.AgentId = this.$scope.AgentId;
            if (this.$scope.IsExistingClient)
                request.UserId = this.$scope.UserId;
            else
                request.UserId = 0;
            request.IdNumber = this.$scope.Customer.IDNumber;
            request.Nationality = this.$scope.Customer.Nationality;
            request.Occupation = this.$scope.Customer.Occupation;
            request.Birthday = new Date(this.$scope.Customer.Birthday).toLocaleDateString();
            request.Owner = this.$scope.Common.Owner;
            request.AmlGroupId = this.$scope.AmlGroupId;
            request.Email = this.$scope.Customer.Email;
            request.AgentId = this.$scope.AgentId;
            request.UserId = this.$scope.UserId;
            request.PropertyAddress = this.$scope.Common.PropertyName;
            request.Date = new Date(this.$scope.Common.Date).toLocaleDateString();

            console.log(request);

            if (this.$scope.IsIndividual) {
                document.getElementById("annexEntity").style.display = "none";
            }
            else {
                document.getElementById("annexIndividual").style.display = "none";
            }
            request.HtmlString = $('#sec_annex').html();
            this.GetDiligenceCustomerList(request);
    
        }


        private DraftForm = (): void => {
            //$('#loader').show();

            var request = <model.diligent.IPostPdfRequest>{};

            request.AgentId = this.$scope.AgentId;
            request.UserId = this.$scope.UserId;
            request.PropertyName = this.$scope.Common.PropertyName;
            request.ParentPreCheckId = this.$scope.AmlGroupId;
            request.IsDraft = true;
            request.DraftReport = this.$scope.CustomerDiligent;
            request.ReportId = this.$scope.DiligenceReportId;

            if (this.$scope.DiligenceReportId != 0) {
                this.diligenceService.DraftExsitingDiligentReport(request).then((result: model.diligent.IPostPdfResponse) => {
                    this.$scope.DiligenceReportId = result.ReportId;
                    this.$scope.IsDraft = true;
                    //$('.spinner').fadeOut();
                    //$('.preloader-area').fadeOut();
                });
            }
            else {
                this.diligenceService.DraftDiligentReport(request).then((result: model.diligent.IPostPdfResponse) => {
                    this.$scope.DiligenceReportId = result.ReportId;
                    this.$scope.IsDraft = true;
                    //$('.spinner').fadeOut();
                    //$('.preloader-area').fadeOut();
                });
            }

        }

        private SaveCustomer = (): void => {

            $('#loader').show();
            var request = <model.diligent.IGetDiligenceCustomerRequest>{};
            request.Id = this.$scope.AmlPreCheckId;
            request.Name = this.$scope.Customer.PreferredName;
            request.IsIndividual = this.$scope.IsIndividual;
            request.AgentId = this.$scope.AgentId;
            if (this.$scope.IsExistingClient)
                request.UserId = this.$scope.UserId;
            else
                request.UserId = 0;
            request.IdNumber = this.$scope.Customer.IDNumber;
            request.Nationality = this.$scope.Customer.Nationality;
            request.Occupation = this.$scope.Customer.Occupation;
            request.Birthday = new Date(this.$scope.Customer.Birthday).toLocaleDateString();
            request.Owner = this.$scope.Common.Owner;
            request.AmlGroupId = this.$scope.AmlGroupId;
            request.Email = this.$scope.Customer.Email;
            request.AgentId = this.$scope.AgentId;
            request.UserId = this.$scope.UserId;
            request.PropertyAddress = this.$scope.Common.PropertyName;
            request.Date = new Date(this.$scope.Common.Date).toLocaleDateString();
            console.log(request);
            if (this.$scope.IsIndividual) {
                document.getElementById("annexEntity").style.display = "none";
            }
            else {
                document.getElementById("annexIndividual").style.display = "none";
            }
            request.HtmlString = $('#sec_annex').html();
        
            this.$scope.CurrentDate = new Date();
           

            this.diligenceService.SaveCustomer(request).then((result: model.diligent.IGetDiligenceCustomerResponse) => {
                if (result.IsError) {
                    alert(result.ErrorMessage);
                    $('#loader').hide();
                }
                else {
                    this.$scope.DiligenceCustomers = result;
                    this.$scope.IsSuccessfullySaved = true;
                    if (typeof this.$scope.AmlGroupId == 'undefined' || this.$scope.AmlGroupId == 0)
                        this.$scope.AmlGroupId = this.$scope.DiligenceCustomers.AmlGroupId;
                        this.DraftForm();
                        $('#loader').hide();

                }

            });

          
        }


        private SaveSingleCustomer=():void=>
        {
            this.$scope.IsInvalid = false;
            if ((typeof this.$scope.Customer.PreferredName == 'undefined' || typeof this.$scope.Customer.IDNumber == 'undefined' || typeof (this.$scope.Customer.Birthday) == 'undefined' ||
                typeof this.$scope.Customer.Nationality == 'undefined' || typeof this.$scope.Customer.Occupation == 'undefined' || typeof this.$scope.Customer.Email == 'undefined' || typeof (this.$scope.Common.Date) == 'undefined' || this.$scope.Common.PropertyName == '' || typeof (this.$scope.Common.PropertyName) == 'undefined'
                || this.$scope.Customer.PreferredName == "" || this.$scope.Customer.IDNumber == "" || this.$scope.Customer.Nationality == "" || this.$scope.Customer.Occupation == "" || this.$scope.Customer.Email == "" || this.$scope.Customer.Birthday == null || this.$scope.Common.Date == null || typeof (this.$scope.Common.Date) == 'undefined')) {
                this.$scope.IsInvalid = true;
                return;
            }
            else {
                $('#loader').show();
                var request = <model.diligent.IGetDiligenceCustomerRequest>{};
                request.Id = this.$scope.AmlPreCheckId > 0 ? this.$scope.AmlPreCheckId : this.$scope. AmlPreCheckId;
                request.Name = this.$scope.Customer.PreferredName;
                request.IsIndividual = this.$scope.IsIndividual;
                request.AgentId = this.$scope.AgentId;
                if (this.$scope.IsExistingClient)
                    request.UserId = this.$scope.UserId;
                else
                    request.UserId = 0;
                request.IdNumber = this.$scope.Customer.IDNumber;
                request.Nationality = this.$scope.Customer.Nationality;
                request.Occupation = this.$scope.Customer.Occupation;
                request.Birthday = new Date(this.$scope.Customer.Birthday).toLocaleDateString();
                request.Owner = this.$scope.Common.Owner;
                request.AmlGroupId = this.$scope.AmlGroupId;
                request.Email = this.$scope.Customer.Email;
                request.AgentId = this.$scope.AgentId;
                request.GroupId = typeof this.$scope.AmlGroupId == 'undefined' || this.$scope.AmlGroupId == 0 ? 0 : this.$scope.AmlGroupId;
                request.PropertyAddress = this.$scope.Common.PropertyName;
                request.Date = new Date(this.$scope.Common.Date).toLocaleDateString();

                console.log(request);

                if (this.$scope.IsIndividual) {
                    document.getElementById("annexEntity").style.display = "none";
                }
                else {
                    document.getElementById("annexIndividual").style.display = "none";
                }
                request.HtmlString = $('#sec_annex').html();

                this.$scope.CurrentDate = new Date();


                this.diligenceService.SaveCustomer(request).then((result: model.diligent.IGetDiligenceCustomerResponse) => {
                    if (result.IsError) {
                        alert(result.ErrorMessage);

                    }
                    else {
                        this.$scope.DiligenceCustomers = result;
                        if (typeof this.$scope.AmlGroupId == 'undefined' || this.$scope.AmlGroupId == 0)
                            this.$scope.AmlGroupId = this.$scope.DiligenceCustomers.AmlGroupId;
                        this.DraftForm();
                        this.$window.location.pathname = "/Diligence/Index/";
                    }

                });
            }

        }



        private SaveDiligenceCustomer = (arg: model.diligent.IGetDiligenceCustomerRequest): void => {
            var request = arg;
            this.$scope.CurrentDate = new Date();
            $('#loader').show();
            this.diligenceService.SaveCustomer(request).then((result: model.diligent.IGetDiligenceCustomerResponse) => {
                if (result.IsError) {

                  
                    alert(result.ErrorMessage);
                    $('#loader').hide();
                }
                else {
                    this.$scope.DiligenceCustomers = result;
                    this.$scope.IsSuccessfullySaved = true;
                    if (typeof this.$scope.AmlGroupId == 'undefined' || this.$scope.AmlGroupId==0)
                        this.$scope.AmlGroupId = this.$scope.DiligenceCustomers.AmlGroupId;
                        this.DraftForm();

                    $('#loader').hide();
                    
                }

            });
        }


        private CreateDiligencePdf = (): void => {
            var request = <model.diligent.IPostDiligencePdfRequest>{};
            request.AgentId = this.$scope.AgentId;
            request.Id = this.$scope.AmlPreCheckId;
            request.HtmlString = $("#diligence_report").html();

            this.diligenceService.CreateDiligencePdf(request).then((result: model.diligent.IPostDiligencePdfResponse) => {
                this.$scope.IsGenarated = true;
            });
        }
    }
}