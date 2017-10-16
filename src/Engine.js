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

    this.setPiece = function(i, p){
        intersections[i].setPiece(p);
    };

    this.getIntersection = function (i) {
        if (i >= 0 && i < 43)
            return intersections[i];

        return null;
    }

    init();
};
