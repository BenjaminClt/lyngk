"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var pieces = [];

    this.getState = function(){
        return state;
    };

    this.getPieces = function(){
        return pieces;
    };

    this.setPiece = function(p){
        pieces.push(p);
        if (pieces.length == 1)
            state = Lyngk.State.ONE_PIECE;
        else if (pieces.length >= 5)
            state = Lyngk.State.FULL_STACK;
        else
            state = Lyngk.State.STACK;
    };

    this.getColor = function(){
        if (pieces.length > 0)
            return pieces[pieces.length-1].getColor();
        else
            return null;
    };
};
