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
        var countColors = [8,8,8,8,8,3];
        for (var i = 0; i < intersections.length; i++) {

            var randomColor;
            do{
                randomColor = Math.floor(Math.random() * 6);
            }while(countColors[randomColor] <= 0)
            countColors[randomColor]--;

            intersections[i].setPiece(new Lyngk.Piece(randomColor));
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

        var countColors = [0, 0, 0, 0, 0, 0];

        for (var i = 0; i < intersections.length; i++)
        {
            countColors[intersections[i].getColor()]++;
        }

        var valid = true;
        for(var i = 0; i < 6; i++)
        {
            if(i <= 4 && countColors[i] != 8)
                valid = false;

            else if(i == 5 && countColors[i] != 3)
                valid = false;
        }

        return valid;
    };

    init();
};
