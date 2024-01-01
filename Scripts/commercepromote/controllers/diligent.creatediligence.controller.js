var controllers;
(function (controllers) {
    var diligence;
    (function (diligence) {
        'use strict';
        var CreateDiligenceController = /** @class */ (function () {
            function CreateDiligenceController($scope, $timeout, $window, diligenceService) {
                var _this = this;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$window = $window;
                this.diligenceService = diligenceService;
                this.InitializeCommands = function (agentId, groupId, countrycode) {
                    //, Id: number, AmlGroupId: number
                    _this.$scope.AgentId = agentId;
                    _this.$scope.CountryCode = countrycode;
                    // this.$scope.AmlPreCheckId = parseInt(Id.toString());
                    _this.$scope.AmlGroupId = 0;
                    var request = {};
                    request.agentID = agentId;
                    _this.diligenceService.GetUsersByAgentId(request).then(function (result) {
                        _this.$scope.Users = result;
                        $('.spinner').fadeOut();
                        $('.preloader-area').fadeOut();
                    });
                    _this.$scope.SaveBasicForm = _this.SaveBasicForm;
                    _this.$scope.SubmitDocument = _this.SubmitDocument;
                    _this.$scope.SendMail = _this.SendClientMail;
                    _this.$scope.GetUser = _this.GetUser;
                    _this.$scope.GetPropertyLocation = _this.GetPropertyLocation;
                    _this.$scope.ResetFields = _this.ResetFields;
                    _this.$scope.GetAMLCreditBalance = _this.GetAMLCreditBalance;
                    _this.$scope.CheckAnotherCustomer = _this.CheckAnotherCustomer;
                    _this.$scope.DraftForm = _this.DraftForm;
                    _this.$scope.SaveCustomer = _this.SaveCustomer;
                    _this.$scope.CreateDiligencePdf = _this.CreateDiligencePdf;
                    _this.$scope.SaveSingleCustomer = _this.SaveSingleCustomer;
                    _this.$scope.CheckAMLConfirm = _this.CheckAMLConfirmedClick;
                    _this.$scope.CheckAML = _this.CheckAMLClicked;
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
                };
                this.GetReportId = function () {
                    var request = {};
                    request.ParentPreCheckId = _this.$scope.AmlGroupId == 0 ? _this.$scope.AmlPreCheckId : _this.$scope.AmlGroupId;
                    _this.diligenceService.GetReportId(request).then(function (result) {
                        _this.$scope.DiligenceReportId = result.ReportId;
                    });
                };
                this.CheckAnotherCustomer = function () {
                    _this.$scope.IsSuccessfullySaved = false;
                    _this.$scope.IsSaveButtonClicked = false;
                    if ((typeof _this.$scope.Customer.PreferredName == 'undefined' || typeof _this.$scope.Customer.IDNumber == 'undefined' || typeof (_this.$scope.Customer.Birthday) == 'undefined' ||
                        typeof _this.$scope.Customer.Nationality == 'undefined' || typeof _this.$scope.Customer.Occupation == 'undefined' || typeof _this.$scope.Customer.Email == 'undefined' || typeof (_this.$scope.Common.Date) == 'undefined' || _this.$scope.Common.PropertyName == '' || typeof (_this.$scope.Common.PropertyName) == 'undefined'
                        || _this.$scope.Customer.PreferredName == "" || _this.$scope.Customer.IDNumber == "" || _this.$scope.Customer.Nationality == "" || _this.$scope.Customer.Occupation == "" || _this.$scope.Customer.Email == "" || _this.$scope.Customer.Birthday == null || _this.$scope.Common.Date == null || typeof (_this.$scope.Common.Date) == 'undefined')) {
                        _this.$scope.IsInvalid = true;
                        return;
                    }
                    else {
                        var request = {};
                        request.AgentId = _this.$scope.AgentId;
                        _this.diligenceService.CheckAmlPricing(request).then(function (result) {
                            _this.$scope.AmlPricing = result;
                            $('#checkAnotherClient').modal('show');
                        });
                    }
                };
                this.ResetFields = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.AvailableBalance = _this.$scope.AmlPricing.AvailableBalance - 1;
                    request.Id = _this.$scope.AmlPricing.Id;
                    _this.GetAMLCreditBalance();
                    _this.diligenceService.UpdateAmlCreditBalance(request).then(function (result) {
                        if (result.IsError) {
                            result.ErrorMessage;
                        }
                        else {
                            _this.SaveCustomer();
                            _this.$scope.AmlPreCheckId = 0;
                            _this.$scope.IsSaveButtonClicked = true;
                            _this.$scope.Customer.PreferredName = "";
                            _this.$scope.Customer.IDNumber = "";
                            _this.$scope.Customer.Nationality = "";
                            _this.$scope.Customer.Occupation = "";
                            _this.$scope.Customer.Email = "";
                            _this.$scope.Customer.Birthday = null;
                            _this.$scope.Common.Owner = "";
                            var element = document.getElementById("widget-grid-0");
                            element.scrollIntoView();
                        }
                    });
                };
                this.GetPropertyLocation = function (arg) {
                    var request = {};
                    request.CountryCode = arg;
                    _this.diligenceService.GetPropertyLocation(request).then(function (result) {
                        if (!result.IsError && result != null) {
                            for (var i = 0; i < result.length; i++) {
                                var location = result[i].Location.split("-");
                                var locationCity = location[1].split("/");
                                for (var x = 0; x < locationCity.length; x++) {
                                    _this.$scope.Locations.push(locationCity[x].trim());
                                }
                            }
                        }
                    });
                };
                this.SaveBasicForm = function () {
                    if (_this.$scope.CustomerDiligent.Q21 || _this.$scope.CustomerDiligent.Q22 || _this.$scope.CustomerDiligent.Q23 || _this.$scope.CustomerDiligent.Q24A
                        || _this.$scope.CustomerDiligent.Q24B || _this.$scope.CustomerDiligent.Q24C || _this.$scope.CustomerDiligent.Q24D || _this.$scope.CustomerDiligent.Q24E
                        || _this.$scope.CustomerDiligent.Q24F || _this.$scope.CustomerDiligent.Q24G || _this.$scope.CustomerDiligent.Q24H || _this.$scope.CustomerDiligent.Q24I
                        || _this.$scope.CustomerDiligent.Q24J) {
                        _this.$scope.IsEnableDetailSection = true;
                    }
                    else {
                        _this.$scope.IsEnableDetailSection = false;
                    }
                    _this.$scope.IsShowAgentForm = true;
                    _this.$scope.IsSaveBasciForm = true;
                };
                this.CreatePdf = function () {
                    $('#loader').show();
                    if (_this.$scope.DiligenceReportId == 0) {
                        var request = {};
                        if (_this.$scope.IsEnableDetailSection) {
                            request.HtmlString = $('#sec_full').html();
                        }
                        else {
                            request.HtmlString = $('#sec_top').html();
                        }
                        request.AgentId = _this.$scope.AgentId;
                        request.UserId = _this.$scope.UserId;
                        request.PropertyName = _this.$scope.Common.PropertyName;
                        request.ParentPreCheckId = _this.$scope.AmlGroupId;
                        request.DraftHtml = $('#draftSection').html();
                        request.IsDraft = false;
                        _this.diligenceService.CreateHtmlPdf(request).then(function (result) {
                            if (result.IsError) {
                                _this.$scope.Ischecked = false;
                            }
                            else {
                                _this.$scope.Ischecked = true;
                                _this.$scope.Pdf = result;
                                _this.$scope.Mail.PdfUrl = result.LocationUrl;
                                _this.$scope.Mail.ReportId = result.ReportId;
                                _this.$scope.IsSaved = true;
                                _this.$scope.IsAmlChecked = false;
                                _this.$scope.Customer = {};
                                _this.$scope.Common = {};
                            }
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        });
                    }
                    else {
                        var updaterequest = {};
                        updaterequest.Id = _this.$scope.DiligenceReportId;
                        updaterequest.AgentId = _this.$scope.AgentId;
                        updaterequest.UserId = _this.$scope.UserId;
                        if (_this.$scope.IsEnableDetailSection) {
                            updaterequest.HtmlString = $('#sec_full').html();
                        }
                        else {
                            updaterequest.HtmlString = $('#sec_top').html();
                        }
                        _this.diligenceService.UpdateDrafttoPdf(updaterequest).then(function (result) {
                            if (result.IsError) {
                                _this.$scope.Ischecked = false;
                            }
                            else {
                                _this.$scope.Ischecked = true;
                                _this.$scope.Mail.PdfUrl = result.LocationUrl;
                                _this.$scope.Mail.ReportId = _this.$scope.DiligenceReportId;
                                _this.$scope.IsSaved = true;
                            }
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        });
                    }
                };
                this.SubmitDocument = function () {
                    _this.CreatePdf();
                };
                this.SendClientMail = function (request) {
                    request.AgentId = _this.$scope.AgentId;
                    request.UserId = _this.$scope.UserId;
                    _this.diligenceService.SendMail(request).then(function (result) {
                        if (result.IsError) {
                            _this.$scope.IsNotSent = true;
                        }
                        else {
                            _this.$scope.IsSent = true;
                            _this.$scope.Mail = {};
                        }
                    });
                };
                this.GetUser = function (id) {
                    if (id != 0) {
                        var request = {};
                        request.UserId = id;
                        _this.diligenceService.GetFullSingle(request).then(function (result) {
                            _this.$scope.Customer = result;
                        });
                    }
                };
                this.CheckAMLClicked = function () {
                    console.log($("#country").val() == -1 ? "" : $("#country").val());
                    console.log($("#state").val() == null ? "" : $("#state").val());
                    _this.$scope.IsInvalid = false;
                    if ((typeof _this.$scope.Customer.PreferredName == 'undefined' || typeof _this.$scope.Customer.IDNumber == 'undefined' || typeof (_this.$scope.Customer.Birthday) == 'undefined' ||
                        typeof _this.$scope.Customer.Nationality == 'undefined' || typeof _this.$scope.Customer.Occupation == 'undefined' || typeof _this.$scope.Customer.Email == 'undefined' || typeof (_this.$scope.Common.Date) == 'undefined' || _this.$scope.Common.PropertyName == '' || typeof (_this.$scope.Common.PropertyName) == 'undefined'
                        || _this.$scope.Customer.PreferredName == "" || _this.$scope.Customer.IDNumber == "" || _this.$scope.Customer.Nationality == "" || _this.$scope.Customer.Occupation == "" || _this.$scope.Customer.Email == "" || _this.$scope.Customer.Birthday == null || _this.$scope.Common.Date == null || typeof (_this.$scope.Common.Date) == 'undefined')) {
                        _this.$scope.IsInvalid = true;
                        return;
                    }
                    if (_this.$scope.AmlPreCheckId == 0 && _this.$scope.AmlGroupId == 0) {
                        _this.GetAMLCreditBalance();
                        $('#startupInfo').modal('show');
                    }
                    else {
                        _this.CheckAMLConfirmedClick();
                    }
                };
                this.GetDiligenceCustomerList = function (arg) {
                    var request = arg;
                    request.Id = _this.$scope.AmlPreCheckId;
                    _this.$scope.CurrentDate = new Date();
                    $('#loader').show();
                    _this.diligenceService.GetDiligenceCustomers(request).then(function (result) {
                        if (result.IsError) {
                            alert(result.ErrorMessage);
                        }
                        else {
                            _this.$scope.DiligenceCustomers = result;
                            if (typeof _this.$scope.AmlGroupId == 'undefined')
                                _this.$scope.AmlGroupId = _this.$scope.DiligenceCustomers.AmlGroupId;
                            _this.$scope.AmlPreCheckId = _this.$scope.DiligenceCustomers.AmlGroupId;
                            var customer = {};
                            customer.Name = arg.Name;
                            customer.IdNumber = arg.IdNumber;
                            _this.$scope.CustomerCollection.push(customer);
                            if (_this.$scope.DiligenceCustomers.IndividualCollection.length == 0 && _this.$scope.DiligenceCustomers.EntityCollection.length == 0) {
                                _this.$scope.amlMessage = true;
                                _this.$scope.IsAmlData = false;
                            }
                            else {
                                _this.$scope.IsAmlData = true;
                            }
                            //this.DraftForm();
                            $('#checkAML').modal('show');
                            _this.$scope.IsAmlChecked = true;
                            $('.spinner').fadeOut();
                            $('.preloader-area').fadeOut();
                        }
                    });
                };
                this.GetAMLCreditBalance = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    _this.diligenceService.CheckAmlPricing(request).then(function (result) {
                        _this.$scope.AmlPricing = result;
                    });
                };
                this.UpdateAmlCreditBalance = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.AvailableBalance = _this.$scope.AmlPricing.AvailableBalance - 1;
                    request.Id = _this.$scope.AmlPricing.Id;
                    _this.diligenceService.UpdateAmlCreditBalance(request).then(function (result) {
                        if (result.IsError)
                            result.ErrorMessage;
                    });
                };
                this.CheckAMLConfirmedClick = function () {
                    _this.UpdateAmlCreditBalance();
                    _this.$scope.amlMessage = false;
                    _this.$scope.IsSaveButtonClicked = false;
                    var request = {};
                    request.Name = _this.$scope.Customer.PreferredName;
                    request.IsIndividual = _this.$scope.IsIndividual;
                    request.AgentId = _this.$scope.AgentId;
                    if (_this.$scope.IsExistingClient)
                        request.UserId = _this.$scope.UserId;
                    else
                        request.UserId = 0;
                    request.IdNumber = _this.$scope.Customer.IDNumber;
                    request.Nationality = _this.$scope.Customer.Nationality;
                    request.Occupation = _this.$scope.Customer.Occupation;
                    request.Birthday = new Date(_this.$scope.Customer.Birthday).toLocaleDateString();
                    request.Owner = _this.$scope.Common.Owner;
                    request.AmlGroupId = _this.$scope.AmlGroupId;
                    request.Email = _this.$scope.Customer.Email;
                    request.AgentId = _this.$scope.AgentId;
                    request.UserId = _this.$scope.UserId;
                    request.PropertyAddress = _this.$scope.Common.PropertyName;
                    request.Date = new Date(_this.$scope.Common.Date).toLocaleDateString();
                    console.log(request);
                    if (_this.$scope.IsIndividual) {
                        document.getElementById("annexEntity").style.display = "none";
                    }
                    else {
                        document.getElementById("annexIndividual").style.display = "none";
                    }
                    request.HtmlString = $('#sec_annex').html();
                    _this.GetDiligenceCustomerList(request);
                };
                this.DraftForm = function () {
                    //$('#loader').show();
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.UserId = _this.$scope.UserId;
                    request.PropertyName = _this.$scope.Common.PropertyName;
                    request.ParentPreCheckId = _this.$scope.AmlGroupId;
                    request.IsDraft = true;
                    request.DraftReport = _this.$scope.CustomerDiligent;
                    request.ReportId = _this.$scope.DiligenceReportId;
                    if (_this.$scope.DiligenceReportId != 0) {
                        _this.diligenceService.DraftExsitingDiligentReport(request).then(function (result) {
                            _this.$scope.DiligenceReportId = result.ReportId;
                            _this.$scope.IsDraft = true;
                            //$('.spinner').fadeOut();
                            //$('.preloader-area').fadeOut();
                        });
                    }
                    else {
                        _this.diligenceService.DraftDiligentReport(request).then(function (result) {
                            _this.$scope.DiligenceReportId = result.ReportId;
                            _this.$scope.IsDraft = true;
                            //$('.spinner').fadeOut();
                            //$('.preloader-area').fadeOut();
                        });
                    }
                };
                this.SaveCustomer = function () {
                    $('#loader').show();
                    var request = {};
                    request.Id = _this.$scope.AmlPreCheckId;
                    request.Name = _this.$scope.Customer.PreferredName;
                    request.IsIndividual = _this.$scope.IsIndividual;
                    request.AgentId = _this.$scope.AgentId;
                    if (_this.$scope.IsExistingClient)
                        request.UserId = _this.$scope.UserId;
                    else
                        request.UserId = 0;
                    request.IdNumber = _this.$scope.Customer.IDNumber;
                    request.Nationality = _this.$scope.Customer.Nationality;
                    request.Occupation = _this.$scope.Customer.Occupation;
                    request.Birthday = new Date(_this.$scope.Customer.Birthday).toLocaleDateString();
                    request.Owner = _this.$scope.Common.Owner;
                    request.AmlGroupId = _this.$scope.AmlGroupId;
                    request.Email = _this.$scope.Customer.Email;
                    request.AgentId = _this.$scope.AgentId;
                    request.UserId = _this.$scope.UserId;
                    request.PropertyAddress = _this.$scope.Common.PropertyName;
                    request.Date = new Date(_this.$scope.Common.Date).toLocaleDateString();
                    console.log(request);
                    if (_this.$scope.IsIndividual) {
                        document.getElementById("annexEntity").style.display = "none";
                    }
                    else {
                        document.getElementById("annexIndividual").style.display = "none";
                    }
                    request.HtmlString = $('#sec_annex').html();
                    _this.$scope.CurrentDate = new Date();
                    _this.diligenceService.SaveCustomer(request).then(function (result) {
                        if (result.IsError) {
                            alert(result.ErrorMessage);
                            $('#loader').hide();
                        }
                        else {
                            _this.$scope.DiligenceCustomers = result;
                            _this.$scope.IsSuccessfullySaved = true;
                            if (typeof _this.$scope.AmlGroupId == 'undefined' || _this.$scope.AmlGroupId == 0)
                                _this.$scope.AmlGroupId = _this.$scope.DiligenceCustomers.AmlGroupId;
                            _this.DraftForm();
                            $('#loader').hide();
                        }
                    });
                };
                this.SaveSingleCustomer = function () {
                    _this.$scope.IsInvalid = false;
                    if ((typeof _this.$scope.Customer.PreferredName == 'undefined' || typeof _this.$scope.Customer.IDNumber == 'undefined' || typeof (_this.$scope.Customer.Birthday) == 'undefined' ||
                        typeof _this.$scope.Customer.Nationality == 'undefined' || typeof _this.$scope.Customer.Occupation == 'undefined' || typeof _this.$scope.Customer.Email == 'undefined' || typeof (_this.$scope.Common.Date) == 'undefined' || _this.$scope.Common.PropertyName == '' || typeof (_this.$scope.Common.PropertyName) == 'undefined'
                        || _this.$scope.Customer.PreferredName == "" || _this.$scope.Customer.IDNumber == "" || _this.$scope.Customer.Nationality == "" || _this.$scope.Customer.Occupation == "" || _this.$scope.Customer.Email == "" || _this.$scope.Customer.Birthday == null || _this.$scope.Common.Date == null || typeof (_this.$scope.Common.Date) == 'undefined')) {
                        _this.$scope.IsInvalid = true;
                        return;
                    }
                    else {
                        $('#loader').show();
                        var request = {};
                        request.Id = _this.$scope.AmlPreCheckId > 0 ? _this.$scope.AmlPreCheckId : _this.$scope.AmlPreCheckId;
                        request.Name = _this.$scope.Customer.PreferredName;
                        request.IsIndividual = _this.$scope.IsIndividual;
                        request.AgentId = _this.$scope.AgentId;
                        if (_this.$scope.IsExistingClient)
                            request.UserId = _this.$scope.UserId;
                        else
                            request.UserId = 0;
                        request.IdNumber = _this.$scope.Customer.IDNumber;
                        request.Nationality = _this.$scope.Customer.Nationality;
                        request.Occupation = _this.$scope.Customer.Occupation;
                        request.Birthday = new Date(_this.$scope.Customer.Birthday).toLocaleDateString();
                        request.Owner = _this.$scope.Common.Owner;
                        request.AmlGroupId = _this.$scope.AmlGroupId;
                        request.Email = _this.$scope.Customer.Email;
                        request.AgentId = _this.$scope.AgentId;
                        request.GroupId = typeof _this.$scope.AmlGroupId == 'undefined' || _this.$scope.AmlGroupId == 0 ? 0 : _this.$scope.AmlGroupId;
                        request.PropertyAddress = _this.$scope.Common.PropertyName;
                        request.Date = new Date(_this.$scope.Common.Date).toLocaleDateString();
                        console.log(request);
                        if (_this.$scope.IsIndividual) {
                            document.getElementById("annexEntity").style.display = "none";
                        }
                        else {
                            document.getElementById("annexIndividual").style.display = "none";
                        }
                        request.HtmlString = $('#sec_annex').html();
                        _this.$scope.CurrentDate = new Date();
                        _this.diligenceService.SaveCustomer(request).then(function (result) {
                            if (result.IsError) {
                                alert(result.ErrorMessage);
                            }
                            else {
                                _this.$scope.DiligenceCustomers = result;
                                if (typeof _this.$scope.AmlGroupId == 'undefined' || _this.$scope.AmlGroupId == 0)
                                    _this.$scope.AmlGroupId = _this.$scope.DiligenceCustomers.AmlGroupId;
                                _this.DraftForm();
                                _this.$window.location.pathname = "/Diligence/Index/";
                            }
                        });
                    }
                };
                this.SaveDiligenceCustomer = function (arg) {
                    var request = arg;
                    _this.$scope.CurrentDate = new Date();
                    $('#loader').show();
                    _this.diligenceService.SaveCustomer(request).then(function (result) {
                        if (result.IsError) {
                            alert(result.ErrorMessage);
                            $('#loader').hide();
                        }
                        else {
                            _this.$scope.DiligenceCustomers = result;
                            _this.$scope.IsSuccessfullySaved = true;
                            if (typeof _this.$scope.AmlGroupId == 'undefined' || _this.$scope.AmlGroupId == 0)
                                _this.$scope.AmlGroupId = _this.$scope.DiligenceCustomers.AmlGroupId;
                            _this.DraftForm();
                            $('#loader').hide();
                        }
                    });
                };
                this.CreateDiligencePdf = function () {
                    var request = {};
                    request.AgentId = _this.$scope.AgentId;
                    request.Id = _this.$scope.AmlPreCheckId;
                    request.HtmlString = $("#diligence_report").html();
                    _this.diligenceService.CreateDiligencePdf(request).then(function (result) {
                        _this.$scope.IsGenarated = true;
                    });
                };
                $('#loader').show();
                $scope.CustomerDiligent = {};
                $scope.Customer = {};
                $scope.CreatePdf = {};
                $scope.Pdf = {};
                $scope.Mail = {};
                $scope.AmlPricing = {};
                $scope.SalesPersonDeclaration = {};
                $scope.Common = {};
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
            CreateDiligenceController.$inject = ['$scope', '$timeout', '$window', 'DiligenceService'];
            return CreateDiligenceController;
        }());
        diligence.CreateDiligenceController = CreateDiligenceController;
    })(diligence = controllers.diligence || (controllers.diligence = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=diligent.creatediligence.controller.js.map