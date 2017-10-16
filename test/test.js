'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testCoordinate = function()
{
    var testCoord = new Lyngk.Coordinates('A', 1);
    assertFalse(testCoord.isValid());
};

LyngkTestCase.prototype.test43ValidCoordinate = function()
{
    var count = 0;
    var letters = "ABCDEFGHI";

    for (var i = 0; i < letters.length; i++)
    {
        for (var j = 1; j < 10; j++)
        {
            var tmpCoord = new Lyngk.Coordinates(letters[i], j);

            if (tmpCoord.isValid())
                count++;
        }
    }

    assertEquals(count, 43);
};

LyngkTestCase.prototype.testStringCoordinate = function()
{
    var testCoord = new Lyngk.Coordinates('A', 3);

    assertEquals(testCoord.toString(), "A3");
};

LyngkTestCase.prototype.testStringInvalidCoordinate = function()
{
    var testCoord = new Lyngk.Coordinates('A', 1);

    assertEquals(testCoord.toString(), "invalid");
};

LyngkTestCase.prototype.testCloneCoordinate = function()
{
    var testCoord1 = new Lyngk.Coordinates('A', 3);
    var testCoord2 = testCoord1.clone();

    assertEquals(testCoord1.toString(), testCoord2.toString());
};

LyngkTestCase.prototype.testCoordinateHash = function(){
    var testCoord = new Lyngk.Coordinates('A', 3);

    assertEquals(testCoord.hash(), 653);
};

LyngkTestCase.prototype.testIntersectionDefaultState = function()
{
    var testInter = new Lyngk.Intersection(653);

    assertEquals(testInter.getState(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testBlueIntersection = function()
{
    var testInter = new Lyngk.Intersection(653);
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.BLUE));

    assertEquals(testInter.getState(), Lyngk.State.ONE_PIECE);
    assertEquals(testInter.getColor(), Lyngk.Color.BLUE);
};

LyngkTestCase.prototype.testRedBlueIntersection = function()
{
    var testInter = new Lyngk.Intersection(653);
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.BLUE));
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.RED));

    assertEquals(testInter.getState(), Lyngk.State.STACK);
    assertEquals(testInter.getColor(), Lyngk.Color.RED);
};

LyngkTestCase.prototype.test5PiecesIntersection = function()
{
    var testInter = new Lyngk.Intersection(653);
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.BLUE));
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.RED));
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.RED));
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.RED));
    testInter.setPiece(new Lyngk.Piece(Lyngk.Color.BLACK));

    assertEquals(testInter.getState(), Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.testInitOnePiece = function()
{
    var engine = new Lyngk.Engine();
    for (var i = 0; i < 43; i++)
    {
        engine.setPiece(i, new Lyngk.Piece(Lyngk.Color.WHITE));
    }

    var valid = true;
    for (var i = 0; i < 43; i++)
    {
        if (engine.getIntersection(i).getState() !== Lyngk.State.ONE_PIECE)
            valid = false;
    }

    assertTrue(valid);
};

LyngkTestCase.prototype.testInitEightPiece = function()
{
    var engine = new Lyngk.Engine();

    var countColors1 = [8,8,8,8,8,3];
    for (var i = 0; i < 43; i++) {

        var randomColor;
        do{
            randomColor = Math.floor(Math.random() * 6);
        }while(countColors1[randomColor] <= 0)
        countColors1[randomColor]--;

        engine.setPiece(i, new Lyngk.Piece(randomColor));
    }

    var countColors2 = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 43; i++)
    {
        countColors2[engine.getIntersection(i).getColor()]++;
    }

    var valid = true;
    for(var i = 0; i < 6; i++)
    {
        if(i <= 4 && countColors2[i] != 8)
            valid = false;

        else if(i == 5 && countColors2[i] != 3)
            valid = false;
    }

    assert(valid);
};