"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var piece;

    this.getState = function(){
        return state;
    };

    this.setPiece = function(p){
        piece = p;
        state = Lyngk.State.ONE_PIECE;
    };

    this.getColor = function(){
        if (piece != null)
            return piece.getColor();
        else
            return null;
    };
};
