"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    var init = function(){
        var letters = "ABCDEFGHI";

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
        var inter1Height = inter1.getStackHeight();
        var inter2Height = inter2.getStackHeight();

        if (inter2Height === 0 || inter2Height >= 5 || inter1Height >=5)
            return false;

        var c1 = inter1.getCoordinate();
        var c2 = inter2.getCoordinate();

        var lDiff = c1.getLine() - c2.getLine();
        var cDiff = c1.getColumn().charCodeAt(0) - c2.getColumn().charCodeAt(0);

        var valid = false;

        if(cDiff === 0 && Math.abs(lDiff) === 1 )
        {
            valid = true;
        }
        else if(cDiff === -1 && (lDiff === 0 || lDiff === -1))
        {
            valid = true;
        }
        else if(cDiff === 1 && (lDiff === 0 || lDiff === 1))
        {
            valid = true;
        }

        return valid;
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
