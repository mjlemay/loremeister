//strings.js

var banana = 'tasy';

var escapeThings = function (string) {
    var newString = string.replace(/[\uE000-\uF8FF]/g, '');
    newString = newString.replace(/(\r\n|\n|\r)/gm,'');
    return newString;
};

exports.escapeThings = escapeThings;