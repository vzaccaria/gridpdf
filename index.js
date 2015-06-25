#!/usr/bin/env node
"use strict";

var _require = require("docopt");

var docopt = _require.docopt;

var _ = require("lodash");
var fs = require("fs");

var _require2 = require("./lib/lib");

var grid = _require2.grid;

var getOptions = function (doc) {
    "use strict";
    var o = docopt(doc);
    console.log(o);
    var nc = parseInt(o.NC) || 40;
    var nr = parseInt(o.NR) || 15;
    var w = parseInt(o.WIDTH) || 14.5;
    var help = o["--help"] || false;
    return {
        help: help, nc: nc, nr: nr, w: w
    };
};

var doc = fs.readFileSync(__dirname + "/docs/usage.md", "utf8");

var main = function () {
    "use strict";

    var _getOptions = getOptions(doc);

    var help = _getOptions.help;
    var nc = _getOptions.nc;
    var nr = _getOptions.nr;
    var w = _getOptions.w;

    if (!help) {
        var fn = "grid_ese_" + nr + "x" + nc + ".pdf";
        grid(nr, nc, fn, w);
    }
};

main();
