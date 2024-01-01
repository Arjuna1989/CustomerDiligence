var directives;
(function (directives) {
    var diligent;
    (function (diligent) {
        var DateFormat = /** @class */ (function () {
            function DateFormat($filter) {
                this.require = "ngModel";
                this.link = function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (data) {
                        //convert data from view format to model format
                        var date = parseDate(data);
                        return date.toLocaleDateString(); //converted
                    });
                    ngModel.$formatters.push(function (data) {
                        //convert data from model format to view format
                        var dateFormat = "dd/MMM/yyyy";
                        var pDate = Date.parse(data);
                        var result = "";
                        if (data) {
                            result = $filter("date")(new Date(pDate), dateFormat);
                        }
                        return result;
                    });
                    var parseDate = function (dateStr) {
                        var returnedDate = new Date();
                        if (dateStr != 'undefined' && dateStr != null) {
                            var parts = dateStr.split('/');
                            var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                            var day = Number(parts[0]);
                            var month = Number(months.indexOf(parts[1].toLowerCase()));
                            var year = Number(parts[2]);
                            returnedDate = new Date(year, month, day);
                        }
                        return returnedDate;
                    };
                };
            }
            DateFormat.Factory = function () {
                var directive = function ($filter) {
                    return new DateFormat($filter);
                };
                return directive;
            };
            return DateFormat;
        }());
        diligent.DateFormat = DateFormat;
    })(diligent = directives.diligent || (directives.diligent = {}));
})(directives || (directives = {}));
//# sourceMappingURL=diligent.directive.dateformat.js.map