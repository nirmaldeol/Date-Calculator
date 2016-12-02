var helper = require('./helper');
var self = {};

self.verifyDates = function(start, end) {
    if (start.year > end.year) {
        return false;
    } else if (start.year == end.year && start.month > end.month) {
        return false;
    } else if (start.year == end.year && start.month == end.month && start.day > end.day) {
        return false;
    }
    return true;
};
self.validDate = function(date) {
    var valid;
    var dateObj = helper.dateSplitter(date);
    if (dateObj) {
        var checkedYear = checkYear(dateObj.year);
        var checkedMonth = checkMonth(dateObj.month);
        var checkedDay = checkDay(dateObj);
        valid = checkedYear && checkedMonth && checkedDay;
        return valid;
    }
    return false;
}


checkYear = function(year) {

    return year <= 2999 && year >= 1901 ? true : false
}

checkMonth = function(month) {

    return month <= 12 && month > 0 ? true : false

}


checkDay = function(obj) {
    var valid;
    var day = obj.day;
    var daysInMonth = helper.getDaysInMonth(obj.month, obj.year);
    if (day <= daysInMonth) {
        return true;
    } else {
        return false;
    }
}


module.exports = self;