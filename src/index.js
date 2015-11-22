var {
    docopt
} = require('docopt')
var _ = require('lodash')
var fs = require('fs')
var {
    grid
} = require('./lib/lib')

var getOptions = doc => {
    "use strict"
    var o = docopt(doc)
    console.log(o)
    var nc = parseInt(o['NC']) || 40;
    var nr = parseInt(o['NR']) || 15;
    var w = parseInt(o['WIDTH']) || 14.5;
    var help = o['--help'] || false
    var griddot = o['--griddot'] || false
    return {
        help, nc, nr, w, griddot
    }
}

var doc = fs.readFileSync(__dirname + "/docs/usage.md", 'utf8')

var main = () => {
    "use strict"
    var {
        help, nc, nr, w, griddot
    } = (getOptions(doc))
    if (!help) {
        if(griddot) {
            var fn = `griddot_ese_${nr}x${nc}.pdf`
            grid(nr, nc, fn, w, { griddot: true } );
        } else {
            var fn = `grid_ese_${nr}x${nc}.pdf`
            grid(nr, nc, fn, w);
        }
    }
}

main()
