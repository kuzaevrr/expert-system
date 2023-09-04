const {fs} = require('fs');
const {path} = require('path');

function getDateJson(fileName) {
    console.log(path.join(`${__dirname}/../../db`, `${fileName}`));

    return JSON.parse(fs.readFileSync(path.join(`${__dirname}/../../db`, `${fileName}`)));
}

export {getDateJson};