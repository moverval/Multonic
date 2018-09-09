const fs = require('fs');

/**
 * @param {String|JSON} cPath
 * @param {String} variable
 */
exports.parse = function getValue(cPath, variable) {
    try {
        if((typeof cPath) === 'string') {
            const json = JSON.parse(fs.readFileSync(cPath, "utf-8"));
            return readVariable(json, variable);
        } else {
            return readVariable(cPath, variable);
        }
    } catch(Error) {
        throw {
            name: "Parse Exception",
            message: "Cannot parse string '" + variable + "' to object/path"
        };
    }
};

/**
 * @param {JSON} json
 * @param {String} variable
 * @returns {String}
 */
function readVariable(json, variable) {
    return variable.replace(/%([\d\w~]+?)%/g, function(match, p1) {
        return readVariable(json, getIn(json, p1));
    });
}

exports.defaultPath = "configure/paths.json";

function getIn(json, variable) {
    let par;
    if((par = variable.split('~'))[1]) {
        return inJson(json, par, 0);
    }
    return json[variable];
}

function inJson(json, par, count) {
    if(par[count + 1]) {
        return inJson(json[par[count]], par, count + 1);
    } else return json[par[count]];
}