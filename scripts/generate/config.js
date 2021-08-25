require('node-env-file')('.env');
var fs = require('fs');
var dir = './src/core/generated';

const { BASEURL, PORT, GITLABPROTOCOL, GITLAURLHOST, GITLABPORT, GITLABSUFFIX, GITLABPROJECTNAME, DEFAULTROUTE } = process.env;


fs.writeFileSync(dir + '/config.js',
  `module.exports.BASEURL = "${BASEURL}"
module.exports.DEFAULTROUTE = "${DEFAULTROUTE}"
module.exports.PORT = ${PORT}
module.exports.GITLABPROTOCOL = "${GITLABPROTOCOL}"
module.exports.GITLAURLHOST = "${GITLAURLHOST}"
module.exports.GITLABPORT = ${GITLABPORT}
module.exports.GITLABSUFFIX = "${GITLABSUFFIX}"
module.exports.GITLABPROJECTNAME = "${GITLABPROJECTNAME}"
`
);