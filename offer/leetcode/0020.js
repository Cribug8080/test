// 有效的括号

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let temp = "";
    while (s !== temp) {
        temp = s;
        s = temp.replace(/(\[\])|(\(\))|(\{\})/g,'')
    }
    return !Boolean(s);
};
console.log(isValid("{}"))