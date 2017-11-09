"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var pieces = [];
    var coordinate = c;

    this.getState = function () {
        return state;
    };

    this.takePieces = function () {
        var tmpPieces = pieces;
        pieces = [];

        state = Lyngk.State.VACANT;

        return tmpPieces;
    };

    this.getCoordinate = function () {
        return coordinate;
    };

    this.getStackHeight = function () {
        return pieces.length;
    };

    this.setPiece = function (p) {
        pieces.push(p);
        if (pieces.length === 1) {
            state = Lyngk.State.ONE_PIECE;
        }
        else if (pieces.length >= 5) {
            state = Lyngk.State.FULL_STACK;
        }
        else {
            state = Lyngk.State.STACK;
        }
    };

    this.isVacant = function () {
        return state === Lyngk.State.VACANT;
    };

    this.isFullStack = function () {
        return state === Lyngk.State.FULL_STACK;
    };

    this.isStack = function () {
        return state === Lyngk.State.STACK;
    };

    this.isOnePiece = function () {
        return state === Lyngk.State.ONE_PIECE;
    };

    this.getPieces = function () {
        return pieces;
    };

    this.containsColor = function (c) {
        var index = 0;
        for (index = 0; index < pieces.length; index += 1) {
            if (pieces[index].getColor() === c) {
                return true;
            }
        }

        return false;
    };

    this.getColor = function () {
        if (pieces.length > 0) {
            return pieces[pieces.length - 1].getColor();
        }

        return null;
    };
};
