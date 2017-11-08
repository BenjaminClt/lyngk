"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Players = {PLAYER1: 0, PLAYER2:1 };

Lyngk.Engine = function () {
    var intersections;
    var currentPlayer;

    var init = function(){
        var letters = "ABCDEFGHI";
        intersections = [];
        currentPlayer = Lyngk.Players.PLAYER1;

        for (var i = 0; i < letters.length; i++)
        {
            for (var j = 1; j < 10; j++)
            {
                var coord = new Lyngk.Coordinates(letters[i], j);

                if (coord.isValid())
                    intersections.push(new Lyngk.Intersection(coord));
            }
        }
    };

    this.getCurrentPlayer = function () {
        return currentPlayer;
    };

    this.getIntersections = function () {
        return intersections;
    };

    this.getIntersection = function (c) {
        for (var i = 0; i < intersections.length; i++)
        {
            if (intersections[i].getCoordinate().toString() === c)
                return intersections[i];
        }

        return null;
    };

    this.move = function (inter1, inter2) {
        if (validMove(inter1, inter2))
        {
            var pieces = inter1.takePieces();

            for (var i = 0; i < pieces.length; i++)
            {
                inter2.setPiece(pieces[i]);
            }
        }
    };

    var validMove = function(inter1, inter2)
    {
        if (inter2.getState() === Lyngk.State.VACANT)
            return false;

        if (inter2.getStackHeight() > inter1.getStackHeight())
            return false;

        if (inter1.getState() === Lyngk.State.FULL_STACK || inter2.getState() === Lyngk.State.FULL_STACK)
            return false;

        if (inter1.getState() === Lyngk.State.ONE_PIECE && inter2.getState() === Lyngk.State.STACK)
            return false;

        var inter1Pieces = inter1.getPieces();
        for (var i = 0; i < inter1.getStackHeight(); i++)
        {
            var color = inter1Pieces[i].getColor();
            if (color !== Lyngk.Color.WHITE && inter2.containsColor(color))
            {
                return false;
            }
        }

        var c1 = inter1.getCoordinate();
        var c2 = inter2.getCoordinate();

        var lDiff = c1.getLine() - c2.getLine();
        var cDiff = c1.getColumn().charCodeAt(0) - c2.getColumn().charCodeAt(0);


        if((cDiff === 0 && Math.abs(lDiff) === 1) || (cDiff === -1 && (lDiff === 0 || lDiff === -1)) || (cDiff === 1 && (lDiff === 0 || lDiff === 1)))
        {
            currentPlayer = (currentPlayer + 1) % 2;
            return true;
        }

        return false;
    };

    this.initWhite = function () {
        for (var i = 0; i < intersections.length; i++)
        {
            intersections[i].setPiece(new Lyngk.Piece(Lyngk.Color.WHITE));
        }
    };

    this.initStart = function(){
        var colors = [8,8,8,8,8,3];

        for (var i = 0; i < intersections.length; i++) {
            var color;

            do{
                color = Math.floor(Math.random() * 6);
            }while(colors[color] <= 0);

            colors[color]--;
            intersections[i].setPiece(new Lyngk.Piece(color));
        }
    };

    init();
};
