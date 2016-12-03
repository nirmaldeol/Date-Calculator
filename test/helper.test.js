var helper = require('../helper');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe("Helper Liberary test", function() {

    it("Splitter should Split an array of dates and return and object  of date values ", function() {
        var date = "22/11/2015";
        var foo = helper.dateSplitter(date);
        expect(foo).to.be.a('object');
        expect(foo).to.have.property("day").to.equal(22);
        expect(foo).to.have.property("month").to.equal(11);
        expect(foo).to.have.property("year").to.equal(2015);
    });
    it("DaysInMonth should return right days in month ", function() {
        var month = 2;
        var year = 2016;
        var foo = helper.getDaysInMonth(month, year);
        expect(foo).to.be.equal(29);
    });
    it("Get array funtion should return an array of months between given values ", function() {
        var x = 2;
        var y = 8;
        var foo = helper.getArray(2, 8);
        expect(foo).to.have.length(5);
        expect(foo).to.be.eql([3, 4, 5, 6, 7]);
    });



});