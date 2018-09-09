function generateTextFieldJson(callbackName, placeholder) {
    outComingJson.ObjList.push({
        type: "TextField",
        typeId: 1,
        callbackName: callbackName,
        placeholder: placeholder
    });
    if(callbackName !== "") {
        eventJson.events[callbackName] = function(){};
        eventJson.elements[callbackName] = {
            text: ""
        };
    }
}

function generateButtonJson(callbackName, text) {
    outComingJson.ObjList.push({
        type: "Button",
        typeId: 2,
        callbackName: callbackName,
        text: text
    });
    if(callbackName !== "") {
        eventJson.events[callbackName] = function(){};
    }
}

function generateBooleanJson(callbackName, value) {
    outComingJson.ObjList.push({
        type: "Boolean",
        typeId: 3,
        callbackName: callbackName,
        value: value
    });
    if(callbackName !== "") {
        eventJson.events[callbackName] = function(){};
        eventJson.elements[callbackName] = {
            value: false
        };
    }
}

function generateTextJson(text, color) {
    outComingJson.ObjList.push({
        type: "Text",
        typeId: 4,
        text: text,
        color: color
    });
}

function generateBreakLineJson() {
    outComingJson.ObjList.push({
        type: "nl",
        typeId: 5
    });
}

function generateTitleJson(text, color) {
    outComingJson.ObjList.push({
        type: "Title",
        typeId: 6,
        text: text,
        color: color
    });
}

function generateSpaceJson(width, height) {
    outComingJson.ObjList.push({
        type: "Space",
        typeId: 7,
        width: width,
        height: height
    });
}

function isColorCode(str) {
    return /^#([1-9A-Fa-f]{3}|[1-9A-Fa-f]{6}|[1-9A-Fa-f]{8})$/.test(str);
}

let outComingJson = {
    ObjList: []
};

let eventJson = {events: {}, elements: {}};

exports.addTextField = function(callbackName="", placeholder="TextField", defText = "") {
    if(typeof callbackName === 'string' && typeof placeholder === 'string') {
        generateTextFieldJson(callbackName, placeholder);
    }
};

exports.addButton = function(callbackName="", text="Button") {
    if(typeof callbackName === 'string' && typeof text === 'string') {
        generateButtonJson(callbackName, text);
    }
};

exports.addBoolean = function(callbackName="", value=false) {
    if(typeof callbackName === 'string' && typeof value === 'boolean') {
        generateBooleanJson(callbackName, value);
    }
};

exports.addText = function(text="Text", color="#ffffff") {
    if(typeof text === 'string' && typeof color === 'string' && isColorCode(color)) {
        generateTextJson(text, color);
    }
};

exports.addTitle = function(text="Title", color="#ffffff") {
    if(typeof text === 'string' && typeof color === 'string' && isColorCode(color)) {
        generateTitleJson(text, color);
    }
};

exports.addSpace = function(width=0, height=0) {
    if(typeof width === 'number' && typeof height === 'number') {
        generateSpaceJson(width, height);
    }
};

exports.addBreakLine = function() {
    generateBreakLineJson();
};

exports.getGeneratedJson = function() {
    return outComingJson.ObjList;
};

exports.getGeneratedEventJson = function() {
    return eventJson;
};

exports.clearJson = function() {
    outComingJson = {
        ObjList: []
    };
    eventJson = {events: {}, elements: {}};
};
