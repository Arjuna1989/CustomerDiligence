module model.diligent {

    'use strict';

    //1st digit question
    //2nd digit section id
    //3rd digit question id
    //4th digit answer
    export interface IPostCustomerDiligenceRequest extends services.IRequestBase {
        Q21: boolean
        Q21A: string;

        Q22: boolean
        Q22A: string;

        Q23: boolean
        Q23A: string;

        Q24A: boolean
        Q24AA: string;

        Q24B: boolean
        Q24BA: string;

        Q24C: boolean
        Q24CA: string;

        Q24D: boolean
        Q24DA: string

        Q24E: boolean
        Q24EA: string;

        Q24F: boolean
        Q24FA: string;

        Q24G: boolean
        Q24GA: string;

        Q24H: boolean
        Q24HA: string;

        Q24I: boolean
        Q24IA: string;

        Q24J: boolean
        Q24JA: string;

        Q31A: boolean
        Q31AA: string;

        Q31B: boolean
        Q31BA: string;

        Q32A: boolean
        Q32AA: string;

        Q32B: boolean
        Q32BA: string;

        Q33A: boolean
        Q33AA: string;

        Q33B: boolean
        Q33BA: string;

        Q34A: boolean
        Q34AA: string;

        Q34B: boolean
        Q34BA: string;

        Q35A: boolean
        Q35AA: string;

        Q35B: boolean
        Q35BA: string;

        Q35C: boolean
        Q35CA: string;

        Q36A: boolean
        Q36AA: string;

        Q36B: boolean
        Q36BA: string;

    };

    export interface IPostCustomerDiligenceResponse extends services.IResponseBase {

    };


    export interface IGetAMLEntityDiligenceCustomerRequest extends services.IRequestBase {
        Name: string;
        EntityCollection: Array<string>;
    };

    export interface IGetAMLEntityDiligenceCustomerResponse extends services.IResponseBase {
        DataId: number;
        VersionNum: number;
        FirstName: string;
        ReferenceNumber: string;
        Comments: string;
        LastDayUpdated: string;
        City: string;
        Street: string;
        Country: string;
        ListName: string;
        ListType: string;
        DateOfLastUpdateOfList: Date;
    };

    export interface IGetDiligenceCustomerRequest extends services.IRequestBase {
        Id: number;
        Name: string;
        AgentId: number;
        GroupId: number;
        UserId: number;
        IdNumber: string;
        Birthday: string;
        Nationality: string;
        Owner: string;
        Occupation: string;
        IsSigned: boolean;
        AmlGroupId: number;
        Email: string;
        PropertyAddress: string;
        Date: string;
        HtmlString: string;
        IsIndividual: boolean;
    };

    export interface IGetDiligenceCustomerResponse extends services.IResponseBase {
        IndividualCollection: Array<Individual>;
        EntityCollection: Array<Entity>;
        AmlGroupId: number;
    };

    export interface IGetFullSingleRequest extends services.IRequestBase {
        UserId: number;
    };

    export interface IGetFullSingleResponse extends services.IResponseBase {
        PreferredName: string;
        IDNumber: string;
        Birthday: string;
        Nationality: string;
        Occupation: string;
        Email: string;
    };

    export interface IGetAMLSingleCustomerRequest extends services.IRequestBase {
        Id: number;
    };

    export interface IGetAMLSingleCustomerResponse extends services.IResponseBase {
        Name: string;
        IdNumber: string;
        Birthday: string;
        Nationality: string;
        Occupation: string;
        Email: string;
        Owner: string;
        PropertyAddress: string;
        Date: Date;
    };


    export interface IPostPdfRequest extends services.IRequestBase {
        HtmlString: string;
        AgentId: number;
        ReportId: number;
        UserId: number;
        Country: string;
        District: string;
        BlockNo: string;
        UnitNo: string;
        StreetName: string;
        BuildingName: string;
        PostalCode: string;
        ParentPreCheckId: number;
        PropertyName: string;
        DraftHtml: string;
        IsDraft: boolean;
        DraftReport: CustomerDiligence;
    };

    export interface IPostPdfResponse extends services.IResponseBase {
        ReportId: number;
        LocationUrl: string;
    };

    export interface IPostMailRequest extends services.IRequestBase {
        ReportId: number;
        RecipientAddresses: string[];
        CCAddresses: string[];
        Subject: string;
        Body: string;
        Signature: string;
        PdfUrl: string;
        AgentId: number;
        UserId: number;
    };

    export interface IPostMailResponse extends services.IResponseBase {
        Message: string;
    };

    export interface IFileUploadRequest extends services.IFileUploadRequest {

    };

    export interface ICreateAmlRequest extends services.IRequestBase {
        AgentId: number;
        UserId: number;
        IsChecked: boolean;
    };

    export interface ICreateAmlResponse extends services.IResponseBase {

    };

    export interface IGetUserByAgentRequest extends services.IRequestBase {
        agentID: number;
    };

    export interface IGetUserByAgentResponse extends services.IRequestBase {
        UserID: number;
        agentID: number;
        FirstName: string;
        LastName: string;
        PreferredName: string;
        DisplayName: string;
        Gender: string;
        IDNumber: string;
        IDName: string;

    };

    export interface IGetSingleResponse extends services.IResponseBase {
        UserID: number;
        agentID: number;
        FirstName: string;
        LastName: string;
        PreferredName: string;
        DisplayName: string;
        Gender: string;
        IDNumber: string;
        IDName: string;

    };

    export interface IGetSingleRequest extends services.IRequestBase {
        UserID: number;

    };

    export interface IGetAllReportRequest extends services.IRequestBase {
        AgentId: number;
        GroupID: number;
    };

    export interface IGetAllReportResponse extends services.IResponseBase {
        Id: number;
        AgentId: number;
        AgentName: string;
        UserId: number;
        FileName: string;
        IsChecked: boolean;
        PropertyName: string;
        DocumentUrl: string;
        ParentPreCheckId: number;
        IsInList: boolean;
    };

    export interface ISalesPersonDeclarationRequest extends services.IRequestBase {
        ChecklistCompletingDate: Date;
        DateofEstateAgentSubmitting: Date;
        SalesPeesonDetails: Array<ISalesPersonDetailsRequest>;
        Seller: boolean;
        Buyer: boolean;
        Landloard: boolean;
        Tenant: boolean;
        NameOfSalesPerson: string;
        RegistrationOfSalesPerson: string;
        NameofEstateAgent: string;
        LicenceofEstateAgent: string;
        SignatureofSalesperson: string;

    };

    export interface ISalesPersonDeclarationResponse extends services.IResponseBase {
    }

    export interface ISalesPersonDetailsRequest extends services.IRequestBase {
        Name: string;
        IdNumber: number;
    };

    export interface ISalesPersonDetailsResponse extends services.IResponseBase {
    };

    export interface ICustomerEntityRequest extends services.IRequestBase {
        Name: string;
        RegistrationNumber: string;
        Country: number;
        Date: number;
        Activity: string;
        Business: string;
        Owner: string;
    };

    export interface ICustomerEntityResponse extends services.IResponseBase {
    };

    export interface ICommonCustomerFields extends services.IRequestBase {
        Date: string;
        District: string;
        PropertyName: string;
        Owner: string;
        Signature: string;
    };
    export interface ICommonCustomerFields extends services.IResponseBase {
    };


    export interface IGetAllUsersResponse extends services.IResponseBase {
        PreferredName: string;
        Mobile: string;
        Phone: string;
        email: string;
        companyName: string;
        Occupation: string;
    };

    export interface IGetAllUsersRequest extends services.IRequestBase {
        AgentId: number;
    };

    export interface IDeletediligentUserRequest extends services.IRequestBase {
        AgentId: number;
        UserId: number;
    };

    export interface IDeletediligentUserResponse extends services.IResponseBase {
        IsSuccess: boolean;
    };

    export interface IGetAMLCreditBalanceRequest extends services.IRequestBase {
        AgentId: number;
    };

    export interface IGetAMLCreditBalanceResponse extends services.IResponseBase {
        Id: number;
        AvailableBalance: number;
        isEnoughCredit: boolean;
    };

    export interface IUpdateAMLCreditBalanceRequest extends services.IRequestBase {
        Id: number;
        AgentId: number;
        AvailableBalance: number;

    };
    export interface IUpdateAMLCreditBalanceResponse extends services.IResponseBase {
        IsSuccess: boolean;
    };

    export interface IGetAMLPreCheckRequest extends services.IRequestBase {
        AgentId: number;
    };

    export interface IGetAMLPreCheckResponse extends services.IResponseBase {
        Id: number;
        Name: string;
        AgentId: number;
        UserId: number;
        IdNumber: string;
        Birthday: Date;
        Nationality: string;
        Occupation: string;
        Owner: string;
        IsSigned: boolean;
        AmlGroupId: number;
        Email: string;
        PropertyAddress: string;
        Date: string;
        HtmlString: string;
        IsIndividual: boolean;
        NoOfEmailSent: number;
        IsInList: boolean;
        FilePath: string;
        DiligenceResultPdf: string;
        DiligenceResultPdfUrl: string;
    };

    export interface IGetRelatedAMLPreCheckRequest extends services.IRequestBase {
        ParentId: number;
    };

    export interface IGetRelatedAMLPreCheckResponse extends services.IResponseBase {
        Id: number;
        Name: string;
        AgentId: number;
        UserId: number;
        IdNumber: string;
        Birthday: Date;
        Nationality: string;
        Occupation: string;
        Owner: string;
        IsSigned: boolean;
        AmlGroupId: number;
        Email: string;
        PropertyAddress: string;
        Date: Date;
        HtmlString: string;
        IsIndividual: boolean;
        DiligenceResultPdf: string;
        DiligenceResultPdfUrl: string;
    };

    export interface IGetSinglePreCheckRequest extends services.IRequestBase {
        Id: number;
    };

    export interface IGetSinglePreCheckResponse extends services.IResponseBase {
        Id: number;
        Name: string;
        AgentId: number;
        ReportId: number;
        UserId: number;
        IdNumber: string;
        Birthday: string;
        Nationality: string;
        Occupation: string;
        Owner: string;
        IsSigned: boolean;
        AmlGroupId: number;
        Email: string;
        PropertyAddress: string;
        Date: string;
        HtmlString: string;
        IsIndividual: boolean;
        IsInList: boolean;
        Signature: string;
        DraftReport: CustomerDiligence;
    };

    export interface IGetAgentRequest extends services.IRequestBase {
        AgentId: number;
    };

    export interface IGetAgentResponse extends services.IResponseBase {
        DisplayName: string;
        IDNumber: string;
        AgencyName: string;
        AgencyLicence: string;
    };

    export interface IUpdateSignatureRequest extends services.IRequestBase {
        Id: number;
        Name: string;
        AgentId: number;
        UserId: number;
        IdNumber: string;
        Birthday: string;
        Nationality: string;
        Occupation: string;
        Owner: string;
        IsSigned: boolean;
        AmlGroupId: number;
        Email: string;
        PropertyAddress: string;
        Date: string;
        HtmlString: string;
        IsIndividual: boolean;
        Signature: string;
    };

    export interface IUpdateSignatureResponse extends services.IResponseBase {

    };

    export interface ISignatureRequest extends services.IRequestBase {
        Id: number;
        Email: string;
        Name: string;
        AgentId: number;
    };

    export interface ISignatureResponse extends services.IResponseBase {
        EmailCount: number;
    };

    export interface IGetEmailCountRequest extends services.IRequestBase {
        Id: number;
    };

    export interface IGetEmailCountResponse extends services.IResponseBase {
        EmailCount: number;
    };

    export interface IGetPropertyLocationRequest extends services.IRequestBase {
        CountryCode: string;
    };
    export interface IGetPropertyLocationResponse extends services.IResponseBase {
        Location: string;
    };

    export interface IUpdateAnnexAInPreCheckRequest extends services.IRequestBase {
    
        Id: number;
        Name: string;
        AgentId: number;
        UserId: number;
        IdNumber: string;
        Birthday: string;
        Nationality: string;
        Occupation: string;
        Owner: string;
        IsSigned: boolean;
        AmlGroupId: number;
        Email: string;
        PropertyAddress: string;
        Date: string;
        HtmlString: string;
        IsIndividual: boolean;
        IsInList: boolean;
        Signature: string;
    };

    export interface IUpdateAnnexAInPreCheckResponse extends services.IResponseBase {
    
    };

    export interface IUpdateDrafttoPdfRequest extends services.IRequestBase {
         Id: number;
        PropertyName: string;
        AgentId: number;
        UserId: number;
        IsDraft: boolean;
        Ischecked: boolean;
        HtmlString: string;
    };

    export interface IUpdateDrafttoPdfResponse extends services.IResponseBase {
        LocationUrl: string;
    };
    export interface IGetReportIdRequest extends services.IRequestBase {
        ParentPreCheckId: number;
    };
    export interface IGetReportIdResponse extends services.IResponseBase {
        ReportId: number;
    };

    export interface IPostDiligencePdfRequest extends services.IRequestBase {
        Id: number;
        AgentId: number;
        HtmlString: string;
    }

    export interface IPostDiligencePdfResponse extends services.IResponseBase {

    }

    export interface IMailCDDReportRequest extends services.IRequestBase {
        Id: number;
        AgentId: number;
        Email: string;
        Address: string;
        PdfUrl: string;
        Name: string;
    };

    export interface IMailCDDReportResponse extends services.IResponseBase {
        IsSent: Boolean;
    };
    export interface IMailAnnexAReportRequest extends services.IRequestBase {
        Id: number;
        AgentId: number;
        Email: string;
        Address: string;
        PdfUrl: string;
        Name: string;
    };

    export interface IMailAnnexAReportResponse extends services.IResponseBase {
        IsSent: Boolean;
    };
}