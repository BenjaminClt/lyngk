"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Players = {PLAYER1: 0, PLAYER2: 1};

Lyngk.Engine = function () {
    var intersections = [];
    var currentPlayer;
    var scorePlayers = [];
    var claimedColorsP1 = [];
    var claimedColorsP2 = [];

    var initVariables = function () {
        intersections = [];
        claimedColorsP1 = [];
        claimedColorsP2 = [];
        scorePlayers = [];
        scorePlayers[0] = 0;
        scorePlayers[1] = 0;
        currentPlayer = Lyngk.Players.PLAYER1;
    };

    var initIntersections = function (letter) {
        var index = 0;
        for (index = 0; index < 10; index += 1) {
            var coord = new Lyngk.Coordinates(letter, index);

            if (coord.isValid()) {
                intersections.push(new Lyngk.Intersection(coord));
            }
        }
    };

    var init = function () {
        initVariables();
        initIntersections();

        var letters = "ABCDEFGHI";
        var index = 0;

        for (index = 0; index < letters.length; index += 1) {
            initIntersections(letters[index]);
        }
    };

    this.getCurrentPlayer = function () {
        return currentPlayer;
    };

    this.getIntersections = function () {
        return intersections;
    };

    this.getNbPieces = function () {
        var nb = 0;
        var index = 0;

        for (index = 0; index < intersections.length; index += 1) {
            nb += intersections[index].getStackHeight();
        }

        return nb;
    };

    this.getScore = function (p) {
        return scorePlayers[p];
    };

    this.getIntersection = function (c) {
        var index = 0;
        for (index = 0; index < intersections.length; index += 1) {
            if (intersections[index].getCoordinate().toString() === c) {
                return intersections[index];
            }
        }

        return null;
    };

    this.claim = function (c) {
        if (currentPlayer === Lyngk.Players.PLAYER1) {
            claimedColorsP1.push(c);
        }
        else {
            claimedColorsP2.push(c);
        }
    };

    this.getClaimedColors = function (p) {
        if (p === Lyngk.Players.PLAYER1) {
            return claimedColorsP1;
        }

        return claimedColorsP2;
    };

    this.move = function (inter1, inter2) {
        if (validMove(inter1, inter2)) {
            var pieces = inter1.takePieces();
            var index = 0;

            for (index = 0; index < pieces.length; index += 1) {
                inter2.setPiece(pieces[index]);
            }

            checkPoint(inter2);
            changePlayer();

        }
    };

    var checkPoint = function (inter2) {
        var claimedColors = this.getClaimedColors(currentPlayer);
        var containColor = claimedColors.indexOf(inter2.getColor()) >= 0;
        var isFullStack = inter2.getState() === Lyngk.State.FULL_STACK;

        if (isFullStack && containColor) {
            scorePlayers[currentPlayer]++;
            inter2.takePieces();
        }
    };

    var changePlayer = function () {
        currentPlayer = (currentPlayer + 1) % 2;
    };

    var checkContainsColor = function (inter1, inter2) {
        var index = 0;
        var inter1Pieces = inter1.getPieces();
        for (index = 0; index < inter1.getStackHeight(); index += 1) {
            var color = inter1Pieces[index].getColor();

            if (color !== Lyngk.Color.WHITE && inter2.containsColor(color)) {
                return false;
            }
        }

        return true;
    };

    var checkOneCase = function (inter1, inter2) {

        var c1 = inter1.getCoordinate();
        var c2 = inter2.getCoordinate();

        var lDiff = c1.getLine() - c2.getLine();
        var cDiff = c1.getColumn().charCodeAt(0) - c2.getColumn().charCodeAt(0);

        switch (cDiff) {
            case 0:
                return Math.abs(lDiff) === 1;
            case 1:
                return lDiff === 0 || lDiff === 1;
            case -1:
                return lDiff === 0 || lDiff === -1;
        }

        return false;
    };

    var checkClaimedColor = function (inter1) {
        var colorP1Exists = claimedColorsP1.indexOf(inter1.getColor()) >= 0;
        var colorP2Exists = claimedColorsP2.indexOf(inter1.getColor()) >= 0;

        if (currentPlayer === Lyngk.Players.PLAYER1 && colorP2Exists) {
            return false;
        }
        else if (currentPlayer === Lyngk.Players.PLAYER2 && colorP1Exists) {
            return false;
        }

        return true;
    };

    var checkStateMove = function (i1, i2) {
        return !i1.isFullStack() && !i2.isFullStack() && !(i1.isOnePiece() && i2.isStack());
    };

    var validMove = function (inter1, inter2) {
        var moveOk = checkStateMove(inter1, inter2);
        var claimedColorOk = checkClaimedColor(inter1);
        var containsColorOk = checkContainsColor(inter1, inter2);
        var oneCaseOk = checkOneCase(inter1, inter2);

        return moveOk && claimedColorOk && containsColorOk && oneCaseOk;
    };

    this.initWhite = function () {
        var index = 0;
        for (index = 0; index < intersections.length; index += 1) {
            intersections[index].setPiece(new Lyngk.Piece(Lyngk.Color.WHITE));
        }
    };

    this.initStart = function () {
        var colors = [8, 8, 8, 8, 8, 3];
        var index = 0;
        var color;
        for (index = 0; index < intersections.length; index += 1) {
            do {
                color = Math.floor(Math.random() * 6);
            } while (colors[color] <= 0);

            colors[color] = colors[color] - 1;
            intersections[index].setPiece(new Lyngk.Piece(color));
        }
    };

    init();
};
