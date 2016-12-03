var calc = require('../calculator');
var helper = require('../helper');
var assert = require('chai').assert;
var expect = require('chai').expect;

var date1 = ['02/06/1983', '22/06/1983'];
var date2 = ['04/07/1984', '25/12/1984'];
var date3 = ['03/08/1983', '03/01/1989'];

var start1 = helper.dateSplitter(date1[0]);
var start2 = helper.dateSplitter(date2[0]);
var start3 = helper.dateSplitter(date3[0]);
var end1 = helper.dateSplitter(date1[1]);
var end2 = helper.dateSplitter(date2[1]);
var end3 = helper.dateSplitter(date3[1]);




describe("Helper Liberary test", function() {

    it("Calcutator should return right difference between two dates", function() {
        var dayDiff1 = calc.calculator(start1, end1);
        var dayDiff2 = calc.calculator(start2, end2);
        var dayDiff3 = calc.calculator(start3, end3);
        expect(dayDiff1).to.be.equal(19);
        expect(dayDiff2).to.be.equal(173);
        expect(dayDiff3).to.be.equal(1979);



    });

});