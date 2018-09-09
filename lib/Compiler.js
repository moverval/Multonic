const Module = require('module');

module.exports = (code) => {
    const parent = module.parent;
    const m = new Module('', parent);
    m._compile(code, '');
    return m.exports;
};