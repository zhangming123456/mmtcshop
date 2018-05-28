const Reg = {
    isPath,
    isPhone,
    isDate,
    isDateTime,
    pathReg: /^\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/,
    PhoneReg: /^1[3|4|5|7|8]\d{9}$/,
    dateReg: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
};
module.exports = Reg;

function isPath (text) {
    return Reg.pathReg.test(text);
}

function isPhone (text) {
    return text.length == 11 && Reg.PhoneReg.test(text);
}

function isDate (str) {
    return typeof str === 'string' && Reg.dateReg.test(str);
}

function isDateTime (str) {
    if (typeof str === 'string') {
        str = str.split(' ')[0]
    }
    return isDate(str)
}

module.exports = Reg;