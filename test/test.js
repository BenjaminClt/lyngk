'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testCoordinate = function()
{
    var testCoord = new Lyngk.Coordinates('A', 1);

    assertFalse(testCoord.isValid());
};