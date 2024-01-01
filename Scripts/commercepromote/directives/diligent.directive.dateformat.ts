
module directives.diligent {
    export class DateFormat implements ng.IDirective {

        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => void;
        public require = "ngModel";

        constructor($filter: ng.IFilterService) {
            this.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => {
                ngModel.$parsers.push(function (data) {
                    //convert data from view format to model format
                    var date = parseDate(data);
                    return date.toLocaleDateString();//converted
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

                const parseDate = dateStr => {
                    var returnedDate = new Date();
                    if (dateStr != 'undefined' && dateStr != null) {
                   
                        const parts = dateStr.split('/');
                        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                        const day = Number(parts[0]);
                        const month = Number(months.indexOf(parts[1].toLowerCase()));
                        const year = Number(parts[2]);
                        returnedDate = new Date(year, month, day);
                    }
                    return returnedDate;
                   
                }

            };
        }

        public static Factory(): ng.IDirectiveFactory {
            var directive = ($filter: ng.IFilterService) => {
                return new DateFormat($filter);

            }
            return directive;
        }
    }
}