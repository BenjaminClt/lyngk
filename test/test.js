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
    engine.initWhite();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interB2 = engine.getIntersection("B2");

    var colorA3 = interA3.getColor();

    engine.move(interA3, interB3);
    engine.move(interB3, interB2);

    assertEquals(interB2.getColor(), colorA3);
    assertEquals(interB3.getStackHeight(), 0);
};

LyngkTestCase.prototype.testMoveStackEmptyIntersection = function()
{
    var engine = new Lyngk.Engine();
    engine.initWhite();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interB2 = engine.getIntersection("B2");

    engine.move(interA3, interB3);
    engine.move(interB3, interB2);

    var l = interB2.getStackHeight();
    engine.move(interB2, interB3);

    assertEquals(interB3.getStackHeight(), 0);
    assertEquals(interB2.getStackHeight(), l);
};

LyngkTestCase.prototype.testMove = function()
{
    var engine = new Lyngk.Engine();
    engine.initWhite();

    var interB2 = engine.getIntersection("B2");
    var interB3 = engine.getIntersection("B3");
    var interC2 = engine.getIntersection("C2");

    engine.move(interB2, interB3);
    var l = interB3.getStackHeight();

    engine.move(interC2, interB3);

    assertEquals(interB3.getStackHeight(), l);
};

LyngkTestCase.prototype.testMoveOne = function()
{
    var engine = new Lyngk.Engine();
    engine.initWhite();

    var interI7 = engine.getIntersection("I7");
    var interH5 = engine.getIntersection("H5");
    var interH6 = engine.getIntersection("H6");
    var interH8 = engine.getIntersection("H8");
    var interF3 = engine.getIntersection("F3");
    var interF5 = engine.getIntersection("F5");

    engine.move(interI7, interH6);
    engine.move(interH6, interH5);

    var l = interH5.getStackHeight();

    engine.move(interH5, interH8);
    engine.move(interH5, interF5);
    engine.move(interH5, interF3);

    assertEquals(interH5.getStackHeight(), l);
};

LyngkTestCase.prototype.testStackHeightMove = function()
{
    var engine = new Lyngk.Engine();
    engine.initWhite();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interC3 = engine.getIntersection("C3");
    var interD3 = engine.getIntersection("D3");
    var interE3 = engine.getIntersection("E3");
    var interF3 = engine.getIntersection("F3");

    engine.move(interA3, interB3);
    engine.move(interB3, interC3);
    engine.move(interC3, interD3);
    engine.move(interD3, interE3);
    engine.move(interE3, interF3);

    assertEquals(interE3.getStackHeight(), 5);
    assertEquals(interF3.getStackHeight(), 1);
};

LyngkTestCase.prototype.testOnePieceMove = function()
{
    var engine = new Lyngk.Engine();
    engine.initWhite();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interC3 = engine.getIntersection("C3");

    engine.move(interA3, interB3);
    engine.move(interC3, interB3);

    assertEquals(interB3.getStackHeight(), 2);
};

LyngkTestCase.prototype.testSuppMove = function()
{
    var engine = new Lyngk.Engine();
    engine.initWhite();

    var interI7 = engine.getIntersection("I7");
    var interH6 = engine.getIntersection("H6");

    var interG4 = engine.getIntersection("G4");
    var interG5 = engine.getIntersection("G5");
    var interG6 = engine.getIntersection("G6");

    engine.move(interI7, interH6);

    engine.move(interG4, interG5);
    engine.move(interG5, interG6);

    engine.move(interH6, interG6);

    assertEquals(interH6.getStackHeight(), 2);
    assertEquals(interG6.getStackHeight(), 3);
};

LyngkTestCase.prototype.testColors = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var interG4 = engine.getIntersection("G4");
    var interG5 = engine.getIntersection("G5");
    var interG6 = engine.getIntersection("G6");
    var interG7 = engine.getIntersection("G7");
    var interG8 = engine.getIntersection("G8");

    engine.move(interG4, interG5);
    engine.move(interG5, interG6);
    engine.move(interG6, interG7);
    engine.move(interG7, interG8);

    assertFalse(interG8.getStackHeight() === 5);
};

LyngkTestCase.prototype.testStartPlayerOne = function()
{
    var engine = new Lyngk.Engine();

    assertEquals(engine.getCurrentPlayer(), Lyngk.Players.PLAYER1);
};

LyngkTestCase.prototype.testCurrentPlayer = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var interG4 = engine.getIntersection("G4");
    var interG5 = engine.getIntersection("G5");

    engine.move(interG4, interG5);

    assertEquals(engine.getCurrentPlayer(), Lyngk.Players.PLAYER2);
};

LyngkTestCase.prototype.testClaimedColor = function()
{
    var engine = new Lyngk.Engine();
    engine.initStart();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");

    engine.claim(Lyngk.Color.RED);
    engine.move(interA3, interB3);
    engine.claim(Lyngk.Color.GREEN);

    var claimedColorsP1 = engine.getClaimedColors(Lyngk.Players.PLAYER1);
    var claimedColorsP2 = engine.getClaimedColors(Lyngk.Players.PLAYER2);

    assertEquals(claimedColorsP1[0], Lyngk.Color.RED);
    assertEquals(claimedColorsP2[0], Lyngk.Color.GREEN);
};

LyngkTestCase.prototype.testOnePoint = function() {
    var engine = new Lyngk.Engine();
    engine.initStart();

    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interH6 = engine.getIntersection("H6");
    var interH7 = engine.getIntersection("H7");
    var interG5 = engine.getIntersection("G5");
    var interG6 = engine.getIntersection("G6");
    var interC3 = engine.getIntersection("C3");
    var interC2 = engine.getIntersection("C2");
    var interD2 = engine.getIntersection("D2");

    engine.claim(Lyngk.Color.BLUE);
    engine.move(interA3, interB3);
    engine.move(interH6, interG5);
    engine.move(interB3, interC3);
    engine.move(interG5, interG6);
    engine.move(interC3, interC2);
    engine.move(interG6, interH7);
    engine.move(interC2, interD2);

    assertEquals(engine.getNbPieces(), 38);
    assertEquals(engine.getScore(Lyngk.Players.PLAYER1), 1);
};