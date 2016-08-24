let {
    docopt
} = require('docopt');
let _ = require('lodash');
let fs = require('fs');
let path = require('path');
let {
    grid
} = require('./lib/lib');

let getOptions = doc => {
    "use strict"
    let o = docopt(doc);
    let nc = parseInt(o['NC']) || 40;
    let nr = parseInt(o['NR']) || 15;
    let w = parseInt(o['WIDTH']) || 14.5;
    let dir = o['--dir'] || undefined; 
    let help = o['--help'] || false;
    let griddot = o['--griddot'] || false;
    return {
        help, nc, nr, w, griddot, dir
    };
}

let doc = fs.readFileSync(__dirname + "/docs/usage.md", 'utf8');

let main = () => {
    "use strict";
    let {
        help, nc, nr, w, griddot, dir
    } = (getOptions(doc));
    if (!help) {
        if(griddot) {
            let fn = `griddot_ese_${nr}x${nc}.pdf`;
            if(!_.isUndefined(dir)) {
                fn = path.join(dir, fn);
            }
            grid(nr, nc, fn, w, { griddot: true } );
            console.log(`file:${fn}`);
        } else {
            let fn = `grid_ese_${nr}x${nc}.pdf`;
            if(!_.isUndefined(dir)) {
                fn = path.join(dir, fn);
            }
            grid(nr, nc, fn, w);
            console.log(`file:${fn}`);
        }
    }
};

main();
