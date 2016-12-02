// #!/usr/bin/env node
'use strict'




ask("Please enter date in dd/mm/yyy format", validDate, function(startDate) {  
    ask("Please enter EndDate in dd/mm/yyy format", validDate, function(endDate) {    
        var startObj = dateSplitter(startDate);
        var endObj = dateSplitter(endDate);
        var dateswap = verifyDates(startObj, endObj);
        if (dateswap) {
            var calculated_days = calculator(startObj, endObj);
        } else {
            var calculated_days = calculator(endObj, startObj);
        }
        console.log("Days of experiment Between given dates: " + calculated_days);
        process.exit();  
    });
});


function ask(question, valid, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
        data = data.toString().trim();

        if (valid(data)) {
            callback(data);
        } else {
            stdout.write("It should match: dd/mm/yyyy " + "\n");
            ask(question, validator, callback);
        }
    });
}

function verifyDates(start, end) {
    if (start.year > end.year) {
        return false;
    } else if (start.year == end.year && start.month > end.month) {
        return false;
    } else if (start.year == end.year && start.month == end.month && start.day > end.day) {
        return false;
    }

    return true;

}

// var days = verifyDates({ year: 2000, month: 2, day: 2 }, { year: 2000, month: 2, day: 10 });
// console.log(days);


function calculator(start, end) {
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
        years_array = getArray(start.year, end.year)
        leap_year_array = years_array.filter(function(i) { return i % 4 === 0 });
        years_Days = (years_array.length * 365) + leap_year_array.length;
    } else {
        years_Days = 0;
    }
    console.log(leap_year_array);
    return years_Days;
}


function complete_months_days(start, end) {
    var totalDays = 0;
    if (start.year === end.year && start.month !== end.month) {
        var all_months = [];
        all_months = getArray(start.month, end.month);
        totalDays = getDayFormonths(all_months, start.year)


    } else if (start.year !== end.year) {
        var start_year_months;
        var end_year_months;
        var start_year_days;
        var end_year_days;
        start_year_months = getArray(start.month, 13);
        end_year_months = getArray(0, end.month);
        start_year_days = getDayFormonths(start_year_months, start.year);
        end_year_days = getDayFormonths(end_year_months, end.year);
        totalDays = start_year_days + end_year_days;
    } else {
        totalDays = 0;
    }

    return totalDays;
}

function otherDays(start, end) {
    var total_days = 0;
    if (start.year == end.year && start.month == end.month) {
        total_days = (end.day - start.day) - 1;
    } else {
        var daysInStart = getDaysInMonth(start.month, start.year);
        var startDiff = daysInStart - start.day;
        total_days = (startDiff + end.day) - 1;

    }

    return total_days;
}

function getDayFormonths(a, year) {
    var days = 0;
    a.forEach(function(x) {
        days += getDaysInMonth(x, year);
    });
    return days;
}

function getArray(x, y) {
    var any_array = [];
    for (var i = x + 1; i < y; i++) {
        any_array.push(i);
    }
    console.log("array" + any_array);
    return any_array;
}




function validDate(date) {
    var valid;
    var dateObj = dateSplitter(date);
    if (dateObj) {
        var checkedYear = checkYear(dateObj.year);
        var checkedMonth = checkMonth(dateObj.month);
        var checkedDay = checkDay(dateObj);
        valid = checkedYear && checkedMonth && checkedDay;
        return valid;
    }
    return false;
}



function dateSplitter(date) {
    var newDate = date.split('/');
    var dateObj = {
        day: parseInt(newDate[0]),
        month: parseInt(newDate[1]),
        year: parseInt(newDate[2])
    }
    return dateObj;
}

function checkYear(year) {

    return year <= 2999 && year >= 1901 ? true : false
}

function checkMonth(month) {

    return month <= 12 && month > 0 ? true : false

}

function getDaysInMonth(month, year) {
    var daysInMonth;

    if ([11, 9, 6, 4].indexOf(month) > -1) {
        daysInMonth = 30;
    } else if (month == 2 && year % 4 == 0) {
        daysInMonth = 29;
    } else if (month == 2 && year % 4 != 0) {
        daysInMonth = 28;
    } else if (month != 0) {
        daysInMonth = 31;
    }
    console.log(month)
    return daysInMonth
}

function checkDay(obj) {
    var valid;
    var month = obj.month;
    var year = obj.year;
    var day = obj.day;
    var daysInMonth = getDaysInMonth(month, year);


    if (day <= daysInMonth) {
        valid = true
    } else {
        valid = false;
    }
    return valid;

}