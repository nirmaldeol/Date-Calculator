var helper = require('./helper');
var self = {};

self.calculator = function(start, end) {
    var yearsCount = complete_year_Days(start, end);
    var monthsCount = complete_months_days(start, end);
    var daysCount = otherDays(start, end);
    var experimentCount = (yearsCount + monthsCount + daysCount);
    return experimentCount;

};


function complete_year_Days(start, end) {
    var days;
    var years_array = [];
    var years_Days;
    var leap_year_array;
    var yearsDiff = end.year - start.year;
    if (yearsDiff > 1) {
        years_array = helper.getArray(start.year, end.year)
        leap_year_array = years_array.filter(function(i) { return i % 4 === 0 });
        years_Days = (years_array.length * 365) + leap_year_array.length;
    } else {
        years_Days = 0;
    }
    return years_Days;
};


function complete_months_days(start, end) {
    var totalDays = 0;
    if (start.year === end.year && start.month !== end.month) {
        var all_months = [];
        all_months = helper.getArray(start.month, end.month);
        totalDays = helper.getDayFormonths(all_months, start.year)


    } else if (start.year !== end.year) {
        var start_year_months;
        var end_year_months;
        var start_year_days;
        var end_year_days;
        start_year_months = helper.getArray(start.month, 13);
        end_year_months = helper.getArray(0, end.month);
        start_year_days = helper.getDayFormonths(start_year_months, start.year);
        end_year_days = helper.getDayFormonths(end_year_months, end.year);
        totalDays = start_year_days + end_year_days;
    } else {
        totalDays = 0;
    }

    return totalDays;
};

function otherDays(start, end) {
    var total_days = 0;
    if (start.year == end.year && start.month == end.month) {
        total_days = (end.day - start.day) - 1;
    } else {
        var daysInStart = helper.getDaysInMonth(start.month, start.year);
        var startDiff = daysInStart - start.day;
        total_days = (startDiff + end.day) - 1;

    }

    return total_days;
};

module.exports = self;