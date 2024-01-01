module controllers.diligence {
    'use strict';

    export interface ICDDListScope {
        CddReportCollection: services.IResponseArray<model.diligent.IGetAllReportResponse>;
        AgentId: number;
        GroupId: number;
        RelatedPreCheckList: services.IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>;
        Mail: model.diligent.IMailCDDReportRequest;
        IsSent: boolean;
        Init(agentId: number, groupId: number): void;
        GetAnnexList(parentId: number): void;
        GetDiligenceList(parentId: number, Id: number): void;
        SendToAgency(ReportId: number, Url: string, Name: string, Address: string): void;
        SendClientMail(request: model.diligent.IMailCDDReportRequest): void;
        Close(): void;
        DiligenceReportURL: string[];
        ReportId: number;
        Url: string;
        Name: string;
        Address: string;
        IsSendingEmail: boolean;
        isRelatedPreCheckListData: boolean;
        isListClicked: boolean;
    }


    export class CDDListController {
        static $inject = ['$scope', '$timeout', 'DiligenceService'];

        constructor(private $scope: ICDDListScope, private $timeout: ng.ITimeoutService, private diligentService: services.diligence.DiligenceService) {
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

            this.$scope.Mail = <model.diligent.IMailCDDReportRequest>{};
        }

        private InitializeCommands = (agentId: number, groupId: number): void => {
            this.$scope.AgentId = agentId;
            this.$scope.GroupId = groupId;

          
            var request = <model.diligent.IGetAllReportRequest>{};
            request.AgentId = agentId;
            request.GroupID = groupId;

            $('#loader').show();
            this.diligentService.GetAllReports(request).then((result: services.IResponseArray<model.diligent.IGetAllReportResponse>) => {
                this.$scope.CddReportCollection = result;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });

 
        }

        private GetAnnexList = (parentId: number): void => {
            this.$scope.isListClicked = true;
            this.$scope.DiligenceReportURL = [];
            this.$scope.isRelatedPreCheckListData = false;
            var request = <model.diligent.IGetRelatedAMLPreCheckRequest>{};
            request.ParentId = parentId;
            this.diligentService.GetRelatedPreCheckList(request).then((result: services.IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>) => {
                this.$scope.isListClicked = false;
                this.$scope.RelatedPreCheckList = result;
                for (var i = 0; i < this.$scope.RelatedPreCheckList.length; i++) {
                    if (this.$scope.RelatedPreCheckList[i].Id == parentId || this.$scope.RelatedPreCheckList[i].AmlGroupId == parentId) {
                        if (this.$scope.RelatedPreCheckList[i].DiligenceResultPdf != null) {
                            this.$scope.DiligenceReportURL.push(this.$scope.RelatedPreCheckList[i].DiligenceResultPdfUrl);


                        }
                    }
                }
                this.$scope.isRelatedPreCheckListData = false;
                if (this.$scope.DiligenceReportURL.length == 0) {
                    this.$scope.isRelatedPreCheckListData = true;
                }
                $("#customerRecord").modal('show');

            });

        }

        private GetDiligenceList = (parentId: number, Id: number): void => {
            var element = "s" + Id;

            document.getElementById(element).style.display = "block";


            this.$scope.isListClicked = true;
            this.$scope.DiligenceReportURL = [];
            this.$scope.isRelatedPreCheckListData = false;
            console.log(this.$scope.DiligenceReportURL.length)
            var request = <model.diligent.IGetRelatedAMLPreCheckRequest>{};
            request.ParentId = parentId;
            this.diligentService.GetRelatedPreCheckList(request).then((result: services.IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>) => {
                this.$scope.isListClicked = false;
                this.$scope.RelatedPreCheckList = result;
                document.getElementById(element).style.display = "none";
                    for (var i = 0; i < this.$scope.RelatedPreCheckList.length; i++) {
                        if (this.$scope.RelatedPreCheckList[i].Id == parentId || this.$scope.RelatedPreCheckList[i].AmlGroupId == parentId) {
                            if (this.$scope.RelatedPreCheckList[i].DiligenceResultPdf != null) {
                                this.$scope.DiligenceReportURL.push(this.$scope.RelatedPreCheckList[i].DiligenceResultPdfUrl);


                            }
                        }
                    }
                this.$scope.isRelatedPreCheckListData = false;
                if (this.$scope.DiligenceReportURL.length == 0) {
                    this.$scope.isRelatedPreCheckListData = true;
                }
            });
        }

        private SendToCustomer = (report: model.diligent.IGetAMLPreCheckResponse): void => {
            $('#loader').show();

            var request = <model.diligent.ISignatureRequest>{};
            request.Id = report.Id;
            request.Email = report.Email;
            request.Name = report.Name;
            request.AgentId = report.AgentId;
            this.diligentService.GetSignature(request).then((result: model.diligent.ISignatureResponse) => {
                report.NoOfEmailSent = result.EmailCount;
                $('.spinner').fadeOut();
                $('.preloader-area').fadeOut();
            });
        }

        private SendToAgency = (ReportId: number, Url: string, Name: string, Address: string): void => {

            this.$scope.ReportId = ReportId;
            this.$scope.Url = Url;
            this.$scope.Name = Name;
            this.$scope.Address = Address;
            $('#createMail').modal('show');
        }


        private SendClientMail = (request: model.diligent.IMailCDDReportRequest): void => {
            this.$scope.IsSendingEmail = true;
            request.AgentId = this.$scope.AgentId;
            request.Id = this.$scope.ReportId;
            request.PdfUrl = this.$scope.Url;
            request.Name = this.$scope.Name;
            request.Address = this.$scope.Address;

            this.diligentService.SendCDDReportToAngency(request).then((result: model.diligent.IMailCDDReportResponse) => {
                if (!result.IsSent) {
                    this.$scope.IsSent = false;
                    this.$scope.IsSendingEmail = false;
                }
                else {
                    this.$scope.IsSendingEmail = false;
                    this.$scope.IsSent = true;
                    this.$scope.Mail = <model.diligent.IMailCDDReportRequest>{};
                }
            });
        }

        private Close = (): void => {
            this.$scope.IsSendingEmail = false;
            this.$scope.IsSent = false;
            $('#createMail').modal("hide");

        }
    }
}