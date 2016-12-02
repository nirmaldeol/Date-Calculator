// #!/usr/bin/env node
'use strict'
var valid = require('./validator');
var helper = require('./helper');
var calc = require('./calculator')



ask("Please enter date in dd/mm/yyy format", valid.validDate, function(startDate) {  
    ask("Please enter EndDate in dd/mm/yyy format", valid.validDate, function(endDate) {    
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
            stdout.write("It should match: dd/mm/yyyy " + "\n");
            ask(question, validator, callback);
        }
    });
}