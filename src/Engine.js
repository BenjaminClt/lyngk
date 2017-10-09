"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    var init = function(){
        var size = Lyngk.AllCoordinates.length;

        for (var i = 0; i < size; i++)
        {
            intersections.push(new Lyngk.Intersection(653));
        }
    };

    this.initOnePiece = function(){
        for (var i = 0; i < intersections.length; i++)
        {
            intersections[i].setPiece(new Lyngk.Piece(Lyngk.Color.WHITE));
        }
    };

    this.initEightPieces = function(){
        for (var i = 0; i < intersections.length; i++)
        {
            var colors = [5, 5, 5, 0, 1, 2, 3, 4];

            for (var j = 0; j < 8; j++)
            {
                var rand = Math.floor(Math.random() * (colors.length - 1));
                intersections[i].setPiece(new Lyngk.Piece(colors[rand]));

                colors.splice(rand, 1);
            }
        }
    };

    this.checkInitOnePiece = function()
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

    this.checkInitEightPieces = function()
    {
        if (intersections.length != Lyngk.AllCoordinates.length)
            return false;

        for (var i = 0; i < intersections.length; i++)
        {
            var countColors = [0, 0, 0, 0, 0, 0];

            var pieces = intersections[i].getPieces();

            if (pieces.length !== 8)
                return false;

            for (var j = 0; j < 8; j++)
            {
                countColors[pieces[j].getColor()]++;
            }

            for (var j = 0; j < 6; j++)
            {
                if (countColors[i] > 1 && i !== 5)
                {
                    return false;
                }

                if (countColors[i] !== 3 && i === 5)
                {
                    return false;
                }
            }
        }

        return true;

    };

    init();
};
