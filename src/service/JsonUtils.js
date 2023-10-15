const fs = require('fs');
const path = require('path');

function getDateJson(fileName) {
    return JSON.parse(fs.readFileSync(path.join(`${__dirname}/../../db`, `${fileName}`)));
}

export {getDateJson};