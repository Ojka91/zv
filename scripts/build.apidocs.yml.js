var yaml    = require('js-yaml');
var yamlinc = require('yaml-include');
var fs      = require('fs');
var p       = require('path');

// set the base file for relative includes
switch (process.env.ENV) {
  // case 'int':
  //   yamlinc.setBaseFile(p.join(__dirname, '../api_docs/api_docs-base-int.yml'));
  //   break;
  default:
    yamlinc.setBaseFile(p.join(__dirname, '../api_docs/api_docs-base.yml'));
    break;
}

var src = fs.readFileSync(yamlinc.basefile, 'utf8');

var obj = yaml.load(src, { schema: yamlinc.YAML_INCLUDE_SCHEMA, filename: yamlinc.basefile });
var saveDump = yaml.safeDump(obj);
fs.writeFileSync('api_docs.yml', saveDump, 'utf8');

// console.log( saveDump);

