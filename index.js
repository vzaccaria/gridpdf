#!/usr/bin/env node
"use strict";

var _require = require("docopt");

var docopt = _require.docopt;

var _ = require("lodash");
var fs = require("fs");
var path = require("path");

var _require2 = require("./lib/lib");

var grid = _require2.grid;

var getOptions = function (doc) {
    "use strict";
    var o = docopt(doc);
    var nc = parseInt(o.NC) || 40;
    var nr = parseInt(o.NR) || 15;
    var w = parseInt(o.WIDTH) || 14.5;
    var dir = o["--dir"] || undefined;
    var help = o["--help"] || false;
    var griddot = o["--griddot"] || false;
    return {
        help: help, nc: nc, nr: nr, w: w, griddot: griddot, dir: dir
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
    var griddot = _getOptions.griddot;
    var dir = _getOptions.dir;

    if (!help) {
        if (griddot) {
            var fn = "griddot_ese_" + nr + "x" + nc + ".pdf";
            if (!_.isUndefined(dir)) {
                fn = path.join(dir, fn);
            }
            grid(nr, nc, fn, w, { griddot: true });
            console.log("file:" + fn);
        } else {
            var fn = "grid_ese_" + nr + "x" + nc + ".pdf";
            if (!_.isUndefined(dir)) {
                fn = path.join(dir, fn);
            }
            grid(nr, nc, fn, w);
            console.log("file:" + fn);
        }
    }
};

main();
