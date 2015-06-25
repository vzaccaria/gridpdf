var fs = require("fs")
var PDFDocument = require("pdfkit")

function cm(v) {
    "use strict"
    return 28.34645669291339 * v;
}


var foo = (r, c, filename) => {
    "use strict"
    var w = cm(14.5)
    var h = cm(.5 * r)
    var rw = w / c
    var rh = h / r
    var doc = new PDFDocument({
        size: [w, h],
        autoFirstPage: false
    })

    function doThis(lambda) {
        var i = 0
        var j = 0
        for (i = 0; i < r; i++) {
            for (j = 0; j < c; j++) {
                lambda(i, j)
            }
        }
    }


    doc.pipe(fs.createWriteStream(filename))

    doc.fontSize(8)

    doThis((i, j) => {
        if (j === 0) {
            var pad = 0.1
            doc.text(i + 1, (rw * pad), (rh * i) + (rh * pad * 2), {
                width: w,
                height: h
            })
        }
    })

    doThis((i, j) => {
        if (j % 4 === 0) {
            doc.lineWidth(.4).moveTo(rw * j, rh * i).lineTo(rw * j, rh * (i + 1)).dash(0).stroke()
        }
    })

    doThis((i, j) => {
        doc.lineWidth(.4).rect(rw * j, rh * i, rw, rh).dash(.5, {
            space: 3
        }).stroke()
    })


    doc.end()
};

foo(5, 40, "./griglia_esercizi_70x5.pdf")
foo(10, 40, "./griglia_esercizi_70x10.pdf")
foo(15, 40, "./griglia_esercizi_70x15.pdf")
foo(20, 40, "./griglia_esercizi_70x20.pdf")
foo(25, 40, "./griglia_esercizi_70x25.pdf")
foo(30, 40, "./griglia_esercizi_70x30.pdf")
foo(60, 40, "./griglia_esercizi_70x60.pdf")
