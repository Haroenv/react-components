var writeFile = require('fs').writeFile;
var uniq = require('lodash/array/uniq');
var examples = require('../examples/components/examples.json');
var showroom = require('../showroom/components.json');

var generated = showroom.map(function(s) {
  if (s.id === 'components') {
    var c = uniq(examples.components.concat(s.components), 'id');
    s.components = c;
  }
  return s;
});

writeFile('./showroom/components.json', JSON.stringify(generated, null, 2));
