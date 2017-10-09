"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    var init = function(){
        var size = Lyngk.AllCoordinates.length;

        for (var i = 0; i < size; i++)
        {
            var inter = new Lyngk.Intersection(653);
            inter.setPiece(new Lyngk.Piece(Lyngk.Color.WHITE));
            intersections.push(inter);
        }
    };

    this.isCorrectlyInitialized = function()
    {
        if (intersections.length != Lyngk.AllCoordinates.length)
            return false;

        for (var i = 0; i < intersections.length; i++)
        {
            if (intersections[i].getState() !== Lyngk.State.ONE_PIECE)
                return false;
        }

        return true;
    };

    init();
};
