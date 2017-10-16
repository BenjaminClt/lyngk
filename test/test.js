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
    var intersections = engine.getIntersections();

    for (var i = 0; i < 43; i++)
    {
        intersections[i].setPiece(new Lyngk.Piece(Lyngk.Color.WHITE));
    }

    var valid = true;
    for (var i = 0; i < 43; i++)
    {
        if (intersections[i].getState() !== Lyngk.State.ONE_PIECE)
            valid = false;
    }

    assertTrue(valid);
};

LyngkTestCase.prototype.testInitEightPiece = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var intersections = engine.getIntersections();

    var countColors2 = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < 43; i++)
    {
        countColors2[intersections[i].getColor()]++;
    }

    var valid = true;
    for(var i = 0; i < 6; i++)
    {
        if(i <= 4 && countColors2[i] !== 8)
            valid = false;

        else if(i === 5 && countColors2[i] !== 3)
            valid = false;
    }

    assert(valid);
};

LyngkTestCase.prototype.testStackHeight = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var intersections = engine.getIntersections();

    var valid = true;
    for(var i = 0; i < 43; i++)
    {
        if (intersections[i].getStackHeight() !== 1)
            valid = false;
    }

    assert(valid);
};

LyngkTestCase.prototype.testStackColor = function()
{
    var engine = new Lyngk.Engine();
    var inter = engine.getIntersection("A3");

    inter.setPiece(new Lyngk.Piece(Lyngk.Color.WHITE));
    inter.setPiece(new Lyngk.Piece(Lyngk.Color.BLACK));
    inter.setPiece(new Lyngk.Piece(Lyngk.Color.BLUE));

    assertEquals(inter.getColor(), Lyngk.Color.BLUE);
};

LyngkTestCase.prototype.testMovePiece = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");

    var colorA3 = interA3.getColor();

    engine.move(interA3, interB3);

    assertEquals(interB3.getColor(), colorA3);
    assertEquals(interA3.getStackHeight(), 0);
};

LyngkTestCase.prototype.testMoveStack = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interB2 = engine.getIntersection("B2");

    var colorA3 = interA3.getColor();

    engine.move(interA3, interB3);
    engine.move(interB3, interB2);

    assertEquals(interB2.getColor(), colorA3);
    assertEquals(interB3.getStackHeight(), 0);
};