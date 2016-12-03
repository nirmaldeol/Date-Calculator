#!/usr/bin/env node

'use strict'
var valid = require('./validator');
var helper = require('./helper');
var calc = require('./calculator');
process.stdout.write("************************************************************************************" + "\n");
process.stdout.write("This Application will accept two dates and return difference of days between them" + "\n");
process.stdout.write("************************************************************************************" + "\n")
process.stdout.write("Please enter all dates in dd/mm/yyyy Format " + "\n");
ask("Please enter Start Date for Project", valid.validDate, function(startDate) {  
    ask("Please enter an End Date for Project", valid.validDate, function(endDate) {    

        var startObj = helper.dateSplitter(startDate);
        var endObj = helper.dateSplitter(endDate);
        var dateswap = valid.verifyDates(startObj, endObj);
        if (dateswap) {
            var calculated_days = calc.calculator(startObj, endObj);
        } else {
            var calculated_days = calc.calculator(endObj, startObj);
        }
        process.stdout.write("Days of experiment Between given dates: " + calculated_days);
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
            stdout.write("Dates should use all numebers in dd/mm/yyyy format " + "\n");
            ask(question, valid, callback);
        }
    });
}