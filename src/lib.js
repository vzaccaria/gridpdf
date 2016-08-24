"use strict";

var fs = require("fs");
var PDFDocument = require("pdfkit");
var _ = require("lodash");

function cm(v) {
    "use strict";
    return 28.34645669291339 * v;
}

var grid = function(r, c, filename, width, opts) {
    "use strict";
    var griddot = _.get(opts, "griddot", false);

    var w = cm(width);
    var h = cm(0.5 * r);
    if(griddot) {
        h = cm(0.25 * r);
    }
    var rw = w / c;
    var rh = h / r;
    var doc = new PDFDocument({
        size: [w, h],
        autoFirstPage: false
    });


    function doThis(lambda) {
        var i = 0;
        var j = 0;
        for (i = 0; i < r; i++) {
            for (j = 0; j < c; j++) {
                lambda(i, j);
            }
        }
    }

    doc.pipe(fs.createWriteStream(filename));

    doc.fontSize(8);

    if (!griddot) {
        doThis(function(i, j) {
            if (j === 0) {
                var pad = 0.1;
                doc.text(i + 1, rw * pad, rh * i + rh * pad * 2, {
                    width: w,
                    height: h
                });
            }
        });

        doThis(function(i, j) {
            if (j % 4 === 0) {
                doc.lineWidth(0.4).moveTo(rw * j, rh * i).lineTo(rw * j, rh * (i + 1)).dash(0).stroke();
            }
        });

        doThis(function(i, j) {
            doc.lineWidth(0.4).rect(rw * j, rh * i, rw, rh).dash(0.5, {
                space: 3
            }).stroke();
        });
    } else {
        doThis(function(i, j) {
            doc.lineWidth(0.1).rect(rw * j, rh * i, rw, rh).dash(0.5, {
                space: 1
            }).stroke();
        })
    }

    doc.end();
};

module.exports = {
    grid: grid
}

//foo(5, 40, "./griglia_esercizi_70x5.pdf")
//foo(10, 40, "./griglia_esercizi_70x10.pdf")
//foo(15, 40, "./griglia_esercizi_70x15.pdf")
//foo(20, 40, "./griglia_esercizi_70x20.pdf")
//foo(25, 40, "./griglia_esercizi_70x25.pdf")
//foo(30, 40, "./griglia_esercizi_70x30.pdf")
//foo(60, 40, "./griglia_esercizi_70x60.pdf")
;
