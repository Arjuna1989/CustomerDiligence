module services.diligence {

    'use strict';
    export interface IDiligenceService {
        GetFullSingle(request: model.diligent.IGetFullSingleRequest): ng.IPromise<void | model.diligent.IGetFullSingleResponse>;
        CreateHtmlPdf(request: model.diligent.IPostPdfRequest): ng.IPromise<void | model.diligent.IPostPdfResponse>;
        SendMail(request: model.diligent.IPostMailRequest): ng.IPromise<void | model.diligent.IPostMailResponse>;
        GetDiligenceCustomers(request: model.diligent.IGetDiligenceCustomerRequest): ng.IPromise<void | model.diligent.IGetDiligenceCustomerResponse>;
        CreateCustomerDiligenceUserAml(request: model.diligent.ICreateAmlRequest): ng.IPromise<void | model.diligent.ICreateAmlResponse>;
        GetUsersByAgentId(request: model.diligent.IGetUserByAgentRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetUserByAgentResponse>>;
        GetAllReports(request: model.diligent.IGetAllReportRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetAllReportResponse>>;
        GetAllUsers(request: model.diligent.IGetAllUsersRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetAllUsersResponse>>;
        DeleteUser(request: model.diligent.IDeletediligentUserRequest): ng.IPromise<void | model.diligent.IDeletediligentUserResponse>;
        CheckAmlPricing(request: model.diligent.IGetAMLCreditBalanceRequest): ng.IPromise<void | model.diligent.IGetAMLCreditBalanceResponse>;
        UpdateAmlCreditBalance(request: model.diligent.IUpdateAMLCreditBalanceRequest): ng.IPromise<void | model.diligent.IUpdateAMLCreditBalanceResponse>;
        GetAMLPreCheck(request: model.diligent.IGetAMLPreCheckRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetAMLPreCheckResponse>>;
        GetSinglePreCheck(request: model.diligent.IGetSinglePreCheckRequest): ng.IPromise<void | model.diligent.IGetSinglePreCheckResponse>;
        GetSinglePreCheckList(request: model.diligent.IGetSinglePreCheckRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetSinglePreCheckResponse>>;
        GetAgent(request: model.diligent.IGetAgentRequest): ng.IPromise<void | model.diligent.IGetAgentResponse>;
        GetRelatedPreCheckList(request: model.diligent.IGetRelatedAMLPreCheckRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>>;
        UpdateSignature(request: model.diligent.IUpdateSignatureRequest): ng.IPromise<void | model.diligent.IUpdateSignatureResponse>;
        GetSignature(request: model.diligent.ISignatureRequest): ng.IPromise<void | model.diligent.ISignatureResponse>;
        GetEmailCount(request: model.diligent.IGetEmailCountRequest): ng.IPromise<void | model.diligent.IGetEmailCountResponse>;
        GetBasictDiligenceCustomers(request: model.diligent.IGetDiligenceCustomerRequest): ng.IPromise<void | model.diligent.IGetDiligenceCustomerResponse>;
        GetPropertyLocation(request: model.diligent.IGetPropertyLocationRequest): ng.IPromise<void | services.IResponseArray<model.diligent.IGetPropertyLocationResponse>>;
        UpdateEmailInPreCheck(request: model.diligent.IUpdateAnnexAInPreCheckRequest): ng.IPromise<void | model.diligent.IUpdateAnnexAInPreCheckResponse>;
        DraftDiligentReport(request: model.diligent.IPostPdfRequest): ng.IPromise<void | model.diligent.IPostPdfResponse>;
        DraftExsitingDiligentReport(request: model.diligent.IPostPdfRequest): ng.IPromise<void | model.diligent.IPostPdfResponse>;
        UpdateDrafttoPdf(request: model.diligent.IUpdateDrafttoPdfRequest): ng.IPromise<void | model.diligent.IUpdateDrafttoPdfResponse>;
        SaveCustomer(request: model.diligent.IGetDiligenceCustomerRequest): ng.IPromise<void | model.diligent.IGetDiligenceCustomerResponse>;
        GetSinglePreCheckCustomer(request: model.diligent.IGetAMLSingleCustomerRequest): ng.IPromise<void | model.diligent.IGetAMLSingleCustomerResponse>;
        GetReportId(request: model.diligent.IGetReportIdRequest): ng.IPromise<void | model.diligent.IGetReportIdResponse>;
        CreateDiligencePdf(request: model.diligent.IPostDiligencePdfRequest): ng.IPromise<void | model.diligent.IPostDiligencePdfResponse>;
        SendCDDReportToAngency(request: model.diligent.IMailCDDReportRequest): ng.IPromise<void | model.diligent.IMailCDDReportResponse>;
        SendAnnexAReportToCustomer(request: model.diligent.IMailAnnexAReportRequest): ng.IPromise<void | model.diligent.IMailAnnexAReportResponse>;
    }

    export class DiligenceService extends services.BaseService implements IDiligenceService {


        static $inject = ['$http'];

        constructor($http: ng.IHttpService) {
            super($http);
            this.executeQueryServiceUrl = 'api/Services/';
        }

        GetFullSingle(request: model.diligent.IGetFullSingleRequest): ng.IPromise<void | model.diligent.IGetFullSingleResponse> {
            return this.ServiceRequest<model.diligent.IGetFullSingleRequest, model.diligent.IGetFullSingleResponse>('/api/user/GetFullSingle', request);
        }

        CreateHtmlPdf(request: model.diligent.IPostPdfRequest): ng.IPromise<void | model.diligent.IPostPdfResponse> {
            return this.ServiceRequest<model.diligent.IPostPdfRequest, model.diligent.IPostPdfResponse>('/api/Diligent/CreateDiligentReport', request);
        }


        DraftDiligentReport(request: model.diligent.IPostPdfRequest): ng.IPromise<void | model.diligent.IPostPdfResponse> {
            return this.ServiceJsonRequest<model.diligent.IPostPdfRequest, model.diligent.IPostPdfResponse>('/api/Diligent/DraftDiligentReport', request);
        }

        DraftExsitingDiligentReport(request: model.diligent.IPostPdfRequest): ng.IPromise<void | model.diligent.IPostPdfResponse> {
            return this.ServiceJsonRequest<model.diligent.IPostPdfRequest, model.diligent.IPostPdfResponse>('/api/Diligent/DraftExsitingDiligentReport', request);
        }

        SendMail(request: model.diligent.IPostMailRequest): ng.IPromise<void | model.diligent.IPostMailResponse> {
            return this.ServiceRequest<model.diligent.IPostMailRequest, model.diligent.IPostMailResponse>('/api/Diligent/CreateDiligenceEmail', request);
        }

        GetDiligenceCustomers(request: model.diligent.IGetDiligenceCustomerRequest): ng.IPromise<void | model.diligent.IGetDiligenceCustomerResponse> {
            return this.ServiceRequest<model.diligent.IGetDiligenceCustomerRequest, model.diligent.IGetDiligenceCustomerResponse>('/api/Diligent/GetDiligenceCustomers', request);
        }

        GetBasictDiligenceCustomers(request: model.diligent.IGetDiligenceCustomerRequest): ng.IPromise<void | model.diligent.IGetDiligenceCustomerResponse> {
            return this.ServiceRequest<model.diligent.IGetDiligenceCustomerRequest, model.diligent.IGetDiligenceCustomerResponse>('/api/Diligent/GetBasictDiligenceCustomers', request);
        }

        CreateCustomerDiligenceUserAml(request: model.diligent.ICreateAmlRequest): ng.IPromise<void | model.diligent.ICreateAmlResponse> {
            return this.ServiceRequest<model.diligent.ICreateAmlRequest, model.diligent.ICreateAmlResponse>('/api/Diligent/CreateCustomerDiligenceUserAml', request);
        }

        GetUsersByAgentId(request: model.diligent.IGetUserByAgentRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetUserByAgentResponse>> {
            return this.ServiceRequest<model.diligent.IGetUserByAgentRequest, IResponseArray<model.diligent.IGetUserByAgentResponse>>('/api/Diligent/GetUsersByAgentId', request);
        }

        GetAllReports(request: model.diligent.IGetAllReportRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetAllReportResponse>> {
            return this.ServiceRequest<model.diligent.IGetAllReportRequest, IResponseArray<model.diligent.IGetAllReportResponse>>('/api/Diligent/GetAllReports', request);
        }

        GetAllUsers(request: model.diligent.IGetAllUsersRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetAllUsersResponse>> {
            return this.ServiceRequest<model.diligent.IGetAllUsersRequest, IResponseArray<model.diligent.IGetAllUsersResponse>>('/api/Diligent/GetAllUsers', request);
        }

        DeleteUser(request: model.diligent.IDeletediligentUserRequest): ng.IPromise<void | model.diligent.IDeletediligentUserResponse> {
            return this.ServiceRequest<model.diligent.IDeletediligentUserRequest, model.diligent.IDeletediligentUserResponse>('/api/Diligent/DeletediligentUser', request);
        }

        CheckAmlPricing(request: model.diligent.IGetAMLCreditBalanceRequest): ng.IPromise<void | model.diligent.IGetAMLCreditBalanceResponse> {
            return this.ServiceRequest<model.diligent.IGetAMLCreditBalanceRequest, model.diligent.IGetAMLCreditBalanceResponse>('/api/Diligent/CheckAmlPricing', request);
        }

        UpdateAmlCreditBalance(request: model.diligent.IUpdateAMLCreditBalanceRequest): ng.IPromise<void | model.diligent.IUpdateAMLCreditBalanceResponse> {
            return this.ServiceRequest<model.diligent.IUpdateAMLCreditBalanceRequest, model.diligent.IUpdateAMLCreditBalanceResponse>('/api/Diligent/UpdateAMLCreditBalance', request);
        }

        GetAMLPreCheck(request: model.diligent.IGetAMLPreCheckRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetAMLPreCheckResponse>> {
            return this.ServiceRequest<model.diligent.IGetAMLPreCheckRequest, IResponseArray<model.diligent.IGetAMLPreCheckResponse>>('/api/Diligent/GetAMLPreCheckList', request);
        }

        GetSinglePreCheckList(request: model.diligent.IGetSinglePreCheckRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetSinglePreCheckResponse>> {
            return this.ServiceRequest<model.diligent.IGetSinglePreCheckRequest, IResponseArray<model.diligent.IGetSinglePreCheckResponse>>('/api/Diligent/GetSinglePreCheckList', request);
        }
        GetSinglePreCheck(request: model.diligent.IGetSinglePreCheckRequest): ng.IPromise<void | model.diligent.IGetSinglePreCheckResponse> {
            return this.ServiceRequest<model.diligent.IGetSinglePreCheckRequest, model.diligent.IGetSinglePreCheckResponse>('/api/Diligent/GetSinglePreCheck', request);
        }

        GetAgent(request: model.diligent.IGetAgentRequest): ng.IPromise<void | model.diligent.IGetAgentResponse> {
            return this.ServiceRequest<model.diligent.IGetAgentRequest, model.diligent.IGetAgentResponse>('/api/Diligent/GetSingleAgent', request);
        }

        GetRelatedPreCheckList(request: model.diligent.IGetRelatedAMLPreCheckRequest): ng.IPromise<void | IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>> {
            return this.ServiceRequest<model.diligent.IGetRelatedAMLPreCheckRequest, IResponseArray<model.diligent.IGetRelatedAMLPreCheckResponse>>('/api/Diligent/GetRelatedPreCheckList', request);
        }

        UpdateSignature(request: model.diligent.IUpdateSignatureRequest): ng.IPromise<void | model.diligent.IUpdateSignatureResponse> {
            return this.ServiceRequest<model.diligent.IUpdateSignatureRequest, model.diligent.IUpdateSignatureResponse>('/api/Diligent/UpdateSignature', request);
        }

        GetSignature(request: model.diligent.ISignatureRequest): ng.IPromise<void | model.diligent.ISignatureResponse> {
            return this.ServiceRequest<model.diligent.ISignatureRequest, model.diligent.ISignatureResponse>('/api/Diligent/GetSignature', request);
        }

        GetEmailCount(request: model.diligent.IGetEmailCountRequest): ng.IPromise<void | model.diligent.IGetEmailCountResponse> {
            return this.ServiceRequest<model.diligent.IGetEmailCountRequest, model.diligent.IGetEmailCountResponse>('/api/Diligent/GetEmailCount', request);
        }
        GetPropertyLocation(request: model.diligent.IGetPropertyLocationRequest): ng.IPromise<void | services.IResponseArray<model.diligent.IGetPropertyLocationResponse>> {
            return this.ServiceRequest<model.diligent.IGetPropertyLocationRequest, services.IResponseArray<model.diligent.IGetPropertyLocationResponse>>('/api/Diligent/GetPropertyLocation', request);
        }

        UpdateEmailInPreCheck(request: model.diligent.IUpdateAnnexAInPreCheckRequest): ng.IPromise<void | model.diligent.IUpdateAnnexAInPreCheckResponse> {
            return this.ServiceRequest<model.diligent.IUpdateAnnexAInPreCheckRequest, model.diligent.IUpdateAnnexAInPreCheckResponse>('/api/Diligent/UpdateAnnexAInAmlPreCheck', request);
        }

        UpdateDrafttoPdf(request: model.diligent.IUpdateDrafttoPdfRequest): ng.IPromise<void | model.diligent.IUpdateDrafttoPdfResponse> {
            return this.ServiceRequest<model.diligent.IUpdateDrafttoPdfRequest, model.diligent.IUpdateDrafttoPdfResponse>('/api/Diligent/UpdateDrafttoPdf', request);

        }

        SaveCustomer(request: model.diligent.IGetDiligenceCustomerRequest): ng.IPromise<void | model.diligent.IGetDiligenceCustomerResponse> {
            return this.ServiceRequest<model.diligent.IGetDiligenceCustomerRequest, model.diligent.IGetDiligenceCustomerResponse>('/api/Diligent/SaveCustomer', request);
        }

        GetSinglePreCheckCustomer(request: model.diligent.IGetAMLSingleCustomerRequest): ng.IPromise<void | model.diligent.IGetAMLSingleCustomerResponse> {
            return this.ServiceRequest<model.diligent.IGetAMLSingleCustomerRequest, model.diligent.IGetAMLSingleCustomerResponse>('/api/Diligent/GetSinglePreCheck', request);
        }

        GetReportId(request: model.diligent.IGetReportIdRequest): ng.IPromise<void | model.diligent.IGetReportIdResponse> {
            return this.ServiceRequest<model.diligent.IGetReportIdRequest, model.diligent.IGetReportIdResponse>('/api/Diligent/GetReportId', request);

        }

        CreateDiligencePdf(request: model.diligent.IPostDiligencePdfRequest): ng.IPromise<void | model.diligent.IPostDiligencePdfResponse> {
            return this.ServiceRequest<model.diligent.IPostDiligencePdfRequest, model.diligent.IPostDiligencePdfResponse>('/api/Diligent/CreateDiligenceResultPdf', request);

        }

        SendCDDReportToAngency(request: model.diligent.IMailCDDReportRequest): ng.IPromise<void | model.diligent.IMailCDDReportResponse> {
            return this.ServiceRequest<model.diligent.IMailCDDReportRequest, model.diligent.IMailCDDReportResponse>('/api/Diligent/SendCDDReportToAngency', request);
        }

        SendAnnexAReportToCustomer(request: model.diligent.IMailAnnexAReportRequest): ng.IPromise<void | model.diligent.IMailAnnexAReportResponse> {
            return this.ServiceRequest<model.diligent.IMailAnnexAReportRequest, model.diligent.IMailAnnexAReportResponse>('/api/Diligent/SendAnnexAReportToCustomer', request);
        }
    }
}